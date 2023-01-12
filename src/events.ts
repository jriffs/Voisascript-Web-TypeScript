import { EventEmitter } from "events";

export const Events = new EventEmitter()

Events.on('fileReader-load-sucess', (target: Function) => {
    if (typeof target !== 'function') {
        throw new Error('target parameter must be a function')
    }
    target()
})

Events.on('testing', () => {
    console.log('event working')    
})


// Events.emit('upload-event', somn, 'this is it')