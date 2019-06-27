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
            <div style="width: 400px; height: 100%; float: left">
              <div class="article-title" @click="gotoPost(i.number)">
                {{ i.title }}
              </div>
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
                <mark-down :content="i.body" :only-render="true"></mark-down>
              </div>
            </div>
            <div class="article-cover">
              <img
                :src="i.body.match(/http\S*jpg/) || i.body.match(/http\S*png/)"
                width="360px"
                height="240px"
                @click="gotoPost(i.number)"
              />
            </div>
          </article>
          <div class="error-img" v-if="!articles.length">
            <img
              src="http://ww1.sinaimg.cn/large/0067sbCSly1g4fs489wyog306o06o74f.gif"
              alt="sorry,There are no posts under this category"
            />
            <p class="error-text">
              I'm sorry,There are no posts under this category!
            </p>
            <p class="error-text">
              And I will complement as soon as possible
            </p>
          </div>
        </div>
        <div>
          <div class="tags-list">
            <div class="tags-title">
              <img src="../../assets/icons/tag.svg" />
              <span class="tag-box-title" @click="resetFilter">Tags</span>
            </div>
            <div class="tags">
              <div
                class="tag-item"
                v-for="tag in tags"
                :key="tag.id"
                :style="{ color: '#' + tag.color }"
                @click="queryFilter(tag.name, 'tag')"
              >
                <span class="tag-name">{{ tag.name }}</span>
              </div>
            </div>
          </div>
          <div class="category-list">
            <div class="category-title">
              <img src="../../assets/icons/category.svg" />
              <span class="category-box-title" @click="resetFilter"
                >Categories</span
              >
            </div>
            <div class="categories">
              <div
                class="category-item"
                v-for="category in categories"
                :key="category.id"
                @click="queryFilter(category.number, 'category')"
              >
                <div class="border-left"></div>
                <span class="category-name">{{ category.title }}</span>
                <div class="border-right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import { queryPosts, queryCategory } from "@/utils/services";
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
  tags: any[] = [];
  categories: any[] = [];

  async created() {
    await this.queryTag();
    await this.getCategory();
    this.getAllBlog();
  }
  getAllBlog() {
    queryPosts(this.filter).then((data: any) => {
      this.doLoading = false;
      this.articles = data;
      // console.log(data);
      this.articles.forEach((i: any) => {
        i.updateTime = i.updated_at.toString().substring(0, 10);
      });
    });
  }
  // 获取标签列表
  async queryTag() {
    this.tags = await this.$store.dispatch("queryTag");
  }
  async getCategory() {
    this.categories = await queryCategory();
    // console.log(this.categories);
  }
  gotoPost(number: any) {
    this.$router.push({ name: "post", params: { number } });
  }
  queryFilter(filter: any, type: string) {
    this.doLoading = true;
    this.filter.filter =
      type === "tag" ? `&labels=${filter}` : `&milestone=${filter}`;
    queryPosts(this.filter).then((data: any) => {
      this.articles = data;
      this.articles.forEach((i: any) => {
        i.updateTime = i.updated_at.toString().substring(0, 10);
      });
      this.doLoading = false;
    });
  }
  resetFilter() {
    this.doLoading = true;
    this.filter = { page: 1, pageSize: 10, filter: "" };
    this.getAllBlog();
  }
}
</script>

<style scoped lang="less">
@import "./blog.less";
</style>
