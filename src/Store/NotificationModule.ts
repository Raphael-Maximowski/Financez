import {defineStore} from "pinia";
import {toast} from "vue3-toastify";

export const notificationModule = defineStore('notificationModule', () => {

    const displayErrorMessage = (text) => {
        toast.error(text)
    }

    const displaySuccessMessage = (text) => {
        toast.success(text)
    }

    return {
        displaySuccessMessage,
        displayErrorMessage
    }
})