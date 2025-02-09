<script lang="ts" setup>

import {useRouter} from "vue-router";

const props = defineProps({
  dashboardContent: { type: Object, required: true }
})

const router: any = useRouter()

const redirectToView = () => {
  router.push({ name: props.dashboardContent.route })
}

</script>

<template>
  <div @click="redirectToView" class="dashboard-data-container bg-white rounded-2 px-4 py-3 col-12 col-sm-6 col-lg-3">
    <p class="m-0 fs-6 fw-bold">{{ dashboardContent.title }}</p>
    <h3 class="m-0 fs-5"> R$ {{ dashboardContent.amount }} </h3>
    <p class="m-0 small-text-card"> {{ dashboardContent.percentage }} % </p>
  </div>
</template>

<style scoped>
.dashboard-data-container {
  border: 1px solid lightgray;]
  width: calc(100% - 15px);
  cursor: pointer;
}

.small-text-card {
  font-size: 12px;
  color: gray;
}

@media(min-width: 576px) and (max-width: 991px) {
  .dashboard-data-container {
    width: calc(50% - 15px);
  }
}

@media(min-width: 992px) {
  .dashboard-data-container {
    width: calc(25% - 15px);
  }

}
</style>