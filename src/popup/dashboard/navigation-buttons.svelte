<script lang="ts">
    import { screen } from "../store";
    export let placeholderText: string
    function handleButtonClick() {
        const text = `${placeholderText}`
        screen.set(text)
    }
</script>

<button on:click={handleButtonClick}>{placeholderText}</button>

<style>
    
    button {
        margin-inline: 10px;
        padding: 10px;
        border-radius: 4px;
        border: transparent;
    }
</style>