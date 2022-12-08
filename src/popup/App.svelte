<script lang="ts">
    import { cmc, userProjects, userFiles, userData } from "../interfaces/interfaces"
    import Browser from "webextension-polyfill"
    import { convertURIToBinary } from "../misc/file-extract";
    import { notification, screen } from "./store";
    import SignIn from "./sign-in page/sign-in.svelte";
    import Notification from "./notification/notification.svelte";
    import Dashboard from "./dashboard/dashboard.svelte";
    import FirstRecordScreen from "./record-audio/record-area-1.svelte";

    // let data: unknown

    async function checkIfUser() {
        const { userData } = await Browser.storage.local.get('userData')
        if (userData) {
            screen.set('dashboard')
            return
        }
        screen.set('sign-in')
    }
    checkIfUser()

    /* function handleSignIn(e: any) {
        let {success, error, data} = e.detail
        if (success === true) {
            notification.set({
                show: true,
                type: 'success',
                message: 'Signed In Successfully'
            })
            screen.set('dashboard')
        }
        if (error) {
            notification.set({
                show: true,
                type: 'error',
                message: `${error}`
            })
        }
    } */
</script>

<main>
    <SignIn/>
    <Dashboard/>
    <Notification/>
    <FirstRecordScreen/>
</main>