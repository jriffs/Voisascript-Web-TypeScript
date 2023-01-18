/// <reference types="chrome"/>

import Browser from "webextension-polyfill"
import { changeHeaders } from "./webRequest";
import { getURL} from "../background/get-url";

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
	const data = await getURL(message.message)	
	// const data = await getAudio(message.message)
	console.log(data)		
	return Promise.resolve({data: data})
})

if (!chrome) {
	changeHeaders()
}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
	console.log(info)	
})