import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {userSettings} from "@/Interfaces/UserSettings.ts";

export const userSettingsModule = defineStore('userSettingsModule', () => {
    const userSettingsData = ref<userSettings>({
        userWidth: window.innerWidth
    })

    const userWidthGetter = computed(() => userSettingsData.value.userWidth)

    const setUserWidth = (userWidth: number): void => {
        if (userWidth) userSettingsData.value.userWidth = userWidth
    }

    return {
        userWidthGetter,
        setUserWidth
    }
})