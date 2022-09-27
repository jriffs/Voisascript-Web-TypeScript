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
