import Browser from "webextension-polyfill";
import { uploadTasks, taskDetails } from "../interfaces/interfaces";
import { Writable } from "svelte/store";

/* export async function storeTask(taskArray: uploadTasks[]) {
    const uploadTasks = {
        taskArray 
    }
    await Browser.storage.local.set({uploadTasks})
    const data = await Browser.storage.local.get(["userData", "uploadTasks"])
    console.log(data)    
}

export async function persistTask(taskStore: Writable<taskDetails[]>) {
    let tempTaskArray: taskDetails[] 
    const {uploadTasks} = await Browser.storage.local.get(["userData", "uploadTasks"])
    taskStore.update((tda) => {
        if (tda.length == 0) {
            tda = uploadTasks.taskArray
        }
        return tda
    })        
} */

export class LTS {

    constructor(){}

    /**
     * updateLocal: updates the task local storage
     */
    public updateLocal() {
        
    }
    
}