import { type } from "os"

export interface ElementValues {
    element: Element
    ID: string
    text: string 
}

export interface OnMessageRequestValue{
    action: string
}

export interface userProjects {
    projectName: string,
    projectDesc: string
}

export interface userData {
    userToken: string,
    username: string,
    isLoggedIn: Boolean,
    projects: userProjects[],
    stats: {
        projects: number,
        files: number
    }
}

export type cmc = "retreive" | "resume" | "pause" | "start" | "stop" | "review"


