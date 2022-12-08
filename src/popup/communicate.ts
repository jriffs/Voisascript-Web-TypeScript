import { cmc } from "../interfaces/interfaces";
import Browser from "webextension-polyfill";

export async function communicateWithContent(message: cmc) {
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
        return {received}
    } catch (error) {
        return {error}
    }
}