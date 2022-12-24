<script lang="ts">
    import Browser from "webextension-polyfill";
    import BackHeader from "../back-header.svelte";
    import { screen } from "../store";
    import { fade } from "svelte/transition";

    let transform: boolean
    async function getCST() {
       const {ContentScriptTransform} = await Browser.storage.local.get('ContentScriptTransform')
       return ContentScriptTransform?.value 
    }
    async function getTransform() {
       transform = await getCST() 
    }
    getTransform()
    
    async function HandleCSTToggle() {
        if (await getCST() == true) {
            await Browser.storage.local.set({ContentScriptTransform: {value: false}})
            transform = false
        } else {
            await Browser.storage.local.set({ContentScriptTransform: {value: true}})
            transform = true
        }        
    }
</script>

{#if $screen.current === 'Settings'}
    <BackHeader/>
    <div transition:fade class="settings">
        <div class="settings-area">
            <div class="setting-name">
                <h5>Content Script Transform</h5>
            </div>
            <div class="setting-value">
                <button on:click={HandleCSTToggle}>
                    {#if transform}
                        <img src="../icons/toggle-on-30.png" alt="toggle-on">
                    {:else}
                        <img src="../icons/toggle-off-30.png" alt="toggle-off" class="off">
                    {/if}
                </button>
            </div> 
        </div>
    </div>
{/if}

<style>
    .settings{
        min-width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .settings .settings-area{
        min-width: 100%;
        height: 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .settings .settings-area .setting-name{
        min-width: fit-content;
        min-height: fit-content;
    }
    .settings .settings-area .setting-name h5{
        font-family: 'Space Grotesk';
        font-size: 24px;
        font-weight: 400;
        line-height: 32px;
        letter-spacing: -0.02em;
        text-align: left;
        margin-inline-start: 16px;
    }
    .settings .settings-area .setting-value{
        min-width: fit-content;
        min-height: fit-content;
    }
    .settings .settings-area .setting-value button{
        background: transparent;
        border: none;
        margin-inline-end: 16px;
    }
    .off{
        rotate: 180deg;
    }
</style>