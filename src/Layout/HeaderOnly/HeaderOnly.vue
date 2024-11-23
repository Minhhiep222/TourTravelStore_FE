<template>
  <div>
    <Header></Header>
    <section class="main min-h-full">
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
  position: sticky;
  top: 30px;
  min-height: 100vh; /* Đảm bảo main luôn có chiều cao tối thiểu là chiều cao của viewport */
}
</style>
