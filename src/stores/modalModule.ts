import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {modalDataInterface} from "@/typescript/Modals/interfaces&types.ts";

export const modalModule = defineStore('modalModule', () => {

    const modalData = ref<modalDataInterface>({
        modalState: false,
        modalName: null,
        modalExtendedData: null
    })

    const modalDataGetter = computed(() => modalData.value);

    const handleModalState = (modalPayload: any): void => {
        if (!modalPayload) return clearModalVariables()

        modalData.value.modalState = true;
        modalData.value.modalName = modalPayload.modalName || null;
        modalData.value.modalExtendedData = modalPayload.modalExtendedData || null;
    }

    const clearModalVariables = (): void=> {
        modalData.value.modalState = false
        modalData.value.modalName = null
        modalData.value.modalExtendedData = null
    }

    return {
        modalData,
        modalDataGetter,
        handleModalState
    }
})