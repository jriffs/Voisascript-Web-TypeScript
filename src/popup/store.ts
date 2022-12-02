import { writable } from "svelte/store";

export const notification = writable(
    {
        show: false,
        type: '',
        message: ''
    }
);

export const screen = writable('')