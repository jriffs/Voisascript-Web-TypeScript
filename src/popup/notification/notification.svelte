<script lang="ts">
    import { fade } from "svelte/transition";
    import { notification } from "../store";

    function handleCancel() {
        notification.set({
            show: false,
            type: '',
            message: ''
        })
    }
</script>

{#if $notification.show}
    <div transition:fade class="notification {$notification.type}" >
        <h3>{$notification.message}</h3>
        <button class="cancel-button" on:click={handleCancel}>
            <!-- <img src="../icons/" alt="cancel"> -->
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" width="16px" height="16px"><path fill="#f78f8f" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"/><path fill="#c74343" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"/><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"/><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"/></svg>
        </button>
    </div>
{/if}


<style>
    .notification {
        position: absolute;
        top: 10px;
        right: 10px;
        min-width: 200px;
        min-height: 20px;
        padding-inline: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        z-index: 1;
    }
    .notification button {
        background: transparent;
        border: none;
    }
    .success {
        background: #83e283;
    }
    .error {
        background: #f8552c;
    }
</style>