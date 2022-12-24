<script lang="ts">
    import { userProjects } from "../../interfaces/interfaces";
    import { screen } from "../store";

    export let project: userProjects;
    function trash() {
        
    }
    function edit() {
        screen.set({current: 'Edit project', previous: ''})
    }
</script>

<div class="project-list">
    <div class="heading-area">
        <div class="file-icon"><img src="../icons/file-icon.svg" alt=""></div>
        <h6>{project.projectName}</h6>
    </div>
    <div class="buttons">
        <button on:click={edit}><img src="../icons/edit.svg" alt="edit"></button>
        <button><img src="../icons/delete.svg" alt="delete"></button>
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