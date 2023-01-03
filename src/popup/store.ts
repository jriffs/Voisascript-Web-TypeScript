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
    CreateProject: ['dashboard', 'Manage projects', 'Create project'],
    EditProject: ['dashboard', 'Manage projects', 'Edit project'],
    Settings: ['dashboard', 'Settings'],
    files: ['']
})

export const showModal = writable(false)

export const modal = writable({
    message: '',
    onYes: async () => {},
    onNo: async () => {}
})

export const fileURL = writable('')

export const updateParams = writable({
    projectID: '',
    OldprojectName: '',
    OldprojectDesc: '',
    NewprojectName: '',
    NewprojectDesc: ''
})

export const deleteProjectParams = writable({
    deleteProjectName: '',
    deleteProjectDesc: '',
    deleteProjectID: ''
}) 