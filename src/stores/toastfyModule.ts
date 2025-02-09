import {defineStore} from "pinia";
import { toast } from "vue3-toastify";

export const toastfyModule = defineStore('toastfyModule', () => {

    const succesToastMessage = (textPayload) => {
        toast.success(textPayload)
    }

    const errorToastMessage = (textPayload) => {
        toast.error(textPayload)
    }

    const infoToastMessage = (textPayload) => {
        toast.info(textPayload)
    }

    return {
        succesToastMessage,
        errorToastMessage,
        infoToastMessage
    }

})