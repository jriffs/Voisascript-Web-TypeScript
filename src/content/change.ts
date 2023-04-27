import { ElementValues } from "../interfaces/interfaces.js"
import Browser from "webextension-polyfill"
// import { getURL } from "../background/get-url"
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
                <div class="hover-test-box">
                    <div class="v-logo pulsate-bck" style="content: url(${Browser.runtime.getURL('./icons/V2-3.png')});"></div>
                    <span class="popup-audio" id="myPopup">
                        <div class="audio-control play" style="content: url(${Browser.runtime.getURL('./icons/blue-play-40.png')});"></div>
                        <div class="waveform" id="${urls[i]}"></div>
                    </span>
                </div>
                `        
                contentArr[i]?.element?.parentElement?.appendChild(container)
                console.log(urls[i])                
            }
            return {update: 'change successful'} 
        }
        return  {update: 'No voisascript links to convert'}
    } catch (error) {
        return {update: 'change unsuccessful'}
    } 
}