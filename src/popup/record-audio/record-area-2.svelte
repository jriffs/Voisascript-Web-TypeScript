<script lang="ts">
    import { screen, recordParams, fileURL, Task_Monitor } from "../store";
    import { fade } from "svelte/transition";
    // import { onMount } from "svelte";
    // import Header from "../header.svelte";
    import { CmcResult } from "../../interfaces/interfaces";
    import AudioWave from "../audio-wave.svelte";
    import Browser from "webextension-polyfill";
    import { notify } from "../notification";
    import { communicateWithContent } from "../communicate";
    import ButtonSecondary from "../buttons/button-secondary.svelte";
    import ButtonPrimary from "../buttons/button-primary.svelte";
    import Timer from "./recorder-time.svelte";
    import { convertURIToBinary } from "../../misc/file-extract";
    import { Modal } from "../modal";
    // import { updateUserData } from "../../misc/update-user-data";
    import ace, { Ace } from "ace-builds"
    import { HandleTask } from "../../misc/handleTask";
    import RecordObserver from "../../misc/record-observer";

    
    let animateAudioWave = {
        play: false,
        pause: false,
        stop: true
    },
    BtnControlsLoading: boolean, BtnLoading: boolean
    $: BtnDisabled = BtnLoading

    let btnText1 = 'Cancel', btnText2 = 'Upload',
    timerAction: string
    const recorderObserver = new RecordObserver()

    async function handlePlayButton() {
        BtnControlsLoading = true
        const project = $recordParams.project,
        fileName = $recordParams.fileName       
        const {received, error} = await communicateWithContent('retreive')
        if (received?.recorderState) {
            let state: CmcResult
            switch (received.recorderState) {
                case 'paused':
                    await communicateWithContent('resume')
                    recorderObserver.resumeRObserver()
                    BtnControlsLoading = false
                    timerAction = 'start'
                    animateAudioWave = {
                        play: true,
                        pause: false,
                        stop: false
                    }
                    recordParams.set({
                        Recorderstate: 'recording',
                        project,
                        fileName,
                        file: null
                    })              
                    break;
                case 'recording':
                    timerAction = 'pause'
                    animateAudioWave = {
                        play: false,
                        pause: true,
                        stop: false
                    }
                    await communicateWithContent('pause')
                    recorderObserver.pauseRObserver()
                    BtnControlsLoading = false
                    recordParams.set({
                        Recorderstate: 'paused',
                        project,
                        fileName,
                        file: null
                    })
                    break;
                case 'inactive':
                    await communicateWithContent('start')
                    recorderObserver.startRObserver(async ()=> {
                        notify({
                            type: "info",
                            message: "You currently cannot record audio more than 1 minutes",
                            delay: 5
                        })
                        await handleStopButton()
                    })
                    BtnControlsLoading = false
                    timerAction = 'start'
                    animateAudioWave = {
                        play: true,
                        pause: false,
                        stop: false
                    }
                    recordParams.set({
                        Recorderstate: 'recording',
                        project,
                        fileName,
                        file: null
                    })
                    break;
            }
        }       
    }
    async function handleStopButton() {
        recorderObserver.stopRObserver()
        timerAction = 'reset'
        animateAudioWave = {
            play: false,
            pause: false,
            stop: true
        }
        BtnControlsLoading = true
        notify({
            type: 'info',
            message: 'Please wait while audio is being prepared 👍👍'
        })
        let project = $recordParams.project, fileName = $recordParams.fileName
        let state: CmcResult
        if ($recordParams.Recorderstate !== 'inactive') {
            try {
                state = await communicateWithContent('retreive')
                const {recorderState} = state.received
                if (recorderState !== 'inactive') {
                    const {received} = await communicateWithContent('stop')
                    const {recorderState, blobTxt} = received
                    console.log(blobTxt)                    
                    if (recorderState == "inactive" && blobTxt) {                        
                        let binary = convertURIToBinary(blobTxt)
                        let audioBlob = new Blob([binary], {type: 'audio/webm'})
                        console.log(audioBlob)                        
                        recordParams.set({
                            Recorderstate: 'inactive',
                            project,
                            fileName,
                            file: audioBlob
                        })
                        notify({
                            type: 'success',
                            message: `Your Audio is ready 👌👌`
                        })
                        BtnControlsLoading = false
                        return
                    }
                    notify({
                        type: 'error',
                        message: `Internal Error: System couldn't Prepare Audio`,
                        delay: 3
                    })
                    return                                                                                        
                }
            } catch (error) {
                notify({
                    type: 'error',
                    message: `Error: ${error}`,
                    delay: 3
                })              
            } 
        }   
    }
    async function handleCancel() {
        console.log($recordParams.Recorderstate)        
        if ($recordParams.Recorderstate === 'inactive') {
            recordParams.set({
                Recorderstate: 'inactive',
                project: '',
                fileName: '',
                file: null
            })
            screen.set({current: 'dashboard', previous: ''})
        } else {
            Modal({
                message: 'Cancel this recording ??',
                onYes: cancelRecording,
                onNo: async () => {}
            })
        }
    }
    async function handleUpload() {
        BtnLoading = true
        notify({
            message: 'Uploading...',
            type: 'info'
        })
        if ($recordParams.Recorderstate == 'inactive' && $recordParams.file) {
            let data = new FormData()
            data.append('audio', $recordParams.file, $recordParams.fileName)
            data.append('project', $recordParams.project)
            const { userData } = await Browser.storage.local.get('userData')
            const { userToken } = userData
            if (userToken) {
                try {
                    const handleTask = new HandleTask("https://voisascript-file-storage.herokuapp.com/files/upload", data, userToken)
                    const handleTaskComplete = (url: string)=> {
                        BtnLoading = false;
                        notify({
                            delay: 3,
                            message: 'File uploaded successfully 🤙🤙',
                            type: 'success' 
                        })
                        fileURL.set(url)
                        screen.set({current: 'Record audio 3', previous: ''})                
                    }
                    console.log(handleTask.filename)                    
                    handleTask.on("complete", handleTaskComplete)
                    handleTask.on("error", (message)=> {
                        notify({
                            type: "error",
                            message: `Error - ${message}`,
                            delay: 3,
                        })
                        BtnLoading = false
                        Task_Monitor.update((task_arr)=> {
                            if (task_arr.find((task)=> task.id === handleTask.filename)) {
                                let index = task_arr.findIndex((task)=> task.id === handleTask.filename)
                                console.log(index)                                
                                task_arr[index].state = "failed"
                                return task_arr
                            } else {
                                const newTask = {
                                    name: 'Upload Task',
                                    id: `${handleTask.filename}`,
                                    state: "failed"
                                }
                                task_arr.push(newTask)
                                return task_arr
                            }
                        })
                    })
                    handleTask.on("task-awaiting", ()=> {
                        BtnLoading = false;
                        notify({
                            delay: 5,
                            message: 'Task is taking too long, Monitor it in the Task Monitor Tab',
                            type: 'info' 
                        })
                        handleTask.removeListener("complete", handleTaskComplete)
                        handleTask.on("complete", (url)=> {
                            fileURL.set(url)
                            Task_Monitor.update((task_arr)=> {
                                let index = task_arr.findIndex((task)=> task.id === handleTask.filename)                               
                                task_arr[index].state = "success"                                
                                return task_arr
                            })
                        })
                        Task_Monitor.update((task_arr)=> {
                            const newTask = {
                                name: 'Upload Task',
                                id: `${handleTask.filename}`,
                                state: "pending"
                            }
                            task_arr.push(newTask)
                            return task_arr
                        })
                        screen.set({current: 'Task-Monitor', previous: ''})
                    })
                    handleTask.start()
                    return
                } catch (error) {
                    notify({
                        message: `Server Error -> ${error}`,
                        type: 'error',
                        delay: 3
                    })
                }
            }            
            BtnLoading = false
            notify({
                message: 'Internal System Error - User is Not Recognized',
                type: 'error',
                delay: 3
            })
            return                       
        }
        BtnLoading = false
        notify({
            message: 'No file to be uploaded .. please record one',
            type: 'error',
            delay: 4
        })
        return        
    }
    async function cancelRecording() {
        await communicateWithContent('stop')
        recordParams.set({
            Recorderstate: 'inactive',
            project: '',
            fileName: '',
            file: null
        })
        screen.set({current: 'Record audio', previous: ''})
    }

    let editorModeValue: string

    $: if (editorModeValue) {
        let CD = document.querySelector("#editor") as HTMLElement
        let editor = ace.edit(CD)
        ace.config.set('basePath', '/src-min-noconflict/')
        editor.setTheme("ace/theme/cobalt")
        editor.session.setMode(`ace/mode/${editorModeValue}`)
    }
    
