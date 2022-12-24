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
