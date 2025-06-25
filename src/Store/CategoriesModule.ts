import {defineStore} from "pinia";
import categoriesMockUp from "@/Data/CategoriesData.ts";
import {computed, ref} from "vue";
import {notificationModule} from "@/Store/NotificationModule.ts";

export const categoriesModule = defineStore('categoriesModule', () => {
    const notificationManagement = notificationModule()

    const categoriesData = ref({...categoriesMockUp})

    const categoriesKeys = computed(() => Object.keys(categoriesData.value))
    const categoriesDataGetter = computed(() => categoriesData.value)

    const createCategory = (categoryData) => {
        if (!categoryData) return
        const categoryId = categoriesKeys.value.length === 0
            ? 1
            : categoriesKeys.value[categoriesKeys.value.length - 1] + 1

        categoriesData.value[categoryId] = {...categoryData}
        notificationManagement.displaySuccessMessage("Category Created With Success!")
    }

    return {
        categoriesDataGetter,
        createCategory
    }
})