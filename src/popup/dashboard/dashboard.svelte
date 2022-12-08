<script lang="ts">
    import { screen } from "../store";
    import { fade } from "svelte/transition";
    import Header from "../header.svelte";
    import NavButton from "./navigation-buttons.svelte";
    
</script>

{#if $screen === 'dashboard'}
    <Header/>
    <div transition:fade class="dashboard-content">
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
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
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

    
