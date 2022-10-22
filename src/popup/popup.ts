import { cmc, userProjects, userFiles, userData } from "../interfaces/interfaces"
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

tab_buttons.forEach((tab) => {
    tab.addEventListener('click', () => {
        if (!tab.classList.contains('active')) {
            tab.classList.toggle('active')
            if (tab.nextElementSibling) {
                tab.nextElementSibling.classList.toggle('active')
            } else {
                tab?.previousElementSibling?.classList.toggle('active')
            }
            switchTabs(body)
        }
    })
})

async function checkIfUser() {
    const { userData } = await Browser.storage.local.get('userData')
    if (userData) {
        signInArea.classList.toggle('hidden')
        fileActionArea.classList.toggle('hidden')
        await UpdateUI()
    }
}

signInButton.addEventListener('click', async (e) => {
    e.preventDefault()
    const [tab] = await Browser.tabs.query({
        currentWindow: true,
        active: true
    })
    if (!tab.url) {
        alert('Internal Error: Please Restart Browser')
        return
    }
    if (tab.url.split('//')[1].includes('voisascript.com/auth/ext?Bearer=')) {
        let bearer = tab.url.split('//')[1].split('=')[1]
        const headers = {
            "authorization": `Bearer ${bearer}`,
            "originator": `extension`
        }
        const response = await fetch('http://localhost:3000/user/validate', {
            method: 'GET',
            // mode: 'no-cors',
            headers: headers
        })
        const userData = await response.json()
        if (response.ok === true) {
            console.log(userData)
            updateUserData(bearer, userData.userData).then(() => {
                alert('Sign-In Successful 👍')
                checkIfUser()
            })
            return
        }
        return
    }
    alert(`😭 Sign-In Error: please go to VoisaScript.com for instructions on how to sign-in`)
})

async function updateUserData(bearer: string, Data: userData) {
    const data = {
        userToken: bearer,
        username: Data.username,
        isLoggedIn: true,
        projects: Data.projects,
        files: Data.files,
        stats: {
            projects: Data.stats.projects,
            files: Data.stats.files
        }
    }
    await Browser.storage.local.set({ userData: data })
}

async function UpdateUI() {
    console.log('UI being updated')
    // get data from local storage.
    const { userData } = await Browser.storage.local.get('userData')

    project_count.textContent = userData.stats.projects
    files_count.textContent = userData.stats.files
    username.textContent = userData.username
    // empty projectSelect content 
    projectSelect.innerHTML = `<option value="">Choose Project</option>`
    // populate projectSelect with data
    userData.projects.forEach((project: userProjects) => {
        const option = document.createElement('option')
        option.value = `${project.projectName}~${project.projectID}`
        option.text = project.projectName
        projectSelect.appendChild(option)
    })
}

async function communicateWithContent(message: cmc) {
    try {
        const tabs = await Browser.tabs.query({
            currentWindow: true,
            active: true
        })
        const tab = tabs[0]
        const received = await Browser.tabs.sendMessage(
            tab.id ?? 0,
            { action: message }
        )
        return received
    } catch (e) {
        alert(e)
    }
}

createProjectButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (createProjectButton.textContent == 'create new project') {
        projectCreateDiv.classList.toggle('hidden')
        projectCreateDiv.querySelectorAll('input').forEach(input => {
            input.toggleAttribute('disabled')
        })
        projectSelect.toggleAttribute('disabled')
        createProjectButton.textContent = 'cancel'
    } else {
        projectCreateDiv.classList.toggle('hidden')
        projectCreateDiv.querySelectorAll('input').forEach(input => {
            input.toggleAttribute('disabled')
            input.value = ''
        })
        projectSelect.toggleAttribute('disabled')
        createProjectButton.textContent = 'create new project'
    }
})

recordAudioButton.addEventListener('click', async (e) => {
    e.preventDefault()
    const recorderState = await communicateWithContent('retreive')
    console.log(recorderState)
    if (recorderState) {
        switch (recorderState.recorderState) {
            case 'paused':
                await communicateWithContent('resume')
                recordAudioButton.childNodes[3].textContent = 'Recording...'
                for (const element of animatedBars.children) {
                    element.classList.toggle('up-down')
                }
                break;
            case 'recording':
                await communicateWithContent('pause')
                recordAudioButton.childNodes[3].textContent = 'Recording Paused'
                for (const element of animatedBars.children) {
                    element.classList.toggle('up-down')
                }
                break;
            case 'inactive':
                await communicateWithContent('start')
                stopButton.toggleAttribute('disabled')
                recordAudioButton.childNodes[3].textContent = 'Recording...'
                animatedBars.classList.toggle('hidden')
                saveButtonLogo.classList.toggle('recording')
                break;
        }
        return
    }
    alert('Microphone permission is not enabled, please refresh page and select allow')
})

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

