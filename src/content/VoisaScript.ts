import { audioControl } from "./audio-control"
import { changeElement } from "./change"
import { getElementsWithKeywords } from "./get-elements"
import Browser from "webextension-polyfill"
import { OnMessageRequestValue } from "src/interfaces/interfaces"

// perform task only when user moves mouse over document body
const body = document.body
const head = document.head
const elements = body.children
let recorder: MediaRecorder,
dataArray: Blob[]

createRecordArea()
InitializeAudio()

function checkNchange() {
    console.log('hovered over body !!!')
    if (getElementsWithKeywords(elements).length > 0) {
        let content = getElementsWithKeywords(elements)
        changeElement(content, body, checkNchange).finally(() => {
            audioControl()
        })
        console.log('done with changing link to V-audio !!')
        return
    }            
}

body.addEventListener('mouseover', checkNchange)

async function InitializeAudio(): Promise<void> {
    let audioIN = { audio: true }
    try {
        const mediastremObj = await navigator.mediaDevices.getUserMedia(audioIN)
        const mediaRecorder = new MediaRecorder(mediastremObj)
        recorder = mediaRecorder
        recorder.ondataavailable = (ev)=>{
            dataArray.push(ev.data)
        }
        recorder.onstop = (ev) => {
            const downloadTag = document.querySelector('#file-download') as HTMLAnchorElement
            const audioFile = new Blob(dataArray, {'type': 'audio/mp3;'})
            const url = window.URL.createObjectURL(audioFile)
            downloadTag.href = url
            downloadTag.download = `my-${Date.now()}-audio.mp3`
            downloadTag.click()
            window.URL.revokeObjectURL(url)
            dataArray = []
        }
    } catch (e) {
        throw e
    }
}

function createRecordArea(): void {
    let recordArea = document.createElement('div')
    recordArea.innerHTML = `
        <a href="" class="hidden" id="file-download"></a>
    `
    recordArea.classList.add('hidden')
    body.appendChild(recordArea)
}

Browser.runtime.onMessage.addListener((request: OnMessageRequestValue) => {
    switch (request.action) {
        case 'start':
            recorder.start()
            console.log(recorder.state)
            return Promise.resolve({recorderState: recorder.state})
            break;
        case 'pause':
            recorder.pause()
            console.log(recorder.state)
            return Promise.resolve({recorderState: recorder.state})
            break;
        case 'stop':
            recorder.stop()
            console.log(recorder.state)
            return Promise.resolve({recorderState: recorder.state})
            break;
        case 'retreive':
            return Promise.resolve({recorderState: recorder.state})
            break;
        case 'resume':
            recorder.resume()
            console.log(recorder.state)
            return Promise.resolve({recorderState: recorder.state})
            break;
    } 
})