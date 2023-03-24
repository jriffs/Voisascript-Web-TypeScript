export default class RecordObserver {
    private interval: NodeJS.Timer | undefined
    private inProgress: boolean | undefined
    private startTime: number | undefined
    private timer: number | undefined 
    constructor(){}

    /**
     * startRObserver: to start the record observer process
     * takes a "callbck" parameter which is a function that runs when the observer has reached its limit
     */
    public startRObserver(callbck: Function) {
        this.inProgress = true
        this.startTime = Date.now()
        this.timer = this.startTime
        this.interval = setInterval(()=> {
            if (this.inProgress && (this.timer! - this.startTime!) >= 60000) {
                callbck()
                this.stopRObserver()
                clearInterval(this.interval)
            }
            if (this.inProgress) {
                this.timer = Date.now()
            }
            
        }, 5000)
    }

    /**
     * stopRObserver: stops the record observer when recording is stopped
     */
    public stopRObserver() {
        this.inProgress = undefined
        this.startTime = undefined
        if (this.interval) {
            clearInterval(this.interval)
        }
        this.interval = undefined
        this.timer = undefined
    }

    /**
     * pause: pauses the observer
     */
    public pauseRObserver() {
        this.inProgress = false
    }

    /**
     * resumeRObserver: resumes the record observer after it has been paused
     */
    public resumeRObserver() {
        this.inProgress = true
    }
}