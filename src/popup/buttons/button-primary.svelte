<script lang="ts">
    export let BtnText: string, exec: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) => any

    export let BtnLoading: boolean = false
</script>

{#if BtnLoading}
    <button on:click={exec} class:btnLoading="{BtnLoading}">
        <img src="../icons/icons8-dots-loading.gif" alt="">
    </button>
{:else}
    <button on:click={exec}>{BtnText}</button>
{/if}


<style>
    button {
        padding-block: 12.5px;
        padding-inline: 20px;
        text-align: center;
        font-size: 16px;
        border-radius: 5px;
        outline: none;
        border-color: transparent;
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.005em;
        color: #ffffff;
        background: #2288f4;
        margin-inline: 16px;
    }
    button img{
        width: 30px;
        height: 30px;
    }
    button:hover {
        background: #1e7ddf;
    }
    .btnLoading{
        background: #ffffff !important;
        padding-block: 8.5px;
        padding-inline: 80px;
        border: 1px solid #2288f4;
    }
</style>