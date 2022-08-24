import { ElementValues } from "../interfaces/interfaces.js"
import Browser from "webextension-polyfill"
// changing all elements that have the keyword in them to... 
// VoisaScript widgets with playable audio files.

export function changeElement(contentArr: ElementValues[], body: HTMLElement, func: (this: HTMLElement, ev: MouseEvent) => any) {
    body.removeEventListener('mouseover', func)
    contentArr.forEach(item => {
        console.log(item.text)
        item.element.textContent = ''
        let container = document.createElement('div')
        container.classList.add('cont')
        container.innerHTML = `
        <audio src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_multimedia_alert_chime_short_musical_notification_cute_child_like_001_64918.mp3?_=1" data-id="v-audio" class=""></audio>
        <div class="hover-test-box">
            <div class="v-logo"></div>
            <span class="popup-audio" id="myPopup">
            <div class="audio-control play" style="content: url(${Browser.runtime.getURL('./icons/content/icons8-play-64.png')});"></div>
                <div class="seek-box">
                    <div class="forward" style="content: url(${Browser.runtime.getURL('./icons/content/icons8-fast-forward-64.png')});"></div>
                    <div class="rewind" style="content: url(${Browser.runtime.getURL('./icons/content/icons8-rewind-64.png')});"></div>
                </div>
                <span class="audio-time">3:13</span>
                <div class="main-anim-container">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </span>
        </div>
        `        
        item?.element?.parentElement?.appendChild(container)  
    })
}