<script lang="ts">
    import { screen, updateParams } from "../store";
    import { fade } from "svelte/transition";
    import BackHeader from "../back-header.svelte";
    import ButtonSecondary from "../buttons/button-secondary.svelte";
    import ButtonPrimary from "../buttons/button-primary.svelte";
    import Browser from "webextension-polyfill";
    import { notify } from "../notification";
    import { updateUserData } from "../../misc/update-user-data";
    let BtnLoading: boolean, projectDesc: string, projectName: string 

    $: BtnDisabled = BtnLoading

    function handleCancel() {
        projectDesc = ''
        projectName = ''
        updateParams.set({
            projectID: '',
            OldprojectDesc: '',
            OldprojectName: '',
            NewprojectDesc: '',
            NewprojectName: ''
        })
        screen.set({current: 'Manage projects', previous: ''})
    }
    async function handleUpload() {
        BtnLoading = true
        if (!projectName || !projectDesc) {
            BtnLoading = false
            notify({
                message: `Some fields are missing`,
                delay: 3,
                type: 'error'
            })
            return
        }
        try {
            const {userData} = await Browser.storage.local.get('userData')
            const data = new FormData()
            data.append('New_Project_Name', projectName)
            data.append('New_Project_Desc', projectDesc)
            data.append('Project_ID', $updateParams.projectID)
            const headers = {
                "authorization": `Bearer ${userData.userToken}`,
                "originator": `extension`
            }
            const response = await fetch('http://localhost:5000/projects/update', {
                method: 'PUT',
                // mode: 'no-cors',
                headers: headers,
                body: data
            })            
            const Data = await response.json()           
            if (response.ok === true) {
                updateUserData(Data.userToken, Data, Data.username).then(async() => {
                    BtnLoading = false
                    notify({
                        type: 'success',
                        message: `Project Updated Successfully`,
                        delay: 3
                    })
                })
                return
            }
            notify({
                type: 'error',
                message: `Error - ${Data.error}`,
                delay: 3
            })
            BtnLoading = false
            return 
        } catch (error) {
            BtnLoading = false
            notify({
                message: `${error}`,
                delay: 3,
                type: 'error'
            })
            return
        }        
    }
    
    function setInputs() {
        projectName = $updateParams.OldprojectName
        projectDesc = $updateParams.OldprojectDesc
    }
    
    $: if($screen.current === 'Edit project') {
        setInputs()
    }
</script>

{#if $screen.current === 'Edit project'}
    <BackHeader/>
    <div transition:fade class="create-project">
        <div class="header-area">
            <h4>Edit Project</h4>
        </div>
        <div class="input-area">
            <input type="text" placeholder="Enter project name" bind:value="{projectName}">
            <input type="text" placeholder="Enter project description" bind:value="{projectDesc}">
        </div>
        <div class="control-area">
            <ButtonSecondary BtnText={'Cancel'} func={handleCancel} {BtnDisabled}/>
            <ButtonPrimary BtnText={'Update'} exec={handleUpload} {BtnLoading}/>
        </div>
    </div>
{/if}

<style>
    .create-project{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-width: 100%;
        min-height: 75%;
    }
    .create-project .header-area{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        min-width: 100%;
    }
    .create-project .header-area h4{
        font-family: 'Space Grotesk';
        font-size: 28px;
        font-weight: 400;
        line-height: 36px;
        letter-spacing: -0.02em;
        text-align: left;
        margin-inline-start: 30px;
    }
    .create-project .input-area{
        min-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        min-height: 150px;
        margin-block-start: -15%;
    }
    .create-project .input-area input{
        width: 400px;
        height: 60px;
        background: #f9f9f9;
        border: 1px solid #f6f6f6;
        border-radius: 6px;
        outline: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 0px;
        color: #566676;
        padding-inline-start: 12px;
    }
    .create-project .control-area{
        margin-block-end: 5%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-around;
    }
</style>