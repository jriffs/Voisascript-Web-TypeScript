<script lang="ts">
    import { userData } from "../../interfaces/interfaces";
    import Browser from "webextension-polyfill";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    const dispatch = createEventDispatcher();
    async function handleSignIn() {
        try {
            const [tab] = await Browser.tabs.query({
                currentWindow: true,
                active: true
            })
            if (!tab.url) {
                dispatch('sign-in', {success: false, error: 'Please Restart Browser'})
                return
            }
            if (tab.url.split('//')[1].includes('voisascript.com/auth/ext?Bearer=')) {
                let bearer = tab.url.split('//')[1].split('=')[1]
                const headers = {
                    "authorization": `Bearer ${bearer}`,
                    "originator": `extension`
                }
                const response = await fetch('http://localhost:3000/user/validate', {
                    method: 'GET',
                    // mode: 'no-cors',
                    headers: headers
                })
                const userData = await response.json()
                if (response.ok === true) {
                    console.log(userData)
                    const user_data = userData.userData
                    const data = {
                        bearer,
                        user_data
                    }
                    dispatch('sign-in', {success: true, data})
                    return
                }
                dispatch('sign-in', {success: false, error: 'Network Failure, please check your network connection'})
                return
            }
            dispatch('sign-in', {success: false, error: 'please go to VoisaScript.com for instructions on how to sign-in'})
        } catch (e) {
            dispatch('sign-in', {success: false, error: e})
        }
    }
</script>

<div transition:fade class="main-content">
    <div class="logo">
        <img src="../icons/V2-2.png" alt="voisacript logo" />
    </div>
    <div class="content">
        <h2>Lorem Ipsum is simply dummy text</h2>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
        </p>
        <button on:click={handleSignIn}>Sign-In</button>
    </div>
</div>

<style>
    .main-content {
        min-width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    .logo {
        width: 100%;
        min-height: fit-content;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .logo img {
        width: 50px;
        height: 50px;
    }
    .content {
        margin-block: 60px;
        width: 70%;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .content h2 {
        font-size: 30px;
        margin-bottom: -5px;
    }
    .content p {
        font-size: 14px;
        margin-bottom: 60px;
    }
    .content button {
        width: 100%;
        padding: 10px;
        text-align: center;
        font-size: 16px;
        border-radius: 5px;
        outline: none;
        border-color: transparent;
        cursor: pointer;
    }
</style>
