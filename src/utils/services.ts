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
    // console.log(err);
  }
};
// 获取标签
export const queryTag = async () => {
  try {
    const url = `${blog}/labels?access_token=${access_token}&page=1&per_page=100`;
    const response = await fetch(url);
    checkStatus(response);
    return await response.json();
  } catch (err) {
    // console.log(err);
  }
};
// 获取单篇文章
export const queryPost = async (number: number) => {
  try {
    const url = `${blog}/issues/${number}?${open}`;
    const response = await Vue.axios.get(url);
    checkStatus(response);
    return await response.data;
  } catch (err) {
    // console.log(err);
  }
};
// 获取分类
export const queryCategory = async () => {
  try {
    const url = `${blog}/milestones?access_token=${access_token}`;
    const response = await fetch(url);
    checkStatus(response);
    return await response.json();
  } catch (err) {
    // console.log(err);
  }
};
