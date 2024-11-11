<template>
    <div>
        <Header></Header>
      <main>
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
   import Header from '../Component/Header/Header.vue';
  export default {
    name: 'HeaderOnly',
    components: {
    Header,
  },
  };
  </script>
  
  <style>
  /* Thêm các style cho layout */
  </style>
  