<template>
  <div>
    <div :class="$style.wrapper">
      <Header></Header>
      <div :class="$style.container">
        <SidebarVendor></SidebarVendor>
        <div :class="$style.content">
          <router-view />
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "../Component/Header/Header.vue";
import Footer from "../Component/Footer/Footer.vue";
import SidebarVendor from "../Component/SiderbarVendor/SidebarVendor.vue";
export default {
  name: "DefaultLayout",
  components: {
    Header,
    SidebarVendor,
    Footer,
  },
};
</script>

<style lang="scss" module>
@import "./DefaultLayout.module.scss";
</style>
