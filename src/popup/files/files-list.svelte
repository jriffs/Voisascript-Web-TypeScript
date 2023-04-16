<script lang="ts">
    import { screen, fileListToExpand, reviewedProjectIndex } from "../store";
    import { slide } from "svelte/transition";
    import Browser from "webextension-polyfill";
    import { userFiles } from "../../interfaces/interfaces";
    import { notify } from "../notification";
    import { convertMin } from "../../misc/convert-min";
    import { Events } from "../../events";
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
    import { Modal } from "../modal";
    import { updateUserData } from "../../misc/update-user-data";
    export let file: userFiles
    let audio: HTMLAudioElement, audioDuration: string, audioTime: string, audioLoaded: boolean,
    audioPaused: boolean = true, audTimeIntl: NodeJS.Timer, audioProgress: number
    audio = new Audio(file.File_URL)

    audio.onerror = (error) => {
        notify({
            type: 'error',
            message: `An Error occured loading your Audio 😭😭😭`
        })       
        return
    }
    audio.onloadedmetadata = () => {
        audioLoaded = true 
        audioDuration = convertMin(audio.duration)
        audioProgress = audio.currentTime               
    }
    audio.onplay = () => {
        audioPaused = false
        audioDuration = convertMin(audio.duration)
        getTime()
    }
        
    audio.onpause = () => {
        audioPaused = true
        clearInterval(audTimeIntl)
        audioProgress = audio.currentTime
        audioTime = convertMin(audio.currentTime)
    }
    function getTime() {        
        audTimeIntl = setInterval(() => {
            audioProgress = audio.currentTime
            audioTime = convertMin(audio.currentTime)                
        }, 1000)
    }
    function expand() {
        if ($fileListToExpand == file.File_Name) {fileListToExpand.set(''); return;}
        fileListToExpand.set(file.File_Name)
    }
        
    async function playAudio() {
        if (!audio) {
            notify({
                type: 'error',
                message: 'Problem initializing Audio',
                delay: 3
            })
            return
        }
        if (audio.paused) {
            audio.play()
        }else{
            audio.pause()
        }
        /* audio.onpause = () => {} */     
    }

    function handleSeek(ev: any) {
        if (audio.paused) {
            console.log('audio is paused')
            audio.currentTime = audioProgress            
        } else {
            console.log('audio is playing')
            audio.pause()            
            audio.currentTime = audioProgress
            audio.play()
        }        
        /* clearInterval(audTimeIntl)
        audio.currentTime = audioProgress
        audTimeIntl = setInterval(() => {
            console.log('new interval started')            
            audioProgress = audio.currentTime
            audioTime = convertMin(audio.currentTime)                
        }, 1000) */
        // console.log(audioProgress)        
    }

    function handleCopy() {
        navigator.clipboard.writeText(`https://voisascript-file-storage.herokuapp.com/files/${file.Project_ID}/url?filename=${file.File_Name}`)
        notify({
            delay: 3,
            message: 'File copied successfully 🤙🤙',
            type: 'success' 
        })
    }

    function handleDelete() {
        Modal({
            message: 'Are you sure you want to delete?',
            onNo: async () => {},
            onYes: deleteFile
        })
    }

    async function deleteFile() {
        notify({
            type: 'info',
            message: 'Deleting File...'
        })
        let data = new FormData()
        data.append('file_ID', file.id)
        data.append('file_Name', file.File_Name)
        data.append('project_ID', $reviewedProjectIndex.projectID)
        const { userData } = await Browser.storage.local.get('userData')
        const { userToken } = userData
        if (userToken) {
            const headers = {
                authorization: `Bearer ${userToken}`,
                originator: `Extension`
            }
            const response = await fetch('https://voisascript-file-storage.herokuapp.com/files/delete', {
                method: 'DELETE',
                headers: headers,
                body: data
            })
            const ResponseData = await response.json()
            console.log(ResponseData)                
            if (response.ok === true) {
                updateUserData(ResponseData.userToken, ResponseData, ResponseData.username).then(async() => {
                    notify({
                        delay: 3,
                        message: 'File deleted successfully 🤙🤙',
                        type: 'success' 
                    })
                    screen.set({current: 'Manage files', previous: ''})
                })
                return 
            }
            notify({
                message: `Server Error -> ${response.statusText}`,
                type: 'error',
                delay: 3
            })
            return
        } 
    }
</script>

<div class="file-list" on:keyup={() => {}} on:click|self={expand}>
    <h5>{file.File_Name}</h5>
    <div class="timing">
        <span>{file.Date_created}</span>
        <span>{file.Time_stamp}</span>
    </div>
    {#if $fileListToExpand == file.File_Name}
        <div transition:slide class="expandable">
            <div class="audio-area">
                <input type="range" on:click={handleSeek} min="{0}" max="{audio.duration}" bind:value="{audioProgress}">
            </div>
            <div class="audio-time-area">
                <span>{audioDuration ?? '0:00'}</span>
                <span>-{audioTime ?? '0:00'}</span>
            </div>
            <div class="controls-area">
                <button on:click={handleCopy}>
                    <img src="../icons/copy-2.svg" alt="">
                </button>
                {#if audioLoaded}
                    <button on:click={playAudio}>
                        {#if audioPaused}
                            <img src="../icons/icons8-play-64 (1).png" alt="" style="width: 30px; height: 31px;">
                        {:else}
                            <img src="../icons/pause.svg" alt="">
                        {/if}
                    </button>
                {:else}
                    <button>
                        <img src="../icons/icons8-dots-loading.gif" alt="">
                    </button>
                {/if}
                <button on:click={handleDelete}>
                    <img src="../icons/delete.svg" alt="">
                </button>
            </div>  
        </div>
    {/if}
</div>

<!-- http://localhost:5000/files/ee117945-4c11-41dc-8219-82dc13af4386/url?filename=third test file.mp3 -->

<style>
    .file-list{
        background: linear-gradient(0deg, #F9F9F9, #F9F9F9),
        linear-gradient(0deg, #F6F6F6, #F6F6F6);
        width: 87%;
        height: fit-content;
        margin-block: 10px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
    }
    .file-list h5{
        font-family: 'Space Grotesk';
        font-size: 17px;
        font-weight: 400;
        letter-spacing: -0.02em;
        text-align: center;
        color: #021931;
        margin-block: 0;
    }
    .file-list .timing{
        min-width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-block: 10px;
    }
    .file-list .timing span{
        font-family: 'Inter';
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 0px;
        text-align: center;
        color: #566676;
    }
    .audio-area{
        width: 100%;
        display: flex;
    }
    .audio-area input[type='range']{
        min-width: 100%;
    }
    .audio-area input[type='range']::-webkit-slider-runnable-track{
        min-width: 100%;
        height: 3px;
        outline: none;
    }
    .audio-area input[type='range']::-webkit-slider-thumb{
        -webkit-appearance: none;
        max-height: 10px;
        max-width: 10px;
        cursor: pointer;
        margin-top: -3px;
        transition: 1s ease-in-out;
    }
    .audio-time-area{
        min-width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-block: 6px; 
    }
    .audio-time-area span{
        font-family: 'Inter';
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 0px;
        text-align: center;
        color: #566676;
    }
    .controls-area {
        min-width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-inline: 5px;
        margin-block: 10px;
    }
    .controls-area button{
        background: transparent;
        border: none;
    }
    .expandable{
        min-width: 100%;
    }
</style>