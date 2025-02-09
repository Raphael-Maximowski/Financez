<script lang="ts" setup>
import Header from "@/components/Header.vue";
import TransactionModal from "@/components/Modals/TransactionModal.vue";
import {useRoute} from "vue-router";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {userDataModule} from "@/stores/userDataModule.ts";
import {userConfigModule} from "@/stores/userConfig.ts";
const userDataManagement = userDataModule()
const userConfigManagement = userConfigModule()
const route = useRoute()

const handleTableParamsBasedInRoute = (newRoute) => {
  const routeFilters = ref({
    tableTitle: 'Pendent Transactions',
    typeTransaction: ['expense'],
    state: 'pendent'
  })

  switch (newRoute.name) {
    case 'DashBoard View':
      routeFilters.value.typeTransaction = ['expense']
      routeFilters.value.state = ['pendent']
      routeFilters.value.tableTitle = 'Pendent Transactions'

      break;
    case 'Expenses Management View':
      routeFilters.value.typeTransaction = ['expense']
      routeFilters.value.state = ['paid', 'pendent']
      routeFilters.value.tableTitle = 'Expenses'
      break;
    case 'Incomes Management View':
      routeFilters.value.typeTransaction = ['income']
      routeFilters.value.state = ['paid', 'pendent']
      routeFilters.value.tableTitle = 'Incomes'
      break;
    case 'Total Balance Management View':
      routeFilters.value.typeTransaction = ['expense', 'income']
      routeFilters.value.state = ['paid', 'pendent']
      routeFilters.value.tableTitle = 'Expenses and Incomes'
      break;
  }

  userDataManagement.setTableFilters(routeFilters.value)
}

const handleUserWidth = () => {
  userConfigManagement.setUserConfigWidth(window.innerWidth)
}

watch(route, (newValue) => {
  handleTableParamsBasedInRoute(newValue)
})

onMounted(() => {
  handleTableParamsBasedInRoute(route)
  window.addEventListener('resize', handleUserWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleUserWidth)
})

</script>

<template>
  <div class="vw-100 px-4 vh-100 overflow-y-auto wrapper-container">
    <Header />
    <div class="w-100 py-4 content-container">
      <RouterView />
    </div>
  </div>
  <TransactionModal/>
</template>

<style scoped>
.wrapper-container {
  background-color: rgba(211, 211, 211, 0.1);
  font-family: Poppins;
}

.content-container {
  height: 92vh;
}
</style>