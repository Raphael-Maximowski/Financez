<script lang="ts" setup>
import type {routeOptions} from "@/TypeScript/Interfaces/interfaces.ts";
import {useRouter} from "vue-router";
import {computed, ref, watch} from "vue";
import {userConfigStore} from "@/stores/userConfig.ts";

const router = useRouter()
const userConfigManagement = userConfigStore()
const dropDownState: boolean = ref(false)
const userWidth: number = computed(() => userConfigManagement.userWidthGetter)
const routeOptions: routeOptions[] = [
  {routeName: 'Expenses View', name: 'Expenses'},
  {routeName: 'DashBoard View', name: 'DashBoard'},
  {routeName: 'Investment View', name: 'Investments'},
  {routeName: 'Reports View', name: 'Reports'}
]

const handleDropDownState = ():void => {
  dropDownState.value = !dropDownState.value
} 

const redirectToView = (routeToRedirect: string): void => {
  handleDropDownState()
  router.push({name: routeToRedirect})
}

</script>

<template>
  <div class="justify-content-center d-flex align-items-center header-wrapper">
    <div v-if="userWidth < 1024" class="position-absolute menu-icon">
      <i @click="handleDropDownState" class="bi bi-list text-success fs-3"></i>
    </div>

    <div v-if="userWidth < 1024 && dropDownState" class="z-3 text-white menu-dropdown position-absolute">
      <ul class="ul-container p-0 border-success rounded-3">
        <li
            class="my-1 route-option text-success fs-6"
            v-for="route in routeOptions"
            :key="route.name"
            @click="redirectToView(route.routeName)"
        > {{ route.name }}
        </li>
      </ul>
    </div>

    <div v-if="userWidth >= 1024" class="d-flex position-absolute left-container align-items-center text-white">
      <div class="icon-line h-100 bg-success rounded-3"></div>
      <div class="icon-line h-75 opacity-75 bg-success mx-2 rounded-3"></div>
      <div class="icon-line h-50 opacity-50 bg-success rounded-3"></div>
    </div>
    <ul v-if="userWidth >= 1024" class="d-flex justify-content-around w-50">
      <div
          class="position-relative"
          v-for="route in routeOptions"
          :key="route.name">
        <li
            @click="redirectToView(route.routeName)"
            class="py-2 border-success route-option text-success fs-6 m-0"
        >
          {{ route.name }}

          <div class="position-absolute li-border w-100 bg-success"></div>
        </li>
      </div>
    </ul>

    <div v-if="userWidth >= 1024" class="d-flex position-absolute right-container align-items-center text-white">
      <div class="icon-line h-50 opacity-50 bg-success rounded-3"></div>
      <div class="icon-line h-75 opacity-75 bg-success mx-2 rounded-3"></div>
      <div class="icon-line h-100 bg-success rounded-3"></div>
    </div>
  </div>
</template>

<style scoped>
.menu-dropdown {
  left: 30px;
  top: 50px;
}

.menu-icon {
  left: 30px;
}

.icon-line {
  width: 8px;
}

.right-container {
  right: 30px;
  height: 20px;
}

.left-container {
  left: 30px;
  height: 20px;
}

.header-wrapper {
  height: 8vh;
}

.route-option {
  list-style-type: none;
  transition: 0.5s;
  cursor: pointer;
}

.li-border {
  bottom: 0;
  height: 2px;
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s, opacity 0.5s;
}

.route-option:hover .li-border {
  opacity: 1;
  transform: scaleX(1);
}
</style>