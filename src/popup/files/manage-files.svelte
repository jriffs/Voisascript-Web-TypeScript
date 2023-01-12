<script lang="ts">
    import {screen, reviewedProjectIndex} from "../store"
    import { userFiles, userProjects } from "../../interfaces/interfaces";
    import { fade } from "svelte/transition";
    import Browser from "webextension-polyfill";
    import BackHeader from "../back-header.svelte";
    import FilesList from "./files-list.svelte";
    

    let userFile: userFiles[]

    async function getFilesAndProjects() {
        const {userData} = await Browser.storage.local.get('userData')
        const {files} = userData
        userFile = files[$reviewedProjectIndex.index]        
    }

    $: if ($screen.current == 'Manage files') {
        getFilesAndProjects()
    }

</script>

{#if $screen.current == 'Manage files'}
    <BackHeader/>
    <div transition:fade class="manage-files">
        <div class="header-area">
            <div class="first">
                <h4>{$reviewedProjectIndex.projectName}</h4>
                <button>
                    <img src="../icons/copy.svg" alt="copy">
                </button>
            </div>
            <p>{$reviewedProjectIndex.projectDesc}</p>
        </div>
        <div class="files-area">
            {#if Array.isArray(userFile)}
                {#each userFile as file}
                    <FilesList {file}/> 
                {/each} 
            {/if}
        </div>
    </div>
{/if}

<style>
    .manage-files{
        min-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .manage-files .header-area{
        min-width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .manage-files .header-area .first{
        min-width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .manage-files .header-area .first h4{
        font-family: 'Space Grotesk';
        font-size: 28px;
        font-weight: 400;
        /* line-height: 36px; */
        letter-spacing: -0.02em;
        text-align: left;
        margin-block: 5px;
        margin-inline-start: 30px;
        color: #021931;
    }
    .manage-files .header-area .first button{
        background: transparent;
        border: none;
        margin-inline-end: 22px;
    }
    .manage-files .header-area p{
        font-family: 'Inter';
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        margin-inline-start: 60px;
        color: #566676;
        min-width: 100%;
    }
    .manage-files .files-area{
        min-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 400px;
        overflow: auto;
    }

    /* scrool-bar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
</style>