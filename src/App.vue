<template>
  <div id="app">
    <blog-header></blog-header>
    <router-view />
    <back-to-top></back-to-top>
    <blog-footer></blog-footer>
  </div>
</template>
<script>
//   import {Component, Vue, Watch} from "vue-property-decorator";
import BlogHeader from "@/components/Header/Index.vue";
import BlogFooter from "@/components/Footer/Index.vue";
import BackToTop from "@/components/BackToTop/Index.vue";

// @Component({
//   components: {
//     BlogHeader,
//     BlogFooter,
//     BackToTop
//   }
// })
export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  components: {
    BlogHeader,
    BlogFooter,
    BackToTop
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      // this.transitionName = toDepth < fromDepth ? "slide-left" : "slide-right";
      this.transitionName = "slide";
    }
  }
};
</script>
<style>
html,
body {
  padding: 0;
  margin: 0;
  user-select: none;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  cursor: url("/public/Arrow.cur"), auto;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: rgba(58, 58, 58, 0.6);
}
</style>
