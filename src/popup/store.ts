import { taskDetails, userProjects } from "../interfaces/interfaces";
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
    files: ['dashboard', 'Manage projects', 'Manage files'],
    task: ['dashboard', 'Task-Monitor']
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

export const fileListToExpand = writable('')

export const reviewedProjectIndex = writable({
    index: undefined ?? 0,
    projectName: '',
    projectDesc: '',
    projectID: ''
})

export const Task_Monitor = writable<taskDetails[]>([])