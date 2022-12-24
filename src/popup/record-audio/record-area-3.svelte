<script lang="ts">
    import { screen, fileURL } from "../store";
    import { fade } from "svelte/transition";
    import { notify } from "../notification";

    function handleCopyBtnClick() {
        navigator.clipboard.writeText($fileURL)
        notify({
            delay: 3,
            message: 'File copied successfully 🤙🤙',
            type: 'success' 
        })
    }

    function handleCancleBtn() {
        window.close()
    }
</script>

{#if $screen.current == 'Record audio 3'}
    <div transition:fade class="audio-clipboard">
        <div class="header">
            <button on:click={handleCancleBtn}>
            <img src="../icons/cancel.svg" alt="cancel"> 
            </button>
        </div>
        <div class="check-place">
            <div class="check">
                <img src="../icons/check.svg" alt="check-mark">
            </div>
            <p>Recording uploaded successfully!!</p>
        </div>
        <div class="clipboard">
            <input type="text" placeholder="copy link to clipboard" value="{$fileURL}">
            <button on:click={handleCopyBtnClick}>Copy link</button>
        </div>
    </div>
{/if}


<style>
    .audio-clipboard{
        min-width: 100%;
        min-height: 500;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .header {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        min-width: 100%;
        min-height: 55px;
        /* border-bottom: 1px solid #000000; */
        box-shadow:
        0px 0.9px 2.6px -5px rgba(0, 0, 0, 0.015),
        0px 7px 25px -5px rgba(0, 0, 0, 0.03)
        ;
        padding: 10px;
    }
    .header button{
        background: transparent;
        border: none;
        margin-inline-end: 20px;
    }
    .header button img{
        width: 15;
        height: 15;
    }
    .check-place{
        min-width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .check-place .check{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 80;
        height: 80;
        background: #6CB0F8;
    }
    .check-place .check img{
        height: 30px;
        width: 30px;
    }
    .check-place p{
        font-family: 'Inter';
        font-size: 14px;
        font-weight: 400;
        line-height: 10px;
        letter-spacing: 0em;
        text-align: center;
        padding-block: 28px;
    }
    /* .clipboard{
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 70%;
    } */
    .clipboard input{
        margin-inline-start: 16px;
        width: 380px;
        height: 60px;
        background: #f9f9f9;
        border: 1px solid #f6f6f6;
        border-radius: 6px;
        outline: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 0px;
        color: #566676;
        padding-inline-start: 12px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
    .clipboard button{
        padding: 0px 12px 0px 12px;
        text-align: center;
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
        /* margin-inline: 16px; */
        position: relative;
        top: -52px;
        left: 72%;
        width: 102px;
        height: 41px; 
    }
</style>