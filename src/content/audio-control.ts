import Browser from "webextension-polyfill"
import { convertMin } from "../misc/convert-min";
import WaveSurfer from "wavesurfer.js";
// import "wavesurfer.js/dist/wavesurfer.min.css";


let wsAudioList: {key: string, ws: WaveSurfer}[]

export function audioControl() {
    let v_logos = document.querySelectorAll('.v-logo'),
    play_buttons = document.querySelectorAll('.audio-control')


    function visibility_toggle(target: Element) {
        target.classList.toggle('show')
    }

    v_logos.forEach(v_logo => {
        v_logo.addEventListener('click', () => {
            let audioBox = v_logo.nextElementSibling!, play_button = v_logo.nextElementSibling?.children.item(0)!
            visibility_toggle(audioBox)
            let waveform: HTMLElement = v_logo.nextElementSibling?.children.item(1) as HTMLElement, wsAudio: WaveSurfer
            if (!waveform.getAttribute("data-init")) {
                console.log(`audio has not been initialized..`)
                wsAudio = WaveSurfer.create({
                    container: waveform,
                    backgroundColor: "transparent",
                    barGap: 2,
                    barHeight: 2,
                    barWidth: 3,
                    waveColor: '#ffffff',
                    progressColor: '#2288f4',
                    cursorColor: 'navy',
                })
                waveform.setAttribute("data-init", "true")
                wsAudio.load(`${waveform.id}`)
                wsAudio.on("ready", async() => {
                    console.log("audio is ready")                    
                })
                if (!wsAudioList) {
                    wsAudioList = [{key: `${waveform.id}`, ws: wsAudio}]
                } else {
                    wsAudioList.push({key: `${waveform.id}`, ws: wsAudio})
                }
                wsAudio.on("play", () => {
                    play_button.setAttribute("style", `content: url(${Browser.runtime.getURL('./icons/blue-pause-40.png')});`)
                })                                    
                wsAudio.on("pause", () => {
                    play_button.setAttribute("style", `content: url(${Browser.runtime.getURL('./icons/blue-play-40.png')});`)
                })                                    
                wsAudio.on("finish", () => {
                    play_button.setAttribute("style", `content: url(${Browser.runtime.getURL('./icons/blue-play-40.png')});`)
                })                
            }                        
        })
    })

    play_buttons.forEach(play_button => {
        play_button.addEventListener('click', async () => {
            let waveform: HTMLElement = play_button?.nextElementSibling as HTMLElement            
            const {ws} = wsAudioList.find((list) => list.key == waveform.id)!
            if (!ws) {
                throw new Error("failed to get wsAudio")
            }            
            if (ws.isPlaying()) {
                ws.pause()
            } else {
                await ws.play()
            }                                    
        })
    })
}