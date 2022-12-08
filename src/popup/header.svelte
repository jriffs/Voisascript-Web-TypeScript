<script lang="ts">
    import Browser from "webextension-polyfill";
    let username: any
    async function set() {
        const { userData } = await Browser.storage.local.get('userData')
        username = userData.username
    }
    set()
</script>

<div class="header">
    <div class="logo">
        <img src="../icons/V2-2.png" alt="voisacript logo" />
    </div>
    <div class="user-avatar">
        <h3 class="username">{username}</h3>
        <img src="../icons/user1.jpg" alt="user" />
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
        border-bottom: 1px solid #000000;
    }
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 70%;
        margin-left: 10px;
    }
    .logo img {
        max-height: 40px;
    }
    .user-avatar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 15%;
        padding-inline: 10px;
    }
    .user-avatar img {
        border-radius: 50%;
        max-height: 30px;
        border: 2px solid black;
    }
</style>
