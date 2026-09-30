# 个人网站制作

大一下「Web 应用技术」课程设计。纯手写 HTML / CSS / JavaScript 构建的个人博客站点，20 个页面，零框架、零构建工具，双击 `index.html` 即可打开。

- **技术栈**：原生 HTML5 + CSS3 + JavaScript（无任何框架、无 CDN 依赖）
- **规模**：20 个页面，CSS 1,042 行，JS 200 行
- **主题**：亮色 / 暗色双主题一键切换，选择本地持久化

## 站点结构

| 分类 | 页面 |
|---|---|
| **关于** | `index.html`（首页）、`self-intro.html`、`info.html`、`contact.html` |
| **学习** | `education.html`、`skills.html`、`projects.html`、`awards.html` |
| **记录** | `books.html`、`movies.html`、`music.html`、`games.html`、`anime.html`、`hobbies.html`、`quotes.html` |
| **生活** | `photos.html`、`daily-life.html`、`bucket-list.html`、`websites.html`、`tools.html` |

```
myblog/
├── html/               # 20 个页面
├── css/
│   ├── style.css       # 默认亮色主题（539 行）
│   └── theme-dark.css  # 暗色主题（503 行）
├── js/
│   └── main.js         # 交互逻辑（200 行）
└── image/              # 头像与配图
```

## 实现要点

### 双主题切换

`theme-dark.css` 与 `style.css` 结构完全一致，只覆盖配色。点击切换按钮时：

- 页面**动态换装**另一张样式表，而非重新加载
- 用户选择写入 `localStorage`，下次访问自动还原
- `main.js` 中的 `toggleTheme()` / `applyTheme()` 负责状态切换

### 其它交互

| 功能 | 实现 |
|---|---|
| 实时时钟 | `updateClock()` 定时刷新 |
| 标题跑马灯 | `titleMarquee()` 实现滚动效果 |
| 事件绑定 | 统一通过 `addEventListener` 管理 |

### 主题样式修改指引

`theme-dark.css` 文件头部附有说明注释：

| 想改什么 | 改哪里 |
|---|---|
| 暗色背景 | `body` 的 `background-color` |
| 文字颜色 | `body` 的 `color` |
| 导航栏背景 | `.navbar` 的 `background-color` |
| 其他组件 | 与 `style.css` 相同的类名 |

## 运行

无需任何构建步骤，直接双击：

```
myblog/html/index.html
```

或用浏览器打开该文件即可。所有资源均为相对路径引用，可整个文件夹拷走随时使用。

## 目录说明

| 路径 | 内容 |
|---|---|
| `myblog/` | 网站全部源代码与图片资源 |
| `Web应用技术实验指导书.doc` | 课程实验指导书 |
| `…html学习.docx` / `…css学习.docx` / `…js学习.docx` | 三份专题学习报告 |
| `…课程设计报告.docx` | 课程设计报告 |

> ⚠️ 上述 `.doc` / `.docx` 为课程提供 materials 与本人作业报告，版权归课程方及本人所有，此处仅作个人存档，**请勿再行分发**。

## 许可

`myblog/` 下的网站代码为本人原创。课程材料的版权归课程方所有。