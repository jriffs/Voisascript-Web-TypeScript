<script lang="ts">
    import { screen, recordParams } from "../store";
    import { fade, fly, scale, slide, draw, crossfade, blur } from "svelte/transition";
    import Header from "../header.svelte";
    import { CmcResult, userProjects } from "../../interfaces/interfaces";
    import AudioWave from "../audio-wave.svelte";
    import Browser from "webextension-polyfill";
    import { notify } from "../notification";
    import { communicateWithContent } from "../communicate";
    import ButtonSecondary from "../buttons/button-secondary.svelte";
    import ButtonPrimary from "../buttons/button-primary.svelte";
    import Timer from "./recorder-time.svelte";
    import { convertURIToBinary } from "../../misc/file-extract";

    let animateAudioWave = {
        play: false,
        pause: false,
        stop: true
    }

    let btnText1 = 'Cancel', btnText2 = 'Upload',
    timerAction: string

    async function handlePlayButton() {
        const project = $recordParams.project,
        fileName = $recordParams.fileName       
        const {received, error} = await communicateWithContent('retreive')
        if (received?.recorderState) {
            let state: CmcResult
            switch (received.recorderState) {
                case 'paused':
                    timerAction = 'start'
                    animateAudioWave = {
                        play: true,
                        pause: false,
                        stop: false
                    }
                    await communicateWithContent('resume')
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
                    recordParams.set({
                        Recorderstate: 'paused',
                        project,
                        fileName,
                        file: null
                    })
                    break;
                case 'inactive':
                    timerAction = 'start'
                    animateAudioWave = {
                        play: true,
                        pause: false,
                        stop: false
                    }
                    await communicateWithContent('start')
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
        timerAction = 'reset'
        animateAudioWave = {
            play: false,
            pause: false,
            stop: true
        }
        let project = $recordParams.project, fileName = $recordParams.fileName
        let state: CmcResult
        try {
            state = await communicateWithContent('retreive')
            const {recorderState} = state.received
            if (recorderState !== 'inactive') {
                await communicateWithContent('stop')
                state = await communicateWithContent('retreive')
                if (state?.received?.recorderState === 'inactive') {
                    const {received} = await communicateWithContent('review')
                    const {audioBlobText} = received
                    if (audioBlobText) {
                        let binary = convertURIToBinary(audioBlobText)
                        let audioBlob = new Blob([binary], {type: 'audio/webm'})
                        recordParams.set({
                            Recorderstate: 'inactive',
                            project,
                            fileName,
                            file: audioBlob
                        })
                        return
                    }
                    notify({
                        type: 'error',
                        message: `Internal Error: System couldn't Prepare Audio`,
                        delay: 3
                    })                  
                }                             
            }
        } catch (error) {
            notify({
                type: 'error',
                message: `Error: ${error}`,
                delay: 3
            })              
        }
    }
    async function handleCancel() {
        
    }
    async function handleUpload() {
        
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
                <button on:click={handlePlayButton}>
                    {#if $recordParams.Recorderstate == 'paused' || $recordParams.Recorderstate == 'inactive'}
                        <img src="../icons/mic.svg" alt="">
                    {:else if $recordParams.Recorderstate == 'recording'}
                        <img src="../icons/pause.svg" alt="">
                    {/if}
                </button>
                <button on:click={handleStopButton}>
                    <img src="../icons/stop-circle.svg" alt="">
                </button>
            </div>
            <div class="screen-controls">
                <ButtonSecondary BtnText={btnText1} func={handleCancel}/>
                <ButtonPrimary BtnText={btnText2} exec={handleUpload}/>
            </div>
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
</style>