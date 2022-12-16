<script lang="ts">
 export let BtnText: string, exec: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) => any
</script>

<button on:click={exec}>{BtnText}</button>

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
    button:hover {
        background: #1e7ddf;
    }
</style>