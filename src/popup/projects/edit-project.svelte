<script>
    import { screen } from "../store";
    import { fade } from "svelte/transition";
    import BackHeader from "../back-header.svelte";
    import ButtonSecondary from "../buttons/button-secondary.svelte";
    import ButtonPrimary from "../buttons/button-primary.svelte";
</script>

{#if $screen.current === 'Edit project'}
    <BackHeader/>
    <div transition:fade class="create-project">
        <div class="header-area">
            <h4>Edit Project</h4>
        </div>
        <div class="input-area">
            <input type="text" placeholder="Enter project name">
            <input type="text" placeholder="Enter project description">
        </div>
        <div class="control-area">
            <ButtonSecondary BtnText={'Cancel'}/>
            <ButtonPrimary BtnText={'Update'}/>
        </div>
    </div>
{/if}

<style>
    .create-project{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-width: 100%;
        min-height: 75%;
    }
    .create-project .header-area{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        min-width: 100%;
    }
    .create-project .header-area h4{
        font-family: 'Space Grotesk';
        font-size: 28px;
        font-weight: 400;
        line-height: 36px;
        letter-spacing: -0.02em;
        text-align: left;
        margin-inline-start: 30px;
    }
    .create-project .input-area{
        min-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        min-height: 150px;
        margin-block-start: -15%;
    }
    .create-project .input-area input{
        width: 400px;
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
    }
    .create-project .control-area{
        margin-block-end: 5%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-around;
    }
</style>