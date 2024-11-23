<template>
  <div>
    <Header></Header>
    <section class="main">
      <router-view />
    </section>
  </div>
</template>

<script>
import Header from "../Component/Header/Header.vue";
export default {
  name: "HeaderOnly",
  components: {
    Header,
  },
};
</script>

<style>
/* Thêm các style cho layout */
.main {
  max-height: 80vh;
}
</style>
