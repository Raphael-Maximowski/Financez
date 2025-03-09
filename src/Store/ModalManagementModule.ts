import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const modalManagementModule = defineStore('modalManagementModule', () => {

    const modalManagementData = ref({
        modalState: false,
        modalName: null,
        modalInternData: null,
    })

    const modalStateGetter = computed(() => modalManagementData.value.modalState)
    const modalNameGetter = computed(() => modalManagementData.value.modalName)
    const modalDataGetter = computed(() => modalManagementData.value.modalInternData)

    const setModalState =(modalData: boolean): void => {
        modalManagementData.value.modalState = modalData.state
        modalManagementData.value.modalName = modalData.name ? modalData.name : null
        modalManagementData.value.modalInternData = modalData.extraData ? modalData.extraData : null

    }

    return {
        setModalState,
        modalNameGetter,
        modalDataGetter,
        modalStateGetter
    }
})