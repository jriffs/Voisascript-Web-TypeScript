import { notification } from "./store";

export const notify = ({type, message, delay}: {type: string, message: string, delay?: number}) => {
    notification.set({
        show: true,
        type,
        message 
    })
    if (delay) {
        setTimeout(() => {
            notification.set({
                show: false,
                type: '',
                message: '' 
            })
        }, (delay * 1000));
    }
    return
}