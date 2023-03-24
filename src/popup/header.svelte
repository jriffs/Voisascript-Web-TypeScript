<script lang="ts">
    import Browser from "webextension-polyfill";
    import { screen } from "./store";
    let username: any
    async function set() {
        const { userData } = await Browser.storage.local.get('userData')
        username = userData.username
    }
    set()
    
    function settingsClick(){
        screen.set({current: 'Settings', previous: ''})
    }
    function notificationClick() {
        screen.set({current: 'Task-Monitor', previous: ''})
    }
</script>

<div class="header">
    <div class="logo">
        <img src="../icons/V2-2.png" alt="voisacript logo" />
        <h5>Voisascript</h5>
    </div>
    <div class="settings-area">
        <button on:click={notificationClick}>
            <img src="../icons/notification.svg" alt="notification" />
        </button>
        <button on:click={settingsClick}>
           <img src="../icons/settings.svg" alt="settings" /> 
        </button>
    </div>
</div>

<style>
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 100%;
        min-height: 55px;
        /* border-bottom: 1px solid #000000; */
        box-shadow:
        0px 0.9px 2.6px -5px rgba(0, 0, 0, 0.015),
        0px 7px 25px -5px rgba(0, 0, 0, 0.03)
        ;
    }
    .logo {
        width: 100%;
        min-height: fit-content;
        /* padding: 10px; */
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
    }
    .logo h5{
        font-family:  'Space Grotesk';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        margin-inline-start: -25px;
        color: #021931;  
    }
    .logo img {
        width: 110px;
        height: 110px;
    }
    .settings-area {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 15%;
        padding-inline: 10px;
    }
    .settings-area button{
        border-radius: 50%;
        border: transparent;
        padding: 8px;
    }
    .settings-area button img {
        border-radius: 50%;
        max-height: 30px;
        /* border: 2px solid black; */
    }
</style>
