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
    projectID: string,
    projectDesc: string
}

export interface userFiles {
    id: number,
    fileName: string
}

export interface userData {
    userToken: string,
    username: string,
    isLoggedIn: Boolean,
    projects: userProjects[],
    files: [userFiles[]],
    stats: {
        projects: number,
        files: number
    }
}

export type cmc = "retreive" | "resume" | "pause" | "start" | "stop" | "review"

interface CmcResultSuccess {
    received: any;
    error?: undefined;
}

interface CmcResultError{
    error: unknown;
    received?: undefined;
}

export type CmcResult = CmcResultSuccess | CmcResultError

export type callback = (this: HTMLElement, ev: MouseEvent) => any 


