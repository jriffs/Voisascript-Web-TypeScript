import { ElementValues } from "../interfaces/interfaces.js"
import Browser from "webextension-polyfill"
import { getURL } from "../background/get-url"
// changing all elements that have the keyword in them to... 
// VoisaScript widgets with playable audio files.

async function somn(mesage: {}) {
    const sent = await Browser.runtime.sendMessage(mesage)
    console.log(sent)    
    return Promise.resolve(sent.data) 
}


export async function changeElement(contentArr: ElementValues[]) {  
    try {
        const promises = contentArr.map((item) => {
            const url_promise = somn({message: item.text})                       
            return url_promise
        })       
        const urls = await Promise.all(promises)              
        if (urls.length > 0) {
            for (let i = 0; i < contentArr.length; i++) {
                contentArr[i].element.textContent = ''
                let container = document.createElement('div')
                container.classList.add('cont')
                container.innerHTML = `
                <audio src="${urls[i]}" data-id="v-audio" class=""></audio>
                <div class="hover-test-box">
                    <div class="v-logo pulsate-bck" style="content: url(${Browser.runtime.getURL('./icons/Voisascript-1-1.png')});"></div>
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
                contentArr[i]?.element?.parentElement?.appendChild(container)
            }
            return {update: 'change successful'} 
        }
        return  {update: 'change successful'}
    } catch (error) {
        return {update: 'change unsuccessful'}
    } 
}