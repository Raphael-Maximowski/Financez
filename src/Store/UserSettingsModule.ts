import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {userSettings} from "@/Typescript/Interfaces/UserSettingInterfaces";

export const userSettingsModule = defineStore('userSettingsModule', () => {
    const userSettingsData = ref<userSettings>({
        userWidth: window.innerWidth
    })

    const userWidthGetter = computed<number>(() => userSettingsData.value.userWidth)

    const setUserWidth = (userWidth: number): void => {
        if (userWidth) userSettingsData.value.userWidth = userWidth
    }

    return {
        userWidthGetter,
        setUserWidth,
        userSettingsData
    }
}, { persist: true })