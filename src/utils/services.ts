import config from "@/config/index";
import { Vue } from "vue-property-decorator";

const GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_API = "https://api.github.com/repos";

const { username, repository, token } = config;
const blog = `${GITHUB_API}/${username}/${repository}`;
const access_token = token.join("");
const open = `state=open&access_token=${access_token}`;
const closed = `state=closed&access_token=${access_token}`;

// 状态检测
const checkStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) return response;
  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
};

// 获取文章列表
export const queryPosts = async ({ page = 1, pageSize = 10, filter = "" }) => {
  try {
    const url = `${blog}/issues?${open}&page=${page}&per_page=${pageSize}${filter}`;
    const response = await Vue.axios.get(url);
    checkStatus(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};