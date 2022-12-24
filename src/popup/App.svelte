<script lang="ts">
    import { cmc, userProjects, userFiles, userData } from "../interfaces/interfaces"
    import Browser from "webextension-polyfill"
    import { convertURIToBinary } from "../misc/file-extract";
    import { notification, screen, showBackDrop } from "./store";
    import SignIn from "./sign-in page/sign-in.svelte";
    import Notification from "./notification/notification.svelte";
    import Dashboard from "./dashboard/dashboard.svelte";
    import FirstRecordScreen from "./record-audio/record-area-1.svelte";
    import SecondRecordScreen from "./record-audio/record-area-2.svelte";
    import ThirdRecordScreen from "./record-audio/record-area-3.svelte";
    import Backdrop from "./backdrop/backdrop.svelte";
    import Modal from "./backdrop/modal.svelte";
    import ManageProjects from "./projects/manage-projects.svelte";
    import CreateProject from "./projects/create-project.svelte";
    import EditProject from "./projects/edit-project.svelte";
    import Settings from "./settings/settings.svelte";
    // import Loading from "./backdrop/loading.svelte";

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
    // screen.set({current: 'Manage projects', previous: ''})
</script>

<main>
    <SignIn/>
    <Dashboard/>
    <Notification/>
    <FirstRecordScreen/>
    <SecondRecordScreen/>
    <ThirdRecordScreen/>
    <ManageProjects/>
    <CreateProject/>
    <EditProject/>
    <Settings/>

    <Backdrop/>
    <Modal/>
</main>