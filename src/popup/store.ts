import { writable } from "svelte/store";

export const notification = writable(
    {
        show: false,
        type: '',
        message: ''
    }
)

export const screen = writable({
    current: '',
    previous: ''
})
let Recorderstate: string = '', project: string = '', fileName: string = '', file: Blob | null | undefined
export const recordParams = writable(
    {
        Recorderstate,
        project,
        fileName,
        file
    }
)

export const history = writable({
    record: ['dashboard', 'Record audio', 'Record audio 2', 'Record audio 3'],
    projects: ['dashboard', 'Manage projects'],
    files: ['']
})

export const showBackDrop = writable(false)

let show: boolean, message: string, value: unknown
export const modal = writable({
    show: false,
    message: '',
    value: ''
})