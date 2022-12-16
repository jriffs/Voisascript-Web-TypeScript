<script lang="ts">
    export let animateAudioWave: {play: boolean, pause: boolean, stop: boolean} = {play: false, pause: false, stop: true}
</script>

<div class="bars-container">
    <div class="bars">
        {#if animateAudioWave.play}
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
            <div class="bar" class:up-down="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
        {/if}
        {#if animateAudioWave.stop}
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        {/if}
    </div>
    <div class="pointer" class:move-left="{animateAudioWave.play}" class:pause="{animateAudioWave.pause}"></div>
</div>


<style>
    .bars-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-width: 100%;
    }
    .bars-container .bars{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 50%;
    }
    .bars-container .bars .bar{
        width: 2px;
        background: #2c3f53;

    }
    .bar:nth-child(1){
        height: 9.81px;
        animation-delay: 0.11s;
    }
    .bar:nth-child(2){
        height: 12.73px;
        animation-delay: 0.18s;
    }
    .bar:nth-child(3){
        height: 14.59px;
        animation-delay: 0.27s;
    }
    .bar:nth-child(4){
        height: 19.36px;
        animation-delay: 0.34s;
    }
    .bar:nth-child(5){
        height: 26.53px;
        animation-delay: 0.07s;
    }
    .bar:nth-child(6){
        height: 19.36px;
        animation-delay: 0.12s;
    }
    .bar:nth-child(7){
        height: 22.81px;
        animation-delay: 0.19s;
    }
    .bar:nth-child(8){
        height: 13.79px;
        animation-delay: 0.24s;
    }
    .bar:nth-child(9){
        height: 15.92px;
        animation-delay: 0.56s;
    }
    .bar:nth-child(10){
        height: 9.81px;
        animation-delay: 0.23s;
    }
    .bar:nth-child(11){
        height: 9.81px;
        animation-delay: 0.30s;
    }
    .bar:nth-child(12){
        height: 12.73px;
        animation-delay: 0.69s;
    }
    .bar:nth-child(13){
        height: 14.59px;
        animation-delay: 0.45s;
    }
    .bar:nth-child(14){
        height: 19.36px;
        animation-delay: 0.23s;
    }
    .bar:nth-child(15){
        height: 35.01px;
        animation-delay: 0.47s;
    }
    .bar:nth-child(16){
        height: 19.36px;
        animation-delay: 1.42s;
    }
    .bar:nth-child(17){
        height: 22.81px;
        animation-delay: 1.23s;
    }
    .bar:nth-child(18){
        height: 13.79px;
        animation-delay: 0.23s;
    }
    .bar:nth-child(19){
        height: 15.92px;
        animation-delay: 1.06s;
    }
    .bar:nth-child(20){
        height: 9.81px;
        animation-delay: 0.70s;
    }
    .bar:nth-child(21){
        height: 9.81px;
        animation-delay: 0.73s;
    }
    .bar:nth-child(22){
        height: 12.73px;
        animation-delay: 0.47s;
    }
    .bar:nth-child(23){
        height: 14.59px;
        animation-delay: 0.23s;
    }
    .bar:nth-child(24){
        height: 19.36px;
        animation-delay: 0.39s;
    }
    .bar:nth-child(25){
        height: 26.53px;
        animation-delay: 0.67s;
    }
    .bar:nth-child(26){
        height: 19.36px;
        animation-delay: 0.13s;
    }
    .bar:nth-child(27){
        height: 22.81px;
        animation-delay: 0.54s;
    }
    .bar:nth-child(28){
        height: 50px;
        animation-delay: 0.95s;
    }
    .bar:nth-child(29){
        height: 15.92px;
        animation-delay: 0.62s;
    }
    .bar:nth-child(30){
        height: 9.81px;
        animation-delay: 0.04s;
    }
    .bar:nth-child(31){
        height: 9.81px;
        animation-delay: 0.82s;
    }
    .bar:nth-child(32){
        height: 12.73px;
        animation-delay: 0.19s;
    }
    .bar:nth-child(33){
        height: 14.59px;
        animation-delay: 0.41s;
    }
    .bar:nth-child(34){
        height: 19.36px;
        animation-delay: 0.23s;
    }
    .bar:nth-child(35){
        height: 35.01px;
        animation-delay: 0.23s;
    }
    .bar:nth-child(36){
        height: 19.36px;
        animation-delay: 0.18s;
    }
    .bar:nth-child(37){
        height: 22.81px;
        animation-delay: 0.74s;
    }
    .bar:nth-child(38){
        height: 13.79px;
        animation-delay: 0.02s;
    }
    .bar:nth-child(39){
        height: 15.92px;
        animation-delay: 0.44s;
    }
    .bar:nth-child(40){
        height: 9.81px;
        animation-delay: 0.13s;
    }
    .pointer{
        height: 60px;
        width: 2px;
        border-radius: 0px;
        background: #2288f4;
        position: relative;
        left: -22%;
    }

    @keyframes upDown {
        0%{height: 9.81px;}
        15%{height: 12.73px;}
        25%{height: 15.92px;}
        50%{height: 22.81px;}
        70%{height: 35.01px;}
        90%{height: 20.61px;}
        100%{height: 11.81px;}
    }

    .up-down{
        animation-name: upDown;
        animation-duration: 0.60s;
        animation-iteration-count: infinite;
    }

    @keyframes move-left{
        from{left: -51%;}
        to{left: 0%;}
    }

    .move-left{
        animation-name: move-left;
        animation-duration: 30s;
        animation-iteration-count: infinite;
    }
    .pause{
        animation-play-state: paused;
    }
    
</style>