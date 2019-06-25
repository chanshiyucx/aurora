<template>
  <div class="home">
    <div class="loading" v-if="doLoading">
      <img
        src="../../assets/icons/loading.gif"
        alt="loading"
      />
    </div>

    <section
      id="background"
      class="background"
    >
      <img :src="background" @load="doLoading = false" />
    </section>
    <div class="title" data-value="HI,MIYUESC!">HI,MIYUESC!</div>
    <div class="tools">
      <div class="text">
        <img src="../../assets/icons/quotes.svg" style="float: left" />
        <span>梦醒时分，月当此时明</span>
        <img src="../../assets/icons/quotes.svg" style="float: right" />
      </div>
      <ul class="tools-box">
        <li @click="changeBg('pre')">
          <img src="../../assets/icons/angle-left.svg" />
        </li>
        <li
          v-for="(i, k) in contacts"
          :key="k"
          :class="i.code ? 'has_code' : ''"
          @mouseenter="showCode = i.code && !showCode ? true : false"
          @mouseleave="showCode = false"
        >
          <a :href="i.link" rel="noopener noreferrer" target="_blank">
            <img :src="i.icon" alt="i.label" style="width: 20px; height: 20px"
          /></a>
          <div
            v-if="i.code"
            class="code"
            :style="{ opacity: showCode ? 1 : 0 }"
          >
            <img :src="i.code" class="code-image" />
          </div>
        </li>
        <li @click="changeBg('next')">
          <img src="../../assets/icons/angle-right.svg" />
        </li>
      </ul>
    </div>
    <div class="main-content">
      <h2>test</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import config from "@/config/index";

@Component({})
export default class Home extends Vue {
  background: String = config.homeBgs[0];
  bgs: any[] = config.homeBgs;
  bgIndex: number = 0;
  showCode: boolean = false;
  contacts: any[] = config.contact;
  doLoading: boolean = true;

  created() {
    this.background = this.bgs[this.bgIndex];
  }

  changeBg(direction: any) {
    if (direction === "pre") {
      if (this.bgIndex - 1 > -1) {
        --this.bgIndex;
      } else {
        this.bgIndex = 4;
      }
      this.background = this.bgs[this.bgIndex];
    } else {
      if (this.bgIndex + 1 > this.bgs.length - 1) {
        this.bgIndex = 0;
      } else {
        ++this.bgIndex;
      }
      this.background = this.bgs[this.bgIndex];
    }
  }
}
</script>
<style lang="less">
@import "./home.less";
</style>
