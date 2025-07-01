import {defineStore} from "pinia";
import {toast} from "vue3-toastify";

export const notificationModule = defineStore('notificationModule', () => {

    const displayErrorMessage = (text: string): void => {
        toast.error(text)
    }

    const displaySuccessMessage = (text: string): void => {
        toast.success(text)
    }

    return {
        displaySuccessMessage,
        displayErrorMessage
    }
})