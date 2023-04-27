<script lang="ts">
    import { Task_Monitor, screen } from "../store";
    import { fade } from "svelte/transition";
    import BackHeader from "../back-header.svelte";
    import { persistTask, storeTask } from "../../misc/persist-task";

    // persistTask(Task_Monitor)
    const somn = [{
        name: "name",
        state: "state",
        id: "id",
        RID: "RID"
    }] 
    // storeTask(somn)
</script>

{#if $screen.current === 'Task-Monitor'}
    <BackHeader/>
    <div transition:fade class="main-task-monitor-content">
        <div class="title">
           <h3>Task Monitor</h3> 
        </div>
        <div class="task-heading-area">
            <div class="text">
                <h3>Task-name</h3>
                <h3>ID</h3>
                <h3>Status</h3>
            </div>
            <div class="underline"></div>
        </div>
        <div class="task-area">
            {#each $Task_Monitor as task}
                <div class="task">
                    <h5>{task.name}</h5>
                    <h5>{task.id}</h5>
                    <span class="task-state-{task.state}">{task.state}</span>
                </div> 
            {/each}
        </div>
    </div>
{/if}

<style>
    .main-task-monitor-content{
        min-height: 500;
        min-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .title{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-width: 100%;
        min-height: 100;
    }
    .title h3{
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #021931;
    }
    .task-heading-area{
        min-width: 80%;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .task-heading-area .text{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .task-heading-area .text h3{
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        letter-spacing: -0.02em;
        color: #000000;
    }
    .task-heading-area .underline{
        height: 3px;
        width: 100%;
        background: #000000;
    }
    .task-area{
        max-height: 250px;
        min-width: 80%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .task-area .task{
        display: flex;
        flex-direction: row;
        min-width: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .task-area .task h5{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #000000;
    }
    .task-area .task span{
        padding: 5px;
        border-radius: 5px;
        align-items: center;
        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        color: #000000;
    }
    .task-state-success{
        background: #0af515;
    }
    .task-state-failed{
        background: #f5250a;
    }
    .task-state-pending{
        background: #def50a;
    }
</style>