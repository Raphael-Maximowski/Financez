<script setup lang="ts">

import {userSettingsModule} from "@/Store/UserSettingsModule.ts";
import {computed, onMounted, ref, watch} from "vue";
import {dashBoardModule} from "@/Store/DashBoardModule.ts";
import {useRouter} from "vue-router";
import { Tooltip } from 'bootstrap';
import type { dashBoardDataInterface } from "@/Typescript/Interfaces/DashBoardInterfaces";

const router: any = useRouter()
const userSettingsManagement= userSettingsModule()
const dashBoardManagement = dashBoardModule()
const userWidth = computed<number>(() => userSettingsManagement.userWidthGetter)
const containerWidth = ref<string>('calc(25% - 12px)')
const dashBoardData = computed<dashBoardDataInterface[]>(() => dashBoardManagement.dashboardDataGetter)
const tooltipRef = ref<HTMLElement[] | null>()


const redirectUser = (dashBoardParam: string): void => {
  if (dashBoardParam) {
    router.push({ name: 'Metrics View', params: { typeTransaction: dashBoardParam } })
    return
  }

  router.push({ name: 'Savings View' })
}

const initializeToolTip = (): void => {
  if (tooltipRef.value) {
    tooltipRef.value.forEach((el) => {
      new Tooltip(el)
    })
  }
}

watch(userWidth, (newValue: number): void => {
  containerWidth.value = 'calc(25% - 12px)'

  if (newValue < 600) {
    containerWidth.value = 'calc(100% - 12px)'
  } else if (newValue <= 1200) {
    containerWidth.value = 'calc(50% - 12px)'
  }
})

onMounted((): void => {
  console.log("Dashboard: ", dashBoardData.value)
  initializeToolTip()
})
</script>

<template>
  <div class="d-flex wrapper-container flex-wrap">
    <div
        v-for="(data, index) in dashBoardData"
        :key="index"
        :style="{ width: containerWidth }"
        class="px-4 py-3 position-relative rounded-1 content-container"
        @click="redirectUser(data.routerParams)"
    >
      <i :class="[ data.icon, 'icon position-absolute bi']"></i>
      <div class="d-flex align-items-center">
        <h3 class="m-0 fs-6">{{ data.name }}</h3>
        <i
            ref="tooltipRef"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Calculated based on the current month"
            class="ms-2 info-icon bi bi-info-circle-fill"></i>
      </div>
      <h4 class="my-2 fs-4 fw-bold"> U$ {{ data.value }} </h4>
      <h5 class="m-0 text-secondary"> {{ data.text }}</h5>
    </div>
  </div>
</template>

<style scoped>
.info-icon {
  font-size: 16px;
}

.text-secondary {
  font-size: 14px;
}

.wrapper-container {
  gap: 15px;
}

.icon {
  top: 15px;
  right: 15px;
}

.content-container {
  cursor: pointer;
  border: 1px solid lightgray;
  transition: 0.5s;
}

.content-container i {
  transition: 0.5s;
}

.content-container:hover .icon {
  font-size: 18px;

}
</style>