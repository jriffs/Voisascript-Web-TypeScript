<script lang="ts">
    import { screen, recordParams } from "../store";
    import { fade, fly, scale, slide, draw, crossfade, blur } from "svelte/transition";
    import BackHeader from "../back-header.svelte";
    import { userProjects } from "../../interfaces/interfaces";
    import Browser from "webextension-polyfill";
    import { notify } from "../notification";
    import { communicateWithContent } from "../communicate";
    import ButtonPrimary from "../buttons/button-primary.svelte";

    let projects: userProjects[],
    optionsValue: string, currentScreen = $screen.current

    $: selectInputValue = optionsValue?.split('~')[0]
    async function getProjects() {
        const {userData} = await Browser.storage.local.get('userData')
        if (!userData) return
        projects = userData?.projects
    }

    const handleOptionsClick = (e: any) => {
        optionsValue = e?.target?.__value
        showProjects = !showProjects
    }

    getProjects()
    $: showInput = (optionsValue && optionsValue !== '') ? true : false
    let fileName: string

    async function handlebuttonClick() {
        if (optionsValue && fileName) {
            try {
                const {received, error} = await communicateWithContent('retreive')
                if (received) {
                    recordParams.set({
                        Recorderstate: received.recorderState,
                        project: optionsValue,
                        fileName: `${fileName}.mp3`,
                        file: null
                    })
                    notify({
                        type: 'success',
                        message: 'Proceed to Record',
                        delay: 3
                    })
                    screen.set({current: 'Record-Audio-2', previous: currentScreen})
                    return
                }
                console.log(error)                
                notify({
                    type: 'error',
                    message: `Error: You're probably not on a github page 🤔🙄`,
                    delay: 3
                })
            } catch (error) {
                notify({
                    type: 'error',
                    message: `${error}`,
                    delay: 3
                })
            }
            return
        }
        notify({
                type: 'error',
                message: 'Please select a Project And Name the file',
                delay: 3
        })
    }
    let showProjects: boolean = false
</script>

{#if $screen.current === 'Record audio'}
    <BackHeader/>
    <div transition:fade class="main-record-audio-content">
        <div class="text-area">
            <h4>Record audio</h4>
            <p>Choose the project you want to create an audio file for</p>
        </div>
        <div class="action-area">
            <div class="select-area">
                <input on:keyup={() => {selectInputValue = optionsValue?.split('~')[0]}} type="text" name="select" id="select" placeholder="Select project" bind:value={selectInputValue}>
                <button on:click={() => showProjects = !showProjects}>
                    <img src="../icons/down-button.svg" alt="down">
                </button>
                {#if showProjects}
                    <div class="options-area" transition:slide>
                        {#each projects as project}
                            <option on:click={handleOptionsClick} value="{project.projectName}~{project.projectID}">{project.projectName}</option>
                        {/each}
                    </div>
                {/if}
            </div>
            {#if showInput}
               <input transition:slide id="filename" type="text" disabled="{!showInput}" bind:value={fileName} placeholder="What should the Audio be called"> 
            {/if}
            <ButtonPrimary BtnText={'Start Recording'} exec={handlebuttonClick}/>
        </div>
    </div>
{/if}

<style> 
    .main-record-audio-content{
        min-width: 440;
        min-height: 200;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .text-area{
        min-width: 100%;
        min-height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin: 10px; 
    }
    .text-area h4 {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 0px;
        letter-spacing: -0.02em;
        color: #021931;
        margin-inline-start: 30px;
        margin-block-end: 50px;
    }
    .text-area p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 0px;
        color: #566676;
        margin-inline-start: 30px;
    }
    .action-area{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        min-width: 100%;
        min-height: 120;
        padding-left: 30px;
    }
    .action-area input {
        margin-inline-start: 16px;
        width: 535px;
        height: 60px;
        background: #f9f9f9;
        border: 1px solid #f6f6f6;
        border-radius: 6px;
        outline: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 0px;
        color: #566676;
        padding-inline-start: 12px;
    }
    .action-area .select-area #select{
        margin-inline-start: 16px;
        width: 535px;
        height: 60px;
        background: #f9f9f9;
        border: 1px solid #f6f6f6;
        border-radius: 6px;
        outline: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 0px;
        color: #566676;
        padding-inline-start: 12px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
    .action-area .select-area button {
        outline: none;
        border: none;
        background: transparent;
        position: relative;
        bottom: 40px;
        left: 532px;
    }
    .action-area .select-area button img {
        width: 13px;
        height: 13px;
    }
    .action-area .select-area .options-area {
        max-height: 150px;
        max-width: 550px;
        background: #f9f8f9;
        border: 1px solid #f6f6f6;
        overflow-x: hidden;
        overflow-y: auto;
        margin-block-end: 5px;
        margin-block-start: -10px;
        margin-inline-start: 16px;
        border-radius: 6px;
        /* padding-inline-start: 12px; */
    }
    .action-area .select-area .options-area option {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 10px;
        color: #566676;
        padding-block: 15px;
        min-width: 100%;
        padding-inline-start: 12px;
        letter-spacing: 0.13em;
        cursor: pointer;
    }
    .action-area .select-area .options-area option:hover {
        /* background: #ebebeb; */
        /* background: #6cb0f8; */
        background: #D3E7FD;
    }
    .action-area #filename{
        min-height: 25;
        min-width: 290;
        padding-block: 5;
        padding-inline: 5;
        margin-block: 10;
    }
    /* width */
    ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
</style>