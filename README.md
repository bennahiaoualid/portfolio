# Portfolio — GitHub Pages

Static portfolio. Content lives in `data/en.json` and `data/ar.json`.

## Deploy (GitHub Pages)

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source:** Deploy from branch.
3. Branch: `main`, folder: `/ (root)`.
4. Site URL: `https://<user>.github.io/<repo>/`

On GitHub Pages the site is served over **HTTPS**. Then:

```js
fetch('data/en.json')   // ✅ works
```

```html
<img src="assets/images/profile.webp">  <!-- ✅ works -->
```

Both use normal relative paths from your site URL — same as images.

## Why it failed on your PC

You opened `index.html` by double-clicking it. The address bar shows `file:///E:/...` — **not** a website.

| | `file://` (double-click) | `https://` (GitHub Pages) |
|--|--------------------------|---------------------------|
| `<img src="assets/...">` | ✅ Browser loads the file | ✅ |
| `fetch('data/en.json')` | ❌ Blocked (security) | ✅ |

Browsers **allow** local images but **block** `fetch()` to local JSON. That is not a bug in this project — it is how the web platform works.

**Local preview:** run `serve.ps1` (or VS Code Live Server), open `http://localhost:8080`.  
**Production:** use GitHub Pages — no extra setup.

## Edit content

Change only `data/en.json` and `data/ar.json`, then commit and push.

## Add a project

Add one object to `projects[]` in both JSON files (same `id`). Put images under `assets/images/projects/<folder>/`.

## Screenshot checklist

See sections at the bottom of the first README version — paths under `assets/images/`.
