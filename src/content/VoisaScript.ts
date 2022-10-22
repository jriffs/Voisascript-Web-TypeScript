import { audioControl } from "./audio-control"
import { changeElement } from "./change"
import { getElementsWithKeywords } from "./get-elements"
import Browser from "webextension-polyfill"
import { OnMessageRequestValue } from "src/interfaces/interfaces"
import { WAS } from "./wavesurfer-audio"

// perform task only when user moves mouse over document body
const body = document.body
const head = document.head
const elements = body.children
let was: WAS
let recorder: MediaRecorder,
dataArray: Blob[] = []
let testSending: any

createRecordArea()
InitializeAudio()

function checkNchange() {
    if (getElementsWithKeywords(elements).length > 0) {
        let content = getElementsWithKeywords(elements)
        changeElement(content, body, checkNchange).finally(() => {
            audioControl()
        })
        return
    }            
}

body.addEventListener('mouseover', checkNchange)

async function InitializeAudio(): Promise<void> {
    console.log('initializing audio ...')
    was = new WAS()
    console.log(`done initializing audio ...`)
    console.log(was.state())
}


function createRecordArea(): void {
    let recordArea = document.createElement('div')
    recordArea.innerHTML = `
        <div class="hidden" id="waveform"></div>
    `
    recordArea.classList.add('hidden')
    body.appendChild(recordArea)
}

Browser.runtime.onMessage.addListener( async (request: OnMessageRequestValue) => {
    switch (request.action) {
        case 'start':
            // recorder.start()
            was.startRecording()
            console.log(was.state())
            // return Promise.resolve({recorderState: recorder.state})
            return Promise.resolve({recorderState: was.state()})
            break;
        case 'pause':
            // recorder.pause()
            was.pauseRecording()
            console.log(was.state())
            // return Promise.resolve({recorderState: recorder.state})
            return Promise.resolve({recorderState: was.state()})
            break;
        case 'stop':
            // recorder.stop()
            was.stopRecording()
            // return Promise.resolve({recorderState: recorder.state})
            return Promise.resolve({recorderState: was.state()})
            break;
        case 'retreive':
            if (was.state() == 'inactive' && was.buff()) {
                const reader = new FileReader()
                reader.onload = function(event){
                    testSending = event?.target?.result
                }
                const audBlob = was.buff() as Blob
                reader.readAsDataURL(audBlob)
                return Promise.resolve({recorderState: was.state(), audioBlobText: testSending})
            }
            return Promise.resolve({recorderState: was.state()})
            break;
        case 'resume':
            // recorder.resume()
            was.resumeRecording()
            console.log(was.state())
            return Promise.resolve({recorderState: was.state()})
            break;
    } 
})