/* import { cmc, userProjects, userFiles, userData } from "../interfaces/interfaces"
import Browser from "webextension-polyfill"
import { switchTabs } from "./tabSelect"
import { convertURIToBinary } from "../misc/file-extract";

const body = document.body
const fileActionArea = document.querySelector('.file-action')!
const createProjectButton = document.querySelector('#create-project')!
const projectCreateDiv = document.querySelector('#project-create')!
const projectSelect = document.querySelector('#choose-project')!
const recordAudioButton = document.querySelector('#audio-mic')!
const stopButton = document.querySelector('#save-button')!
const animatedBars = document.querySelector('.animated-bars')!
const saveButtonLogo = document.querySelector('.button-logo')!
const audioFileHolder = document.querySelector('#audio-file-holder') as HTMLInputElement
const uploadButton = document.querySelector('#upload-btn')!
const copyButton = document.querySelector('#copy-button')!
const linkHolder = document.querySelector('#copy-input') as HTMLInputElement
const saveFileArea = document.querySelector('.file-holder')!
const fileNameHolder = document.querySelector('#choose-file-btn>p')!
const signInArea = document.querySelector('#sign-in-area')!
const signInButton = document.querySelector('#sign-in')!
let project_count = document.querySelector('#projects')!,
    files_count = document.querySelector('#files')!,
    username = document.querySelector('#username')!
const tab_buttons = document.querySelectorAll('.tab')
const fileNameInput = document.querySelector('#audiofile-name') as HTMLInputElement
let _audio: Blob
// cleardata()
checkIfUser()

stopButton.addEventListener('click', async (e) => {
    e.preventDefault()
    const recorderState = await communicateWithContent('retreive')
    console.log(recorderState.recorderState)
    if (recorderState.recorderState != 'inactive') {
        let newRecorderState = await communicateWithContent('stop')
        if (newRecorderState.recorderState == 'inactive') {
            const { audioBlobText } = await communicateWithContent('retreive')
            if (audioBlobText) {
                console.log(audioBlobText)
                let binary = convertURIToBinary(audioBlobText)
                let audioBlob = new Blob([binary], {type: 'audio/webm'})
                // console.log(audioBlob)
                _audio = audioBlob
                for (const element of animatedBars.children) {
                    element.classList.toggle('up-down')
                }
                animatedBars.classList.toggle('hidden')
                saveButtonLogo.classList.toggle('recording')
                recordAudioButton.childNodes[3].textContent = 'Record Audio'
                recordAudioButton.toggleAttribute('disabled')
                if (saveFileArea.classList.contains('hidden')) {
                    saveFileArea.classList.toggle('hidden')
                }
                stopButton.toggleAttribute('disabled')
                return
            }
            alert('no audioBlobText')
            return            
        }
        alert('error stoping recorder')
    }
})

fileNameInput.addEventListener('keyup', () => {
    if (fileNameInput.value && fileNameInput.value.split('').length >= 8) {
        if (uploadButton.classList.contains('hidden')) {
            uploadButton.classList.toggle('hidden')
            return
        }
        return
    }
    if (!uploadButton.classList.contains('hidden')) {
        uploadButton.classList.toggle('hidden')
        return
    }
})

uploadButton.addEventListener('click', async (e) => {
    e.preventDefault()
    let form = document.querySelector('form') as HTMLFormElement
    let data = new FormData(form)
    data.append('audio', _audio, fileNameInput.value)
    const { userData } = await Browser.storage.local.get('userData')
    const { userToken } = userData
    if (validate()) {
        const headers = {
            authorization: `Bearer ${userToken}`,
            originator: `Extension`
        }
        const response = await fetch('http://localhost:5000/files/upload', {
            method: 'POST',
            // mode: 'no-cors',
            headers: headers,
            body: data
        })
        const ResponseData = await response.json()
        if (response.ok === true) {
            linkHolder.value = ResponseData.url
            updateUserData(userToken, ResponseData).then(() => {
                UpdateUI()
            })
            alert('Upload Successful... copy generated link and paste anywhere in your code')
            audioFileHolder.value = ''
            fileNameHolder.textContent = ''
            recordAudioButton.toggleAttribute('disabled')
            uploadButton.classList.toggle('hidden')
            saveFileArea.classList.toggle('hidden')
            return
        }
        alert(`Server Response:${response.status} -- ${JSON.stringify(ResponseData)}`)
        return
    }
    alert('Please choose an existing project or Create a new one')
})

copyButton.addEventListener('click', (e) => {
    e.preventDefault()
    linkHolder.select()
    navigator.clipboard.writeText(linkHolder.value)
    alert('Link Copied to clipboard 👍👍👌')
})

function checkIfAudio(file_name: string) {
    let filename_Extension: string = file_name.split('.')[1]
    let acceptedExtensions: string[] = ['mp3', 'wav', 'webm']
    if (acceptedExtensions.includes(filename_Extension)) {
        return true
    }
    return false
}

function validate() {
    let project = document?.querySelector('select[name=project]') as HTMLSelectElement
    let newProjectName = document.querySelector('input[name=newProjectName]') as HTMLInputElement
    let newProjectDesc = document.querySelector('input[name=newProjectDesc]') as HTMLInputElement
    let project_val = project.value
    let newProjectName_val = newProjectName.value
    let newProjectDesc_val = newProjectDesc.value
    let validate = false
    if (project_val == '') {
        if (newProjectName_val !== '' && newProjectDesc_val !== '') {
            return validate = true
        }
        return validate
    }
    if (newProjectName_val == '' && newProjectDesc_val == '') {
        if (project_val !== '') {
            return validate = true
        }
        return validate
    }
    return validate
}

async function cleardata() {
    await Browser.storage.local.clear()
}

 */

import App from "./App.svelte";
// import Browser from "webextension-polyfill"

const app: App = new App({
    target: document.body
})

export default app

// async function clearData() {
//     await Browser.storage.local.remove('userData')
// }

// clearData()
