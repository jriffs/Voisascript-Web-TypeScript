<script lang="ts">
    import { cmc, userProjects, userFiles, userData } from "../interfaces/interfaces"
    import Browser from "webextension-polyfill"
    import { convertURIToBinary } from "../misc/file-extract";
    import { notification, screen } from "./store";
    import SignIn from "./sign-in page/sign-in.svelte";
    import Notification from "./notification/notification.svelte";
    import Dashboard from "./dashboard/dashboard.svelte";
    import FirstRecordScreen from "./record-audio/record-area-1.svelte";
    import SecondRecordScreen from "./record-audio/record-area-2.svelte";

    // let data: unknown

    async function checkIfUser() {
        const { userData } = await Browser.storage.local.get('userData')
        if (userData) {
            screen.set({current: 'dashboard', previous: ''})
            return
        }
        screen.set({current: 'sign-in', previous: ''})
    }
    checkIfUser()
</script>

<main>
    <SignIn/>
    <Dashboard/>
    <Notification/>
    <FirstRecordScreen/>
    <SecondRecordScreen/>
</main>