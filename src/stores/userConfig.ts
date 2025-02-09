import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import type {userConfigStore} from "@/TypeScript/Interfaces/interfaces.ts";

export const userConfigModule = defineStore('userConfig', () => {

    const userConfigData: userConfigStore = ref({
        userWidth: window.innerWidth
    })

    const userWidthGetter: number = computed(() => userConfigData.value.userWidth)

    const setUserConfigWidth = (userWidthViewIncome: number):void => {
        userConfigData.value.userWidth = userWidthViewIncome
    }


    return {
        userConfigData,
        userWidthGetter,
        setUserConfigWidth
    }
})
