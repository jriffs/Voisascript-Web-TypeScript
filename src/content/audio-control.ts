import Browser from "webextension-polyfill"

export function audioControl() {
    let v_logos = document.querySelectorAll('.v-logo'),
    // audio_time = document.querySelector('.audio-time')!,
    rewind_buttons = document.querySelectorAll('.rewind')!,
    forward_buttons = document.querySelectorAll('.forward')!,
    play_buttons = document.querySelectorAll('.audio-control')
    

    function visibility_toggle(target: Element) {
        target.classList.toggle('show')
    }

    function active_audio_toggle(target: Element) {
        target.classList.toggle('v-audio-active')
    }

    function animateBar(bars: HTMLCollection) {
        for (const bar of bars) {
            bar.classList.toggle('up-down')
        }
    }

    function convertMin(time: number) {
        time = Math.round(time)

        if (time >= 60) {
            let min = Math.round(time/60)
            let sec
            let rem = time - 60
            if (rem < 10) {
                sec = Number(time - 60).toFixed()
                return `${min}:0${sec}`
            } else {
                sec = Math.round(time - 60)
                return `${min}:${sec}`
            }
                
        }else if(time == 0) {
            return `${0}:${0}`
        } else{
            let min = 0
            let rem = Math.round(time)
            let sec
            if (rem < 10) {
                sec = Number(time).toFixed()
                return `${min}:0${sec}`
            } else {
                sec = Math.round(time)
                return `${min}:${sec}`
            }  
        }
                
    }

    v_logos.forEach(v_logo => {
        v_logo.addEventListener('click', () => {
            let audio = v_logo?.parentElement?.previousElementSibling as HTMLAudioElement
            let audio_time = v_logo?.parentElement?.querySelector('.audio-time')!
            active_audio_toggle(audio)
            audio_time.textContent = convertMin(audio?.duration)
            let audioBox = v_logo.nextElementSibling!
            visibility_toggle(audioBox)        
        })
    })

    play_buttons.forEach(play_button => {
        play_button.addEventListener('click', () => {
            let bars = play_button?.parentElement?.querySelector('.main-anim-container')?.children!        
            let v_audio = play_button.parentElement?.parentElement?.previousElementSibling as HTMLAudioElement
            let audio_time = play_button?.parentElement?.querySelector('.audio-time')!       
            if (v_audio.paused) {
                v_audio.play()
                play_button.setAttribute("style", `content: url(${Browser.runtime.getURL('./icons/content/icons8-pause-64.png')});`)
                audio_time.textContent = convertMin(v_audio.currentTime)
                const audioTimer = setInterval(() => {
                    audio_time.textContent = convertMin(v_audio.currentTime)
                    if (v_audio.currentTime == v_audio.duration) {
                        animateBar(bars)
                        v_audio.pause()
                        play_button.setAttribute("style", `content: url(${Browser.runtime.getURL('./icons/content/icons8-play-64.png')});`)
                        clearInterval(audioTimer)                    
                    }                
                }, 1000)
            } else {
                v_audio.pause()
                play_button.setAttribute("style", `content: url(${Browser.runtime.getURL('./icons/content/icons8-play-64.png')});`)
                audio_time.textContent = convertMin(v_audio.currentTime)                        
            }
            animateBar(bars)                                  
        })
    })

    rewind_buttons.forEach((rewind) => {
        rewind.addEventListener('click', ()=>{
            let v_audio = rewind.parentElement?.parentElement?.parentElement?.previousElementSibling as HTMLAudioElement
            let audio_time = rewind?.parentElement?.parentElement?.querySelector('.audio-time')!
            v_audio.currentTime -= 5
            audio_time.textContent = convertMin(v_audio.currentTime)
        })
    })
    
    forward_buttons.forEach((forward) => {
        forward.addEventListener('click', ()=>{
            let v_audio = forward.parentElement?.parentElement?.parentElement?.previousElementSibling as HTMLAudioElement
            let audio_time = forward?.parentElement?.parentElement?.querySelector('.audio-time')!
            v_audio.currentTime += 5
            audio_time.textContent = convertMin(v_audio.currentTime)
        })
    })
}