<script lang="ts">
    import { screen } from "../store";
    import { fade } from "svelte/transition";
    import ButtonSecondary from "../buttons/button-secondary.svelte";
    import BackHeader from "../back-header.svelte";
    import { userProjects } from "../../interfaces/interfaces";
    import Browser from "webextension-polyfill";
    import ProjectList from "./project-list.svelte";
    
    let projects: userProjects[], BtnDisabled: boolean
    async function getProjects() {
        const {userData} = await Browser.storage.local.get('userData')
        if (!userData) return
        projects = userData?.projects        
    }
    function handleCreateButton() {
        screen.set({current: 'Create project', previous: ''})
    }
    $: if ($screen.current == 'Manage projects') {
        getProjects()
    }
</script>

{#if $screen.current == 'Manage projects'}
    <BackHeader/>
    <div transition:fade class="manage-projects">
        <div class="secondary-header">
            <h4>Projects</h4>
            <ButtonSecondary BtnText={'Create New project'} func={handleCreateButton} {BtnDisabled}/>
        </div>
        <div class="projects-area">
            {#if Array.isArray(projects) == true}
                {#each projects as project}
                    <ProjectList {project}/>
                {/each} 
            {/if} 
        </div>
        
    </div>
{/if}

<style>
    .manage-projects{
        min-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        overflow: auto;
    }
    .projects-area{
        width: 100%;
        height: 400px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .manage-projects .secondary-header{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        min-width: 100%;
    }
    .manage-projects .secondary-header h4{
        font-family: 'Space Grotesk';
        font-size: 28px;
        font-weight: 400;
        line-height: 15px;
        letter-spacing: -0.02em;
        text-align: left;
        margin-inline: 16px;
    }
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