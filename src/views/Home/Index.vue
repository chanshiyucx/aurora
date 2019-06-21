<template>
  <div class="home">
    <section
      id="background"
      class="background"
      :style="{
        opacity: 1,
        backgroundImage:
          'url(' + require('../../assets/images/' + backgroundImage) + ')'
      }"
    ></section>
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

@Component({})
export default class Home extends Vue {
  backgroundImage: String = "bg.webp";
  bgs: any[] = ["bg.webp", "bg-01.jpg", "bg-02.jpg", "bg-03.jpg", "bg-04.jpg"];
  bgIndex: number = 0;
  showCode: boolean = false;
  contacts: any[] = [
    {
      icon: "https://i.loli.net/2019/01/25/5c4b2a7558ad7.png",
      link:
        "http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=P0dWUQYKDw1-WVBHUl5WUxFcUFI"
    },
    {
      icon: "https://i.loli.net/2019/01/25/5c4b2982b5687.png",
      link: "https://github.com/miyuesc"
    },
    {
      icon: "https://i.loli.net/2018/12/09/5c0cc518dc4f4.png",
      link: "https://www.zhihu.com/people/miyuesc/activities"
    },
    {
      icon: "https://i.loli.net/2018/12/09/5c0cc51ae4f0c.png",
      link: "https://music.163.com/m/user/home?id=256780134"
    },
    {
      icon: "https://i.loli.net/2019/06/21/5d0ca1c87aeb559591.png",
      code: "https://i.loli.net/2019/06/21/5d0ca341bd24127651.png"
    }
  ];

  created() {
    this.backgroundImage = this.bgs[this.bgIndex];
  }

  changeBg(direction: any) {
    if (direction === "pre") {
      if (this.bgIndex - 1 > -1) {
        --this.bgIndex;
      } else {
        this.bgIndex = 4;
      }
      this.backgroundImage = this.bgs[this.bgIndex];
    } else {
      if (this.bgIndex + 1 > 4) {
        this.bgIndex = 0;
      } else {
        ++this.bgIndex;
      }
      this.backgroundImage = this.bgs[this.bgIndex];
    }
  }
}
</script>
<style lang="less">
@import "./home.less";
</style>
