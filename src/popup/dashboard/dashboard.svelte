<script lang="ts">
    import { screen } from "../store";
    import { fade } from "svelte/transition";
    import Header from "../header.svelte";
    import NavButton from "./navigation-buttons.svelte";
    import Browser from "webextension-polyfill";
    import { persistTask } from "../../misc/persist-task";
    let userDataPromise: Promise<Record<string, any>>
    $: if ($screen.current === 'dashboard') userDataPromise = Browser.storage.local.get('userData')    
</script>

{#if $screen.current === 'dashboard'}
    <Header/>
    <div transition:fade class="dashboard-content">
        <div class="welcome">
            <p>Welcome back 
                {#await userDataPromise}
                    User
                {:then userData} 
                    {userData.userData.username}
                {/await},
            </p> 
        </div>
        <div class="navigate-area">
            <NavButton placeholderText={'Record audio'}/>
            <NavButton placeholderText={'Manage projects'}/>
        </div>
        <div class="stats-area">
            <div class="stats-1">
                <span>
                    {#await userDataPromise}
                        0
                    {:then userData} 
                        {userData.userData.stats.projects}
                    {/await}
                </span>
                <h4>Projects</h4>
                <div class="pic-container">
                   <div class="projects-pic"></div> 
                </div>
            </div>
            <div class="stats-2">
                <span>
                    {#await userDataPromise}
                        0
                    {:then userData} 
                        {userData.userData.stats.files}
                    {/await}
                </span>
                <h4>Files</h4>
                <div class="pic-container">
                   <div class="files-pic"></div> 
                </div>
                
            </div>
        </div>
    </div> 
{/if}

<style>
    .dashboard-content{
        margin-block: 20px;
        min-width: 100%;
        min-height: 75%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    .dashboard-content .welcome {
        min-width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .dashboard-content .welcome p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #566676;
        margin-inline-start: 32px;
    }
    .navigate-area {
        min-width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-left: 35;
    }
    .stats-area{
        min-height: 250;
        min-width: 440;
        margin-top: 70;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .stats-area .stats-1{
        display: flex;
        width: 50%;
        margin-inline-end: 10px;
    }
    .stats-area .stats-1 span{
        font-family:  'Space Grotesk';
        font-style: normal;
        font-weight: 500;
        font-size: 40px;
        line-height: 48px;
        letter-spacing: -0.02em;
        color: #ffffff;
        padding: 10px;
        background: #1e7ddf;
        border-radius: 35px;
        height: 50px;
        width: 50px;
        text-align: center;
        position: relative;
        left: 155px;
        z-index: 1;
    }
    .stats-1 h4{
        height: 20px;
        width: 120px;
        border-radius: 15px;
        padding: 8px;
        background: #d3e7fd;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 24px;
        color: #1e7ddf;
        position: relative;
        top: 105px;
        left: 50px;
        z-index: 3;
    }
    .pic-container{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        min-width: fit-content;
        min-height: fit-content;
        border-radius: 76px;
        z-index: 2;
    }
    .projects-pic{
        display: flex;
        background: url("../../icons/project-management.avif");
        background-size: cover;
        background-repeat: no-repeat;
        content: " ";
        width: 150px;
        height: 150px;
        border-radius: 76px;
    }
    .stats-area .stats-2{
        display: flex;
        width: 50%;
        flex-direction: row-reverse;
        margin-inline-start: 10px;    
    }
    .stats-area .stats-2 span{
        font-family:  'Space Grotesk';
        font-style: normal;
        font-weight: 500;
        font-size: 40px;
        line-height: 48px;
        letter-spacing: -0.02em;
        color: #ffffff;
        padding: 10px;
        background: #1e7ddf;
        border-radius: 35px;
        height: 50px;
        width: 50px;
        text-align: center;
        z-index: 1;
        position: relative;
        top: 90px;
        left: -155px;
    }
    .stats-2 h4{
        height: 20px;
        width: 120px;
        border-radius: 15px;
        padding: 8px;
        background: #d3e7fd;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 24px;
        color: #1e7ddf;
        position: relative;
        left: -50px;
        z-index: 3;
    }
    .files-pic{
        display: flex;
        background: url("../../icons/audio-files.avif");
        background-size: cover;
        background-repeat: no-repeat;
        content: " ";
        width: 150px;
        height: 150px;
        border-radius: 15px;
    }
</style>

    
