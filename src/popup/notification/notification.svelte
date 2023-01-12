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
        {#if $notification.type == 'info'}
            <div class="loading">
                <img src="../icons/dot-spinner.gif" alt="">
            </div>
        {/if}
        <button class="cancel-button" on:click={handleCancel}>
            <img src="../icons/cancel.svg" alt="cancel">
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
        padding-inline-start: 10px;
    }
    .notification button img{
        width: 10;
        height: 10;
    }
    .loading{
        margin-inline: 10px;
    }
    .success {
        background: #83e283;
    }
    .error {
        background: #f8552c;
    }
    .info{
        background: #ffffff;
        border: 1px solid #566676;
        color: #2288f4;
    }
</style>