<script lang="ts">
    import { screen } from "../store";
    import { fade } from "svelte/transition";
    import Header from "../header.svelte";
    import { userProjects } from "../../interfaces/interfaces";
    import NavButton from "../dashboard/navigation-buttons.svelte";
    import Browser from "webextension-polyfill";
    import { notify } from "../notification";
    import { communicateWithContent } from "../communicate";

    let projects: userProjects[],
    project: string

    async function getProjects() {
        const {userData} = await Browser.storage.local.get('userData')
        projects = userData.projects
    }

    getProjects()

    async function handlebuttonClick() {
        if (project) {
            try {
                const {received, error} = await communicateWithContent('retreive')
                if (received) {
                    notify({
                        type: 'success',
                        message: 'Proceed to Record',
                        delay: 3
                    })
                    screen.set('Record-Audio-2')
                    return
                }
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
                message: 'Please select a Project',
                delay: 3
        })
    }
</script>

{#if $screen === 'Record audio'}
    <Header/>
    <div transition:fade class="main-record-audio-content">
        <div class="action-area">
            <select name="project-select" id="project-select" bind:value={project}>
                <option value="">Select project</option>
                {#each projects as project}
                    <option value="{project.projectName}~{project.projectID}">{project.projectName}</option>
                {/each}
            </select>
            <button on:click={handlebuttonClick}> Start recording </button>
        </div>
    </div>
{/if}

<style>
    .main-record-audio-content{
        min-width: 440;
        min-height: 200;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .action-area{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-width: 100;
        min-height: 120;
    }

    select{
        padding-block: 10;
        padding-inline: 54;
        text-align: start;
    }
    button{
        padding-block: 10;
        padding-inline: 105;
    }
</style>