import Browser from "webextension-polyfill"
import { changeHeaders } from "./webRequest";
import { getURL } from "../background/get-url";

console.log(`i'm here 😁`)

Browser.contextMenus.create({
	id: 'voisascript',
	title: 'record audio comment',
	contexts: ['selection'],
})

Browser.contextMenus.onClicked.addListener((details) => {
    if (details.menuItemId != 'voisascript') {
		// this is not our menu item
		return
	}
	Browser.action.openPopup()
})

  
Browser.runtime.onMessage.addListener(async (message: any, sender: Browser.Runtime.MessageSender) => {
	const url = await getURL(message.message)
	console.log(message.message)
	return Promise.resolve({data: url})
})

changeHeaders()