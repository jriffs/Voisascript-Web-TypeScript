<script lang="ts">
    import { screen } from "../store";
    import { fade } from "svelte/transition";
    import Header from "../header.svelte";
    import NavButton from "./navigation-buttons.svelte";
    import Browser from "webextension-polyfill";
    
    let username: string
    $: if ($screen.current == 'dashboard') {
        Browser.storage.local.get('userData').then(({userData}) => {
            console.log(userData)        
            if (!userData) return
            username = userData?.username
        }) 
    }
</script>

{#if $screen.current === 'dashboard'}
    <Header/>
    <div transition:fade class="dashboard-content">
        <div class="welcome">
           <p>Welcome back {username},</p> 
        </div>
        <div class="navigate-area">
            <NavButton placeholderText={'Record audio'}/>
            <NavButton placeholderText={'Manage projects'}/>
        </div>
        <div class="stats-area"></div>
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
        background: #e9e7e7;
        margin-top: 70;
    }
</style>

    
