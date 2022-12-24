<script lang="ts">
    import { screen, history } from "./store";
    import { fade } from "svelte/transition";

    let prevScreen = $screen.previous

    function handleClick() {
        function checkHistory(subHistory: string[], screen: string) {
            if (subHistory.includes(screen)) {
                const index = subHistory.findIndex((item) => item == screen)                               
                return index                
            }else return
        } 
        const {record, CreateProject, files, EditProject, Settings} = $history
        const subhistories = [record, CreateProject, files, EditProject, Settings]
        for (let i = 0; i < subhistories.length; i++) {           
            const screenIndex = checkHistory(subhistories[i], $screen.current)
            console.log(screenIndex)                        
            if (screenIndex !== undefined && screenIndex !== null ) {
                const previous = subhistories[i].at(screenIndex - 1)
                if (previous) {
                    screen.set({current: previous, previous: ''})
                    i = subhistories.length
                }              
            }
        }       
    }
</script>

<div class="back-header" transition:fade>
    <button on:click={handleClick}>
        <img src="./icons/back-button.svg" alt="back">
    </button>
</div>

<style>
    .back-header{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        min-width: 100%;
        min-height: fit-content;
        padding: 20;
    }
    .back-header button{
        background: transparent;
        border: none;
    }
    .back-header button img {
        width: 15;
        height: 15;
    }
</style>