// import 'highlight.js/styles/atelier-dune-dark.css'
import "../styles/atelier-dune-dark.css";

// @ts-ignore
import hljs from "highlight.js/lib/highlight";
// @ts-ignore
import javascript from "highlight.js/lib/languages/javascript";
// @ts-ignore
import xml from "highlight.js/lib/languages/xml";
// @ts-ignore
import less from "highlight.js/lib/languages/less";
// @ts-ignore
import css from "highlight.js/lib/languages/css";
// @ts-ignore
import java from "highlight.js/lib/languages/java";
// @ts-ignore
import python from "highlight.js/lib/languages/python";
// @ts-ignore
import objectivec from "highlight.js/lib/languages/objectivec";
// @ts-ignore
import markdown from "highlight.js/lib/languages/markdown";
// @ts-ignore
import bash from "highlight.js/lib/languages/bash";
// @ts-ignore
import json from "highlight.js/lib/languages/json";
// @ts-ignore
import http from "highlight.js/lib/languages/http";

import linenumber from "./linenumber";

// 注册代码行数
linenumber(hljs);

// 按需导入高亮语种
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("less", less);
hljs.registerLanguage("css", css);
hljs.registerLanguage("java", java);
hljs.registerLanguage("python", python);
hljs.registerLanguage("objectivec", objectivec);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("http", http);

hljs.initHighlightingOnLoad();

export default hljs;
