<script lang="ts">
    export let BtnText: string, func: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) => any,
    BtnDisabled: boolean | undefined
</script>

<button on:click={func} disabled="{BtnDisabled}">{BtnText}</button>

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
        color: #1E7DDF;
        background: #d3e7fd;
        margin-inline: 16px; 
    }
    button:hover {
        background: #2288f4;
        color: #ffffff;
    }
</style>