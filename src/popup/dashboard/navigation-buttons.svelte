<script lang="ts">
    import { screen } from "../store";
    import BtnSecondary from "../buttons/button-secondary.svelte";
    export let placeholderText: string, currentScreen = $screen.current
    function handleButtonClick() {
        const text = `${placeholderText}`
        screen.set({current: text, previous: currentScreen})
    }
    let BtnDisabled: boolean
</script>
<BtnSecondary BtnText={placeholderText} func={handleButtonClick} {BtnDisabled}/>

<style>
    
    /* button {
        margin-inline: 10px;
        padding: 10px;
        border-radius: 4px;
        border: transparent;
    } */
</style>