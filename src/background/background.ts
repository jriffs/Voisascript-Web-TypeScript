import Browser from "webextension-polyfill"
import { changeHeaders } from "./webRequest";

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

changeHeaders()