import Browser from "webextension-polyfill";
import { userData } from "../interfaces/interfaces";

export async function updateUserData(bearer: string, Data: userData, username: string) {
    const data = {
        userToken: bearer,
        username,
        isLoggedIn: true,
        projects: Data.projects,
        files: Data.files,
        stats: {
            projects: Data.stats.projects,
            files: Data.stats.files
        }
    }
    await Browser.storage.local.set({ userData: data })
}