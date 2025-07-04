import {defineStore} from "pinia";
import categoriesMockUp from "@/Data/CategoriesData.ts";
import {computed, ref} from "vue";
import {notificationModule} from "@/Store/NotificationModule.ts";
import type { CategoriesInterface, CategoryDataInterface } from "@/Typescript/Interfaces/TransactionsInterface";

export const categoriesModule = defineStore('categoriesModule', () => {
    const notificationManagement = notificationModule()

    const categoriesData = ref<CategoriesInterface>({...categoriesMockUp})

    const categoriesKeys = computed<string[]>(() => Object.keys(categoriesData.value))
    const categoriesDataGetter = computed<CategoriesInterface>(() => categoriesData.value)

    const createCategory = (categoryData: CategoryDataInterface): void => {
        if (!categoryData) return
        const categoryId = categoriesKeys.value.length === 0
            ? 1
            : categoriesKeys.value[categoriesKeys.value.length - 1] + 1

        categoriesData.value[`${categoryId}`] = {...categoryData}
        notificationManagement.displaySuccessMessage("Category Created With Success!")
    }

    return {
        categoriesData,
        categoriesKeys,
        categoriesDataGetter,
        createCategory
    }
}, { persist: true })