</script>

{#if $screen.current === 'Record-Audio-2'}
    <div transition:fade class="main-record-audio-content">
        <div class="header-area">
            <h4>{$recordParams.fileName}</h4>
        </div>
        <div class="recording-area">
            <div class="mic">
                <img src="../icons/mic.svg" alt="">
            </div>
            <div class="time">
                <Timer {timerAction}/>
            </div>
            <div class="audio-wave">
                <AudioWave {animateAudioWave}/>
            </div>
            <div class="audio-controls">
                {#if BtnControlsLoading}
                    <button class:btnControlsLoading="{BtnControlsLoading}">
                        <img src="../icons/icons8-dots-loading.gif" alt="">
                    </button>
                {:else}
                   <button on:click={handlePlayButton}>
                        {#if $recordParams.Recorderstate == 'paused' || $recordParams.Recorderstate == 'inactive'}
                            <img src="../icons/mic.svg" alt="">
                        {:else if $recordParams.Recorderstate == 'recording'}
                            <img src="../icons/pause.svg" alt="">
                        {/if}
                    </button> 
                {/if}
                <button on:click={handleStopButton} class:btnControlsLoading="{BtnControlsLoading}">
                    {#if BtnControlsLoading}
                        <img src="../icons/icons8-dots-loading.gif" alt="">
                    {:else}
                        <img src="../icons/stop-circle.svg" alt="">
                    {/if}
                </button>
            </div>
            <div class="screen-controls">
                <ButtonSecondary BtnText={btnText1} func={handleCancel} {BtnDisabled}/>
                <ButtonPrimary BtnText={btnText2} exec={handleUpload} {BtnLoading}/>
            </div>
        </div>
        <div class="code-review">
            <h4>Paste copied code</h4>
            <select name="editor-mode" id="editor-mode" bind:value={editorModeValue}>
                <option value="">Select Language</option>
                <option value="plain_text">Plain Text</option>
                <option value="actionscript">ActionScript</option>
                <option value="applescript">AppleScript</option>
                <option value="c">C</option>
                <option value="c_cpp">C++</option>
                <option value="coffee">Coffee Script</option>
                <option value="css">CSS</option>
                <option value="csharp">C#</option>
                <option value="dart">Dart</option>
                <option value="django">Django</option>
                <option value="erlang">Erlang</option>
                <option value="golang">Go-Lang</option>
                <option value="graphqlschema">GraphQl</option>
                <option value="haskell">Haskell</option>
                <option value="html">HTML</option>
                <option value="java">JAVA</option>
                <option value="javascript">Javascript</option>
                <option value="kotlin">Kotlin</option>
                <option value="less">Less</option>
                <option value="perl">Perl</option>
                <option value="php">PHP</option>
                <option value="php_laravel_blade">PHP (Laravel-Blade)</option>
                <option value="python">Python</option>
                <option value="ruby">Ruby</option>
                <option value="rust">Rust</option>
                <option value="sass">Sass</option>
                <option value="typescript">TypeScript</option>
            </select>
            <div class="editor" id="editor"></div>
        </div>
    </div>
{/if}

<style>
    .main-record-audio-content{
        min-height: 500;
        min-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .header-area {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-width: 100%;
        min-height: 100;
    }
    .header-area h4{
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #021931;
    }
    .recording-area{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        min-width: 100%;
        min-height: 455;
    }
    .recording-area .mic{
        display: flex;
        background: #f9f9f9;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
    }
    .recording-area .mic img{
        max-width: 40px;
        max-height: 40px;
    }
    .recording-area .time{
        display: flex;
        min-width: 30%;
        min-height: 30%;
        justify-content: center;
        align-items: center;
    }
    .recording-area .audio-wave{
        display: flex;
        min-width: 100%;
        min-height: fit-content;
        justify-content: center;
        align-items: center;
    }
    .audio-controls{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 35%;
        min-height: fit-content;
    }
    .audio-controls button{
        outline: none;
        background: #f9f9f9;
        border-radius: 50%;
        border: 1px solid #f6f6f6;
        padding: 10px;
    }
    .audio-controls button img{
        width: 30px;
        height: 30px;
    }
    .btnControlsLoading{
        background: #ffffff !important;
        padding: 10px;
        border: 1px solid #2288f4;
    }
    .btnControlsLoading img{
        width: 30px;
        height: 30px;
    }
    .code-review{
        min-width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
    }
    .code-review h4{
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #021931;
        text-align: center; 
    }
    .code-review select{
        padding: 10px;
        font-family: 'Inter';
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 0em;
        text-align: left;
        width: 220px;
        margin-inline-start: 190px;
        margin-block-end: 15px;
    }
    .code-review .editor{
        height: 400px;
        width: 450px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-inline-start: 80px;
        margin-block-end: 36px;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
    }
</style>