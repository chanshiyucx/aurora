<template>
  <div class="post">
    <div class="loading" v-if="doLoading">
      <img
        src="../../assets/icons/loading.gif"
        alt="loading"
        style="margin: auto; width: 60px; height: 60px"
      />
    </div>

    <div class="main" v-else>
      <div
        class="cover"
        :style="{
          backgroundImage: 'url(' + background + ')'
        }"
      ></div>
      <div class="post-title">
        <span>{{ articleInfo.title }}</span>
      </div>
      <div class="post-info">
        <div class="info-created">
          发布时间：{{ articleInfo.updated_at.toString().substring(0, 10) }}
        </div>
        <div class="info-tags">
          <div class="info-tag" v-for="i in articleInfo.labels" :key="i.id">
            <span :style="{ background: '#' + i.color }">{{ i.name }}</span>
          </div>
        </div>
      </div>
      <div class="post-body">
        <mark-down :content="articleInfo.body" :only-render="false"></mark-down>
      </div>
    </div>
    <comment
      v-if="initComment"
      :id="articleInfo.id"
      :title="articleInfo.title"
    ></comment>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import MarkDown from "@/components/MarkDown/Index.vue";
import Comment from "@/components/Comment/Index.vue";
// import { queryPost } from "@/utils/services";

@Component({
  components: {
    MarkDown,
    Comment
  }
})
export default class Post extends Vue {
  number: any = "";
  doLoading: boolean = true;
  initComment: boolean = false;
  articleInfo: any = null;
  background: string = "";

  async created() {
    this.number = this.$route.params.number;
    this.getArticleInfo().then(() => {
      this.$nextTick(() => {
        this.initComment = true;
        this.doLoading = false;
      });
    });
  }
  async getArticleInfo() {
    this.articleInfo = await this.$store.dispatch("queryPost", {
      number: this.number
    });
    this.background = this.articleInfo.body.match(/http\S*png/)
      ? this.articleInfo.body.match(/http\S*png/)
      : this.articleInfo.body.match(/http\S*jpg/);
  }
}
</script>

<style scoped lang="less">
@import "./post.less";
</style>
