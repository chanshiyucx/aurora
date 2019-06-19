<template>
  <div class="blog">
    <div class="loading" v-if="doLoading">
      <img
        src="../../assets/icons/loading.gif"
        alt="loading"
        style="margin: auto; width: 60px; height: 60px"
      />
    </div>

    <div class="main" v-else>
      <div class="cover">
        <span>TECH, RECORD AND LIFE</span>
      </div>
      <div class="articles-box">
        <div class="articles">
          <article class="article-card" v-for="(i, k) in articles" :key="k">
            <div style="width: 400px; float: left">
              <div class="article-title">{{ i.title }}</div>
              <div class="article-time">Released at {{ i.updateTime }}</div>
              <div
                class="article-tag"
                v-for="(tag, index) in i.labels"
                :key="index"
                :style="{ color: '#' + tag.color }"
              >
                <span>{{ tag.name }}</span>
              </div>
              <div class="article-desc">
                <mark-down :content="i.body"></mark-down>
              </div>
            </div>
            <div class="article-cover">
              <img
                src="../../assets/images/bg-04.jpg"
                width="240px"
                height="240px"
                alt="i.title"
              />
            </div>
          </article>
        </div>
        <div class="tags"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import { queryPosts } from "@/utils/services";
import MarkDown from "@/components/MarkDown/Index.vue";

@Component({
  components: {
    MarkDown
  }
})
export default class Blog extends Vue {
  doLoading: boolean = true;
  filter: any = {
    page: 1,
    pageSize: 10,
    filter: ""
  };
  articles: any[] = [];

  created() {
    this.getAllBlog();
  }
  getAllBlog() {
    queryPosts(this.filter).then((data: any) => {
      this.doLoading = false;
      this.articles = data;
      console.log(data);
      this.articles.forEach((i: any) => {
        i.updateTime = i.updated_at.toString().substring(0, 10);
      });
    });
  }
}
</script>

<style scoped lang="less">
@import "./blog.less";
</style>
