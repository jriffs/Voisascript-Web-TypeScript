import { cmc } from "src/interfaces/interfaces"
import Browser from "webextension-polyfill"
import { switchTabs } from "./tabSelect";

interface userProjects {
    projectName: string,
    projectDesc: string
}

interface userData {
    userToken: string,
    username: string,
    isLoggedIn: Boolean,
    projects: userProjects[],
    stats: {
        projects: number,
        files: number
    }
}

const body = document.body
const http = new XMLHttpRequest()
const fileActionArea = document.querySelector('.file-action')!
const createProjectButton = document.querySelector('#create-project')!
const projectCreateDiv = document.querySelector('#project-create')!
const projectSelect = document.querySelector('#choose-project')!
const recordAudioButton = document.querySelector('#audio-mic')!
const saveButton = document.querySelector('#save-button')!
const animatedBars = document.querySelector('.animated-bars')!
const saveButtonLogo = document.querySelector('.button-logo')!
const audioFileHolder = document.querySelector('#audio-file-holder') as HTMLInputElement
const chooseFileButton = document.querySelector('#choose-file-btn')!
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
    const {userData} = await Browser.storage.local.get('userData')
    if (userData) {
        signInArea.classList.toggle('hidden')
        fileActionArea.classList.toggle('hidden')
        await UpdateUI()
    }
}

signInButton.addEventListener('click', async(e) => {
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
        http.open('GET', 'http://localhost:5000/auth/ext', true)
        http.setRequestHeader('Authorization', `Bearer ${bearer}`)
        http.onreadystatechange = async () => {
            if (http.readyState == 4 && http.status == 200) {
                let userData = JSON.parse(http.response)
                updateUserData(bearer, userData).then(() => {
                    alert('Sign-In Successful 👍')
                    checkIfUser()
                })
                return 
            }
        }
        http.send()
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
        stats: {
            projects: Data.stats.projects,
            files: Data.stats.files
        }
    }
    await Browser.storage.local.set({userData: data})
}

async function UpdateUI() {
    console.log('UI being updated')
    // get data from local storage.
    const {userData} = await Browser.storage.local.get('userData')

    project_count.textContent = userData.stats.projects
    files_count.textContent = userData.stats.files
    username.textContent = userData.username
    // empty projectSelect content 
    projectSelect.innerHTML = `<option value="">Choose Project</option>`
    // populate projectSelect with data
    userData.projects.forEach((project: userProjects) => {
        const option = document.createElement('option')
        option.value = project.projectName
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
            {action: message}
        )
        return received.recorderState
    } catch (e) {
        alert(e)
    }
    
}

createProjectButton.addEventListener('click', (e)=>{
    e.preventDefault()
    
    if (createProjectButton.textContent == 'create new project') {
        projectCreateDiv.classList.toggle('hidden')
        projectCreateDiv.querySelectorAll('input').forEach(input =>{
            input.toggleAttribute('disabled')
        })
        projectSelect.toggleAttribute('disabled')
        createProjectButton.textContent = 'cancel'
    }else {
        projectCreateDiv.classList.toggle('hidden')
        projectCreateDiv.querySelectorAll('input').forEach(input =>{
            input.toggleAttribute('disabled')
            input.value = ''
        })
        projectSelect.toggleAttribute('disabled')
        createProjectButton.textContent = 'create new project'
    }
})

recordAudioButton.addEventListener('click', async (e)=>{
    e.preventDefault()
    const recorderState = await communicateWithContent('retreive')
    if (recorderState) {
        switch (recorderState) {
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
                saveButton.toggleAttribute('disabled')
                recordAudioButton.childNodes[3].textContent = 'Recording...'
                animatedBars.classList.toggle('hidden')
                saveButtonLogo.classList.toggle('recording')
                break;
        }
        return 
    }
    alert('Microphone permission is not enabled, please refresh page and select allow')
})

saveButton.addEventListener('click', async (e) =>{
    e.preventDefault()
    const recorderState = await communicateWithContent('retreive')
    if (recorderState != 'inactive') {
        let newRecorderState = await communicateWithContent('stop')
        if (newRecorderState == 'inactive') {
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
            saveButton.toggleAttribute('disabled')
        }
         
    }
})

chooseFileButton.addEventListener('click', (e) => {
    e.preventDefault()
    audioFileHolder.click()
})

audioFileHolder.addEventListener('input', () => {
    let file_name = audioFileHolder.value.split('\\')[2]
    if (checkIfAudio(file_name)) {
        fileNameHolder.textContent = file_name
        uploadButton.classList.toggle('hidden')
        return
    }
    alert('Please select the audio file you just recorded & downloaded')
    if (!uploadButton.classList.contains('hidden')) {
        uploadButton.classList.toggle('hidden')
    }
    fileNameHolder.textContent = ''
})

uploadButton.addEventListener('click', async (e) => {
    e.preventDefault()
    let form = document.querySelector('form') as HTMLFormElement
    let data = new FormData(form)
    const {userData} = await Browser.storage.local.get('userData')
    const {userToken} = userData
    if (validate()) {
        http.open('POST', 'http://localhost:5000/files/upload', true)
        http.setRequestHeader('authorization', `Bearer ${userToken}`)
        http.onreadystatechange = async () => {
            if (http.readyState == 4 && http.status == 200) {
                let data = JSON.parse(http.response)
                linkHolder.value = data.url
                updateUserData(userToken, data).then(() => {
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
        }
        http.send(data)
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
    let acceptedExtensions: string[] = ['mp3', 'wav']
    if (acceptedExtensions.includes(filename_Extension)) {
        return true
    }
    return false
}

function validate() {
    let project = document?.querySelector('select[name=project]') as HTMLSelectElement
    let newProjectName = document.querySelector('input[name=new-project-name]') as HTMLInputElement
    let newProjectDesc = document.querySelector('input[name=new-project-desc]') as HTMLInputElement
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

