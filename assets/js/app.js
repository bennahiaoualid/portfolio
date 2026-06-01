/**
 * Alpine portfolio app — routing, data, Mermaid.
 */
function portfolio() {
  return {
    view: 'home',
    lang: 'en',
    data: null,
    currentProject: null,
    loading: true,
    error: null,

    async init() {
      this.lang = I18n.getLang();
      await this.loadLocale(this.lang);
      this.handleRoute();
      window.addEventListener('hashchange', () => this.handleRoute());
    },

    async loadLocale(lang) {
      this.loading = true;
      this.error = null;
      try {
        this.data = await I18n.loadData(lang);
        this.lang = lang;
        I18n.setLang(lang);
        I18n.applyDocumentLang(lang);
        document.title = `${this.data.meta.name} — ${this.data.meta.title}`;
      } catch (e) {
        console.error(e);
        this.error = I18n.isFileProtocol()
          ? 'Opened as a local file (file://). Browsers block loading JSON that way. Use Live Server, serve.ps1, or push to GitHub Pages.'
          : 'Could not load data/*.json. Check that the files exist in your repo.';
      } finally {
        this.loading = false;
      }
    },

    async switchLang() {
      const next = I18n.toggleLang(this.lang);
      const hash = window.location.hash;
      await this.loadLocale(next);
      if (this.view === 'project' && this.currentProject) {
        const id = this.currentProject.id;
        this.currentProject =
          this.data?.projects?.find((p) => p.id === id) || null;
      }
      window.location.hash = hash || '#home';
      this.handleRoute();
    },

    handleRoute() {
      const hash = window.location.hash || '#home';

      if (hash.startsWith('#project/')) {
        const id = hash.slice('#project/'.length);
        this.currentProject =
          this.data?.projects?.find((p) => p.id === id) || null;
        this.view = 'project';
        this.$nextTick(() => {
          window.scrollTo(0, 0);
          setTimeout(() => this.renderMermaid(), 100);
        });
        return;
      }

      if (hash === '#projects') {
        this.view = 'projects';
        this.currentProject = null;
        window.scrollTo(0, 0);
        return;
      }

      this.view = 'home';
      this.currentProject = null;
      window.scrollTo(0, 0);
    },

    go(route) {
      if (!route || route === 'home') {
        window.location.hash = 'home';
        return;
      }
      window.location.hash = route;
    },

    openProject(id) {
      window.location.hash = 'project/' + id;
    },

    async renderMermaid() {
      const container = document.getElementById('arch-diagram');
      if (!container) return;
      const diagramText = this.currentProject?.case_study?.architecture;
      container.innerHTML = '';
      if (!diagramText) return;

      const pre = document.createElement('pre');
      pre.className = 'mermaid';
      pre.textContent = diagramText;
      container.appendChild(pre);

      try {
        await mermaid.run({ nodes: [pre] });
      } catch (err) {
        console.warn('Mermaid render error:', err);
        container.innerHTML =
          '<p class="mermaid-fallback">Architecture diagram unavailable.</p>';
      }
    },
  };
}

document.addEventListener('alpine:init', () => {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        background: '#0b1422',
        primaryColor: '#111e2e',
        primaryTextColor: '#dde8f5',
        primaryBorderColor: '#1a2d45',
        lineColor: '#00c9a8',
        secondaryColor: '#0b1422',
        tertiaryColor: '#111e2e',
        edgeLabelBackground: '#0b1422',
        clusterBkg: '#111e2e',
        nodeBorder: '#1a2d45',
        mainBkg: '#111e2e',
      },
      flowchart: { curve: 'basis', padding: 20 },
    });
  }
});
