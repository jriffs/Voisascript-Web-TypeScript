import { notify } from "../popup/notification";
import { updateUserData } from "./update-user-data";
import { userData } from "../interfaces/interfaces"
import EventEmitter from "events";

export class HandleTask extends EventEmitter {
    private resource_ID: string | undefined
    private time_out: number = 5
    public poll_Successfull: boolean = false

    constructor(public url: string, 
        public data: FormData, 
        private userToken: string) 
        {
        super()
    }

    /**
     * start: Starts task and gets result for the requested resource ID 
     */
    public async start() {
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
    }

    private async error(message: any) {
        this.emit("error", message)
    }

    private async getResourceScheduler(): Promise<void> {
        if (!this.resource_ID) {
            this.error("System Error: couldn't get resource ID from Server")
            return
        }
        await new Promise((resolve) => setTimeout(resolve, (this.time_out * 1000)))
        const headers = {
            authorization: `Bearer ${this.userToken}`,
            originator: `extension`,
        }
        const response = await fetch(
            `http://localhost:5000/task?resource_ID=${this.resource_ID}`,
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
    }

    private async update(data: userData) {
        try {
            await updateUserData(this.userToken, data, data.username)
            this.emit("complete", data?.url)
        } catch (error) {
            console.error(error)
            await this.error(`${error}`)
        }
    }
}
