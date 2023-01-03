<script lang="ts">
    import ButtonPrimary from "../buttons/button-primary.svelte";
    import ButtonSecondary from "../buttons/button-secondary.svelte";
    import { modal, showModal } from "../store";
    import { slide } from "svelte/transition";
    import Backdrop from "./backdrop.svelte";
    let BtnDisabled: boolean, BtnLoading: boolean
    $: showBackDrop = $showModal
    function yes() {
        showModal.set(false)
        let execute = $modal.onYes
        execute().then(() => {
            modal.set({
                message: '',
                onYes: async () => {},
                onNo: async () => {}
            })
        })
    }
    function no() {
        showModal.set(false)
        let execute = $modal.onNo
        execute().then(() => {
            modal.set({
                message: '',
                onYes: async () => {},
                onNo: async () => {}
            })
        })
    }
</script>

{#if $showModal == true}
    <Backdrop {showBackDrop}/>
    <div transition:slide class="modal">
        <h3 class="heading">{$modal.message}</h3>
        <div class="modal-choice">
            <ButtonSecondary BtnText={'Yes'} func={yes} {BtnDisabled}/>
            <ButtonPrimary BtnText={'No'} exec={no} {BtnLoading}/>
        </div>
    </div>
{/if}


<style>
    .modal{
        min-width: 150px;
        min-height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: #ffffff;
        z-index: 3;
        position: absolute;
        top: 36%;
        left: 30%
    }
    .heading{
        font-family:' Space Grotesk';
        font-size: 22px;
        font-weight: 400;
        line-height: 35px;
        letter-spacing: -0.02em;
        text-align: center;
        padding: 10px;
        max-width: 215px;
    }
    .modal-choice{
        min-width: 50%;
        min-height: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-block: 10px;
    }
</style>