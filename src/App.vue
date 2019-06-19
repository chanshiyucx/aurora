<template>
  <div id="app">
    <blog-header></blog-header>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BlogHeader from "@/components/Header/Index.vue";

@Component({
  components: {
    BlogHeader
  }
})
export default class App extends Vue {}
</script>
<style>
body {
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  position: relative;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ffffff;
  overflow-x: hidden;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: rgba(58, 58, 58, 0.6);
}
</style>
