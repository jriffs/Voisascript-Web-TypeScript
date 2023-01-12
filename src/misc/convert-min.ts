export function convertMin(time: number) {
    time = Math.round(time)

    if (time >= 60) {
        let min = Math.round(time/60)
        let sec
        let rem = time - 60
        if (rem < 10) {
            sec = Number(time - 60).toFixed()
            return `${min}:0${sec}`
        } else {
            sec = Math.round(time - 60)
            return `${min}:${sec}`
        }
            
    }else if(time == 0) {
        return `${0}:${0}`
    } else{
        let min = 0
        let rem = Math.round(time)
        let sec
        if (rem < 10) {
            sec = Number(time).toFixed()
            return `${min}:0${sec}`
        } else {
            sec = Math.round(time)
            return `${min}:${sec}`
        }  
    }
            
}