<script lang="ts">
    import { modal, showModal } from "../store";
    // import { slide } from "svelte/transition";
    export let showBackDrop: boolean

    function handleClick() {
        showBackDrop = false
    }
    $: if (showBackDrop == false) {
        showModal.set(false)
        modal.set({
            message: '',
            onYes: async () => {},
            onNo: async () => {}
        })
    }
</script>

{#if showBackDrop}
    <div class="back-drop" on:click={handleClick} on:keypress={() => {}}></div> 
{/if}

<style>
.back-drop{
    width: 600px;
    min-height: 100%;
    background: #c2bfbf;
    opacity: 0.45;
    position: absolute;
    top: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>