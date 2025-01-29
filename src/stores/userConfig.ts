import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import type {userConfigStore} from "@/TypeScript/Interfaces/interfaces.ts";

export const userConfigStore = defineStore('userConfig', () => {

    const userConfigData: userConfigStore = reactive({
        userWidth: window.innerWidth
    })

    const userWidthGetter: number = computed(() => userConfigData.userWidth)

    const setUserConfigWidth = (userWidthViewIncome: number):void => {
        userConfigData.userWidth = userWidthViewIncome
    }


    return {
        userConfigData,
        userWidthGetter,
        setUserConfigWidth
    }
})
