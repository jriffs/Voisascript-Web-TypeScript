<script lang="ts">
    import { screen } from "../store";
    import { fade } from "svelte/transition";
    import BackHeader from "../back-header.svelte";
    import ButtonSecondary from "../buttons/button-secondary.svelte";
    import ButtonPrimary from "../buttons/button-primary.svelte";
    import Browser from "webextension-polyfill";
    import { updateUserData } from "../../misc/update-user-data";
    import { notify } from "../notification";
    import { HandleTask } from "../../misc/handleTask";
    import { userFiles, userProjects } from "../../interfaces/interfaces";
    
    let projectName: string, projectDesc: string, BtnLoading: boolean;
    $: BtnDisabled = BtnLoading;
    function handleCancel() {
        projectDesc = "";
        projectName = "";
        screen.set({ current: "Manage projects", previous: "" });
    }
    async function handleUpload() {        
        BtnLoading = true;
        notify({
            type: "info",
            message: "Creating Project...",
        })
        if (!projectName || !projectDesc) {
            BtnLoading = false;
            notify({
                type: "error",
                message: `Please fill out all input fields`,
                delay: 3,
            })
            return
        }
        const {userData} = await Browser.storage.local.get('userData')
        const projects = userData.projects as userProjects[]
        if (projects.find((p) => p.projectName == projectName) !== undefined) {
            notify({
                type: "error",
                message: "Project already exists !!!",
                delay: 3
            })
            BtnLoading = false
            return
        }
        try {
            const { userData } = await Browser.storage.local.get("userData");
            const data = new FormData();
            data.append("Project_Name", projectName);
            data.append("Project_Desc", projectDesc);
            const handleTask = new HandleTask("https://voisascript-file-storage.herokuapp.com/projects/create", data, userData.userToken)
            handleTask.on("complete", ()=> {
                BtnLoading = false;
                notify({
                    type: "success",
                    message: `Project Created Successfully`,
                    delay: 3,
                })                
            })
            handleTask.on("error", (message)=> {
                notify({
                    type: "error",
                    message: `Error - ${message}`,
                    delay: 3,
                })
                BtnLoading = false
            })
            handleTask.start()
        } catch (error) {
            notify({
                type: "error",
                message: `Error - ${error} and in`,
                delay: 3,
            });
            BtnLoading = false;
        }
    }
</script>

{#if $screen.current === "Create project"}
    <BackHeader />
    <div transition:fade class="create-project">
        <div class="header-area">
            <h4>Create Project</h4>
        </div>
        <div class="input-area">
            <input
                type="text"
                placeholder="Enter project name"
                bind:value={projectName}
            />
            <input
                type="text"
                placeholder="Enter project description"
                bind:value={projectDesc}
            />
        </div>
        <div class="control-area">
            <ButtonSecondary
                BtnText={"Cancel"}
                func={handleCancel}
                {BtnDisabled}
            />
            <ButtonPrimary
                BtnText={"Create"}
                exec={handleUpload}
                {BtnLoading}
            />
        </div>
    </div>
{/if}

<style>
    .create-project {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-width: 100%;
        min-height: 75%;
    }
    .create-project .header-area {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        min-width: 100%;
    }
    .create-project .header-area h4 {
        font-family: "Space Grotesk";
        font-size: 28px;
        font-weight: 400;
        line-height: 36px;
        letter-spacing: -0.02em;
        text-align: left;
        margin-inline-start: 30px;
    }
    .create-project .input-area {
        min-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        min-height: 150px;
        margin-block-start: -15%;
    }
    .create-project .input-area input {
        width: 400px;
        height: 60px;
        background: #f9f9f9;
        border: 1px solid #f6f6f6;
        border-radius: 6px;
        outline: none;
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 0px;
        color: #566676;
        padding-inline-start: 12px;
    }
    .create-project .control-area {
        margin-block-end: 5%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-around;
    }
</style>
