import type { ModalStateInterface } from "@/Typescript/Interfaces/ModalInterfaces";
import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const modalModule = defineStore('modalModule', () => {

    const modalManagementData = ref<ModalStateInterface>({
        modalState: false,
        modalName: null,
        modalInternData: null,
    })

    const modalStateGetter = computed<Boolean>(() => modalManagementData.value.modalState)
    const modalNameGetter = computed<string | null>(() => modalManagementData.value.modalName)
    const modalDataGetter = computed<any>(() => modalManagementData.value.modalInternData)

    const setModalState = (modalData: any = null): void => {
        modalManagementData.value.modalState = !!modalData
        modalManagementData.value.modalName = modalData?.name || null
        modalManagementData.value.modalInternData = modalData?.extraData || null
    }

    return {
        setModalState,
        modalNameGetter,
        modalDataGetter,
        modalStateGetter
    }
})