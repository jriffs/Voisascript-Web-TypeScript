import { audioControl } from "./audio-control"
import { changeElement } from "./change"
import { getElementsWithKeywords } from "./get-elements"
import Browser from "webextension-polyfill"
import { OnMessageRequestValue, callback } from "src/interfaces/interfaces"
import { WAS } from "./wavesurfer-audio"
import { Events } from "../events";

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

function checkNchange(this: HTMLElement, ev: MouseEvent) {
    console.log('hovered over body')
    if (getElementsWithKeywords(elements).length > 0) {
        let content = getElementsWithKeywords(elements)
        changeElement(content).then((result) => {
            if (result.update == 'change successful') {
                audioControl()            
                this.removeEventListener('mouseover', checkNchange)               
            } 
        })
        return
    }
    this.removeEventListener('mouseover', checkNchange)            
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
            was.stopRecording()
            if (was.state() == 'inactive' && was.buff()) {               
                const reader = new FileReader()
                reader.onload = function (event: ProgressEvent<FileReader>){                    
                    testSending = event?.target?.result
                }
                const audBlob = was.buff() as Blob
                reader.readAsDataURL(audBlob)
            }
            return Promise.resolve({recorderState: was.state()})
            break;
        case 'retreive':
            return Promise.resolve({recorderState: was.state()})
            break;
        case 'review':
            console.log(`testsending has something in it -> ${(testSending)}`)            
            return Promise.resolve({recorderState: was.state(), audioBlobText: testSending})          
            break;
        case 'resume':
            // recorder.resume()
            was.resumeRecording()
            console.log(was.state())
            return Promise.resolve({recorderState: was.state()})
            break;
    } 
})