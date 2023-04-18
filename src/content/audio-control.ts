import Browser from "webextension-polyfill"
import { convertMin } from "../misc/convert-min";
import WaveSurfer from "wavesurfer.js";

export function audioControl() {
    let v_logos = document.querySelectorAll('.v-logo'),
    play_buttons = document.querySelectorAll('.audio-control')
    

    function visibility_toggle(target: Element) {
        target.classList.toggle('show')
    }

    v_logos.forEach(v_logo => {
        v_logo.addEventListener('click', () => {
            let audioBox = v_logo.nextElementSibling!
            visibility_toggle(audioBox)        
        })
    })

    play_buttons.forEach(play_button => {
        play_button.addEventListener('click', () => {
            let waveform = play_button?.nextElementSibling as HTMLElement
            const wsAudio = WaveSurfer.create({
                container: waveform
            })
            
            wsAudio.load(`${waveform.id}`)
            wsAudio.on("ready", () => {
                console.log(`wavesurfer audio is ready`)                
            })                               
        })
    })
}