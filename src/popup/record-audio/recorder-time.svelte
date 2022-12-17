<script lang="ts">
    let sec1: number = 0, sec2:number = 0, min1: number = 0, min2: number = 0, timerID: NodeJS.Timer
    export let timerAction: string

    const timer = {
        start,
        pause,
        reset
    }
    function start() {
        timerID = setInterval(increment, 1000)        
    }
    function increment() {
        sec2 = sec2 + 1
        if (sec2 == 10) {
            sec2 = 0
            sec1 = sec1 + 1
        }
        if (parseInt(`${sec1}${sec2}`) == 60) {
            sec1 = 0
            min2 = min2 + 1
        }
        if (min2 == 10) {
            min2 = 0
            min1 = min1 + 1
        }
    }
    function pause() {
        if (timerID) {
           clearInterval(timerID) 
        }
        return
    }
    function reset() {
        if (timerID) {
            clearInterval(timerID)
        }
        sec1 = 0
        sec2 = 0
        min1 = 0
        min2 = 0
        return
    }

    $: switch (timerAction) {
        case 'start':
            timer.start()
            break;
        case 'reset':
            timer.reset()
            break;
        case 'pause':
            timer.pause()
            break;
    }
</script>

<span>{min1}{min2}:{sec1}{sec2}</span>

<style>
    span{
        font-family: Inter;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
    }
</style>