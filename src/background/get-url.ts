import Browser from "webextension-polyfill"

export async function getURL(url: string) {
    const {userData} = await Browser.storage.local.get('userData')
    const {userToken} = userData
    const headers = {
        authorization: `Bearer ${userToken}`,
        originator: `Extension`
    }
    const response = await fetch(`${url}`, {
        method: 'GET',
        // mode: 'no-cors',
        headers: headers
    })
    if (response.ok === false) {
        console.log(response)
        return  
    }
    const fileURL: string = await response.text()
    return fileURL
}

/* export async function getAudio(audio_url: string) {        
    let blobText: string | ArrayBuffer | null | undefined
    const reader = new FileReader()
    let url = await getURL(audio_url)    
    const Response = await fetch(`${url}`)  
    const audioBlob = await Response.blob()
    reader.readAsDataURL(audioBlob) 
    reader.onload = async function (event: ProgressEvent<FileReader>){                    
        blobText = event?.target?.result
        console.log(reader.result)         
        // return blobText      
    }
    // console.log(Response)
    return Promise.resolve()   
} */
