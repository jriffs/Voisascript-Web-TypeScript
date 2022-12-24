<script lang="ts">
    import { showBackDrop } from "../store";
    import { slide } from "svelte/transition";
    function handleClick() {
        showBackDrop.set(false)
    }
</script>

{#if $showBackDrop}
    <div transition:slide class="back-drop" on:click={handleClick} on:keypress={() => {}}></div> 
{/if}

<style>
.back-drop{
    width: 600px;
    min-height: 600px;
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