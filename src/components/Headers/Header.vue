<script lang="ts" setup>
import type {routeOptions} from "@/TypeScript/Interfaces/interfaces.ts";
import {useRouter} from "vue-router";

const router = useRouter()

const routeOptions: routeOptions[] = [
  { routeName: 'Expenses View', name: 'Despesas' },
  { routeName: 'DashBoard View', name: 'DashBoard' },
  { routeName: 'Investment View', name: 'Investimentos' },
  { routeName: 'Reports View', name: 'Relatórios' }
]

const redirectToView = (routeToRedirect: string):void => {
  router.push({ name: routeToRedirect })
}

</script>

<template>
  <div class="justify-content-center d-flex align-items-center header-wrapper">
    <ul class="d-flex justify-content-around w-50">
      <div
          class="position-relative"
          v-for="route in routeOptions"
          :key="route.name">
        <li
            @click="redirectToView(route.routeName)"
            class="py-2 border-success route-option text-success fs-5 m-0"
        >
          {{ route.name }}

          <div class="position-absolute li-border w-100 bg-success"></div>
        </li>
      </div>

    </ul>
  </div>
</template>

<style scoped>
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
  height: 3px;
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