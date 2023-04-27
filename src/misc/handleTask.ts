import { notify } from "../popup/notification";
import { updateUserData } from "./update-user-data";
import { userData } from "../interfaces/interfaces"
import EventEmitter from "events";
import { timeLog } from "console";

export class HandleTask extends EventEmitter {
    private resource_ID: string | undefined
    private time_out: number = 5
    public poll_Successfull: boolean = false
    private observer = new TaskObserver()
    public filename: string | undefined

    constructor(public url: string, 
        public data: FormData, 
        private userToken: string) {
        super()
        const file = this.data.get("audio") as File
        this.filename = file.name
    }

    /**
     * start: Starts task and gets result for the requested resource ID 
     */
    public async start() {
        await this.observer.start(()=> {
            this.emit("task-awaiting")
        })
        try {            
            const headers = {
                authorization: `Bearer ${this.userToken}`,
                originator: `extension`,
            }
            const response = await fetch(
                this.url,
                {
                    method: "POST",
                    // mode: 'no-cors',
                    headers: headers,
                    body: this.data,
                }
            )
            const response_data = await response.json()
            if (!response_data.resource_ID) return await this.error("There was an error with the request, server didn't return any refference to the resource")
            this.resource_ID = response_data.resource_ID        
            await this.getResourceScheduler() 
        } catch (error) {
            await this.error(`${error}: please check your internet connection`)
        }
    }

    private async error(message: any) {
        this.emit("error", message)
    }

    private async getResourceScheduler(): Promise<void> {
        if (!this.resource_ID) {
            this.error("System Error: couldn't get resource ID from Server")
            return
        }
        try {
            await new Promise((resolve) => setTimeout(resolve, (this.time_out * 1000)))
            const headers = {
                authorization: `Bearer ${this.userToken}`,
                originator: `extension`,
            }
            const response = await fetch(
                `https://voisascript-file-storage.herokuapp.com/task?resource_ID=${this.resource_ID}`,
                {
                    method: "GET",
                    // mode: 'no-cors',
                    headers: headers
                }
            )
            const data = await response.json()
            if (data?.error) {
                await this.error(data?.error)
                return
            }
            if (data?.update) {
                await this.getResourceScheduler()
                return
            }
            const Data = data as userData        
            await this.update(Data)
            this.poll_Successfull = true 
        } catch (error) {
            console.log(error)
            this.error(error)
        }
        
    }

    private async update(data: userData) {
        try {
            await updateUserData(this.userToken, data, data.username)
            this.observer.stop()
            this.emit("complete", data?.url)
        } catch (error) {
            console.error(error)
            await this.error(`${error}`)
        }
    }
}

class TaskObserver {
    private inProgress: boolean = false
    constructor () {}

    /**
     * start: starts the task observer
     */
    public async start(callbck: Function) {
        this.inProgress = true
        await new Promise((resolve)=> setTimeout(resolve, 10000))
        if (this.inProgress === true) {
            callbck()
        }        
    }

    /**
     * stop: stops the task observer
     */
    public stop() {
        this.inProgress = false
    }
}
