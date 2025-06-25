import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const modalModule = defineStore('modalModule', () => {

    const modalManagementData = ref({
        modalState: false,
        modalName: null,
        modalInternData: null,
    })

    const modalStateGetter = computed(() => modalManagementData.value.modalState)
    const modalNameGetter = computed(() => modalManagementData.value.modalName)
    const modalDataGetter = computed(() => modalManagementData.value.modalInternData)

    const setModalState = (modalData: boolean): void => {
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