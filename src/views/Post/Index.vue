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
      <div class="main-body">
        <div class="post-body">
          <div class="post-title">
            <span>{{ articleInfo.title }}</span>
          </div>
          <div class="post-info">
            <div class="info-created">发布时间：{{ updateTime }}</div>
            <div class="info-tags">
              <div class="info-tag" v-for="i in articleInfo.labels" :key="i.id">
                <span :style="{ background: '#' + i.color }">{{ i.name }}</span>
              </div>
            </div>
          </div>
          <div class="post-body">
            <mark-down
              :content="articleInfo.body"
              :only-render="false"
            ></mark-down>
          </div>
        </div>
        <div class="post-menu"></div>
      </div>
      <!--      <div class="wish-info">Read the end, welcome to leave your comments</div>-->
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
import { formatJSONDate } from "@/utils/format";
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
  updateTime: string = "";

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
    this.updateTime = formatJSONDate(this.articleInfo.created_at);
    this.background = this.articleInfo.body.match(/http\S*png/)
      ? this.articleInfo.body.match(/http\S*png/)
      : this.articleInfo.body.match(/http\S*jpg/);
    this.getTitle(this.articleInfo.body).then((data: any) => {
      console.log(data);
    });
  }

  async getTitle(content: any) {
    let nav = [];

    let tempArr: any[] = [];
    content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function(
      match: any,
      m1: any,
      m2: any
    ) {
      let title = match.replace("\n", "");
      let level = m1.length;
      tempArr.push({
        title: title.replace(/^#+/, "").replace(/\([^)]*?\)/, ""),
        level: level,
        children: []
      });
    });

    // 只处理一级二级标题，以及添加与id对应的index值
    nav = tempArr.filter(item => item.level <= 3);
    let index = 0;
    return (nav = nav.map(item => {
      item.index = index++;
      return item;
    }));
  }
}
</script>

<style scoped lang="less">
@import "./post.less";
</style>
