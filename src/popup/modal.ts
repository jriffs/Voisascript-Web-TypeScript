import Browser from "webextension-polyfill";
import { modal, showModal } from "./store";

export async function Modal({message, onYes, onNo}: {message: string, onYes: () => Promise<void>, onNo: () => Promise<void>}) {
    showModal.set(true)
    modal.set({
        message,
        onYes,
        onNo
    })
}
