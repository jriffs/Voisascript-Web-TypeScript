<script lang="ts">
    import { updateUserData } from "../../misc/update-user-data";
    import Browser from "webextension-polyfill";
    import { userProjects } from "../../interfaces/interfaces";
    import { Modal } from "../modal";
    import { screen, updateParams, reviewedProjectIndex} from "../store";
    import { notify } from "../notification";

    export let project: userProjects;
    
    async function trash() {        
        Modal({
            message: 'Are you sure you want to delete?',
            onNo: async () => {},
            onYes: deleteProject
        })        
    }

    async function deleteProject() {
        notify({
            type: 'info',
            message: 'Deleting Project...'
        })
        const {userData} = await Browser.storage.local.get('userData')
        const data = new FormData()
        data.append('Project_ID', project.projectID)
        const headers = {
            "authorization": `Bearer ${userData.userToken}`,
            "originator": `extension`
        }
        const response = await fetch('http://localhost:5000/projects/delete', {
            method: 'DELETE',
            // mode: 'no-cors',
            headers: headers,
            body: data
        })
        const Data = await response.json()
        if (response.ok === true) {
            updateUserData(Data.userToken, Data, Data.username).then(async() => {
                notify({
                    type: 'success',
                    message: `Project Deleted Successfully`,
                    delay: 3
                })
                screen.set({current: 'Manage projects', previous: ''})
            })
            return
        }
        notify({
            type: 'error',
            message: `Error - ${Data.error}`,
            delay: 3
        })
        return
    }

    function edit() {        
        updateParams.set({
            projectID: project.projectID,
            OldprojectName: project.projectName,
            OldprojectDesc: project.projectDesc,
            NewprojectName: '',
            NewprojectDesc: ''
        })
        screen.set({current: 'Edit project', previous: ''})
    }

    async function HandleProjectClick() {
        screen.set({current: 'Manage files', previous: ''})
        const {userData} = await Browser.storage.local.get('userData')
        const {projects} = userData
        if (Array.isArray(projects)) {
            let index =  projects.findIndex((proj) => project.projectID == proj?.projectID)
            reviewedProjectIndex.set({
                index,
                projectName: project.projectName,
                projectDesc: project.projectDesc,
                projectID: project.projectID
            })            
        }        
    }
</script>

<div class="project-list" on:dblclick={HandleProjectClick}>
    <div class="heading-area">
        <div class="file-icon"><img src="../icons/file-icon.svg" alt=""></div>
        <h6>{project.projectName}</h6>
    </div>
    <div class="buttons">
        <button on:click={edit}><img src="../icons/edit.svg" alt="edit"></button>
        <button on:click={trash}><img src="../icons/delete.svg" alt="delete"></button>
    </div>
</div>

<style>
    .project-list{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-height: fit-content;
        padding-block: 5px;
        padding-inline: 10px;
        height: 55px;
        width: 90%;
        left: 32px;
        border-radius: 6px;
        background: #f9f9f9;
        border: 1px solid #f6f6f6;
        margin-block: 8px;
        cursor: pointer;
    }
    .project-list:hover{
        box-shadow:
        0.5px 0.4px 0.6px rgba(0, 0, 0, 0.017),
        1.4px 1.1px 1.8px rgba(0, 0, 0, 0.025),
        3.3px 2.7px 4.2px rgba(0, 0, 0, 0.033),
        11px 9px 14px rgba(0, 0, 0, 0.05)
        ;
    }
    .project-list .heading-area{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        min-width: 80%;
        /* margin-inline-start: -100px; */
    }
    .project-list .heading-area .file-icon{
        background: #d3e7fd;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-inline-end: 10px;
    }
    .project-list .heading-area .file-icon img{
        width: 20px;
        height: 20px;
    }
    .project-list .heading-area h6{
        font-family: Space Grotesk;
        font-size: 15px;
        font-weight: 400;
        line-height: 28px;
        letter-spacing: -0.02em;
        text-align: left;
        max-width: 55%;
        overflow: hidden;
    }
    .project-list .buttons{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 10%;
        /* margin-inline-end: -90px; */
    }
    .project-list .buttons button{
        background: #f6f6f6;
        border: 1px solid #f5f5f5;
        outline: none;
        width: 40px;
        height: 38px;
        border-radius: 8px;
        margin-inline: 5px;
    }
    .project-list .buttons button:hover {
        background: #f3eeee;
    }
</style>