# MVP 简历网站（结构优先）

本目录是一个**无依赖**的简历网站骨架：内容全在 `data/resume.json`，页面由 `src/app.js` 渲染。

## 预览

在当前目录启动本地静态服务器（任选其一）：

```bash
python3 -m http.server 5173
```

然后打开：`http://localhost:5173/New_approch/mvp_resume_site/`

如果你是在 `New_approch/mvp_resume_site` 目录里启动的服务器，则打开：`http://localhost:5173/`

## 填写内容

- 编辑：`data/resume.json`
- PDF 简历：
  - 把文件放在本目录下，例如 `resume.pdf`
  - 然后把 `download.pdfPath` 改成 `./resume.pdf`

# mvp_resume_site
