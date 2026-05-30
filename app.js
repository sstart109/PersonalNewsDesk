document.addEventListener('DOMContentLoaded', () => {
    // --- 1. UI Setup & Preferences ---
    const dateElement = document.getElementById('current-date');
    const lastRefreshElement = document.getElementById('last-refresh');
    const statusMessageElement = document.getElementById('status-message');
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);

    const htmlEl = document.documentElement;
    
    let currentFontSize = parseInt(localStorage.getItem('pnd_fontsize')) || 16;
    
    function applyFontSize(size) {
        if (size < 12) size = 12;
        if (size > 24) size = 24;
        htmlEl.style.setProperty('--base-font-size', size + 'px');
        htmlEl.style.fontSize = size + 'px';
        localStorage.setItem('pnd_fontsize', size);
        currentFontSize = size;
    }

    applyFontSize(currentFontSize);

    document.getElementById('btn-font-plus').addEventListener('click', () => applyFontSize(currentFontSize + 1));
    document.getElementById('btn-font-minus').addEventListener('click', () => applyFontSize(currentFontSize - 1));
    document.getElementById('btn-refresh').addEventListener('click', () => fetchAllNews());

    // --- Theme Settings UI ---
    let currentMode = localStorage.getItem('pnd_theme_mode') || 'dark';
    let currentThemeId = localStorage.getItem('pnd_theme_id') || 'classic-dark';
    let customColors = JSON.parse(localStorage.getItem('pnd_custom_colors')) || { light: {}, dark: {} };

    const themeModal = document.getElementById('theme-modal');
    
    document.getElementById('btn-settings').addEventListener('click', () => {
        renderThemesGrid();
        themeModal.style.display = 'flex';
    });
    document.getElementById('btn-close-theme-modal').addEventListener('click', () => { themeModal.style.display = 'none'; });
    document.getElementById('btn-done-theme-modal').addEventListener('click', () => { themeModal.style.display = 'none'; });

    const aboutModal = document.getElementById('about-modal');
    document.getElementById('btn-about').addEventListener('click', () => {
        aboutModal.style.display = 'flex';
    });
    document.getElementById('btn-close-about').addEventListener('click', () => {
        aboutModal.style.display = 'none';
    });

    const helpModal = document.getElementById('help-modal');
    document.getElementById('btn-open-help').addEventListener('click', () => {
        helpModal.style.display = 'flex';
    });
    document.getElementById('btn-close-help').addEventListener('click', () => {
        helpModal.style.display = 'none';
    });

    document.getElementById('btn-mode-light').addEventListener('click', () => {
        currentMode = 'light';
        currentThemeId = currentThemeId.replace('-dark', '-light');
        if (currentThemeId !== 'custom') {
            const found = lightThemes.find(t => t.id === currentThemeId);
            if (!found) currentThemeId = lightThemes[0].id;
        }
        applyCurrentTheme();
        renderThemesGrid();
    });
    document.getElementById('btn-mode-dark').addEventListener('click', () => {
        currentMode = 'dark';
        currentThemeId = currentThemeId.replace('-light', '-dark');
        if (currentThemeId !== 'custom') {
            const found = darkThemes.find(t => t.id === currentThemeId);
            if (!found) currentThemeId = darkThemes[0].id;
        }
        applyCurrentTheme();
        renderThemesGrid();
    });

    function applyThemeColors(bg, surface, border, text, accent) {
        htmlEl.style.setProperty('--bg-color', bg);
        htmlEl.style.setProperty('--panel-bg', surface);
        htmlEl.style.setProperty('--border-color', border);
        htmlEl.style.setProperty('--text-main', text);
        htmlEl.style.setProperty('--link-hover', accent);
        htmlEl.style.setProperty('--header-red', accent);
        htmlEl.style.setProperty('--btn-bg', surface);
        htmlEl.style.setProperty('--border-light', border);
        
        document.getElementById('color-bg').value = bg;
        document.getElementById('color-surface').value = surface;
        document.getElementById('color-border').value = border;
        document.getElementById('color-text').value = text;
        document.getElementById('color-accent').value = accent;
    }

    function applyCurrentTheme() {
        htmlEl.setAttribute('data-theme', currentMode);
        localStorage.setItem('pnd_theme_mode', currentMode);
        localStorage.setItem('pnd_theme_id', currentThemeId);
        
        if (currentMode === 'light') {
            document.getElementById('btn-mode-light').classList.add('active');
            document.getElementById('btn-mode-dark').classList.remove('active');
        } else {
            document.getElementById('btn-mode-dark').classList.add('active');
            document.getElementById('btn-mode-light').classList.remove('active');
        }

        if (currentThemeId === 'custom') {
            const colors = customColors[currentMode];
            if (colors.bg) {
                applyThemeColors(colors.bg, colors.surface, colors.border, colors.text, colors.accent);
            }
        } else {
            const themeArray = currentMode === 'light' ? lightThemes : darkThemes;
            const themeObj = themeArray.find(t => t.id === currentThemeId) || themeArray[0];
            if (themeObj) {
                applyThemeColors(themeObj.bg, themeObj.surface, themeObj.border, themeObj.text, themeObj.accent);
            }
        }
    }

    function renderThemesGrid() {
        const grid = document.getElementById('themes-grid-container');
        const themeArray = currentMode === 'light' ? lightThemes : darkThemes;
        grid.innerHTML = '';
        
        themeArray.forEach(theme => {
            const card = document.createElement('div');
            card.className = 'theme-card' + (currentThemeId === theme.id ? ' selected' : '');
            card.innerHTML = `
                <div class="theme-card-title">${theme.name}</div>
                <div class="theme-palette-preview">
                    <div class="palette-swatch" style="background: ${theme.bg};"></div>
                    <div class="palette-swatch" style="background: ${theme.surface};"></div>
                    <div class="palette-swatch" style="background: ${theme.border};"></div>
                    <div class="palette-swatch" style="background: ${theme.accent};"></div>
                    <div class="palette-swatch" style="background: ${theme.text};"></div>
                </div>
            `;
            card.addEventListener('click', () => {
                currentThemeId = theme.id;
                applyCurrentTheme();
                renderThemesGrid();
            });
            grid.appendChild(card);
        });
        
        const customCard = document.createElement('div');
        customCard.className = 'theme-card' + (currentThemeId === 'custom' ? ' selected' : '');
        const customC = customColors[currentMode];
        const hasCustom = customC && customC.bg;
        customCard.innerHTML = `
            <div class="theme-card-title">Custom</div>
            <div class="theme-palette-preview">
                <div class="palette-swatch" style="background: ${hasCustom ? customC.bg : '#333'};"></div>
                <div class="palette-swatch" style="background: ${hasCustom ? customC.surface : '#444'};"></div>
                <div class="palette-swatch" style="background: ${hasCustom ? customC.border : '#555'};"></div>
                <div class="palette-swatch" style="background: ${hasCustom ? customC.accent : '#666'};"></div>
                <div class="palette-swatch" style="background: ${hasCustom ? customC.text : '#777'};"></div>
            </div>
        `;
        customCard.addEventListener('click', () => {
            if (hasCustom) {
                currentThemeId = 'custom';
                applyCurrentTheme();
                renderThemesGrid();
            }
        });
        grid.appendChild(customCard);
    }

    function handleCustomColorChange() {
        currentThemeId = 'custom';
        customColors[currentMode] = {
            bg: document.getElementById('color-bg').value,
            surface: document.getElementById('color-surface').value,
            border: document.getElementById('color-border').value,
            text: document.getElementById('color-text').value,
            accent: document.getElementById('color-accent').value
        };
        localStorage.setItem('pnd_custom_colors', JSON.stringify(customColors));
        applyCurrentTheme();
        renderThemesGrid();
    }
    ['color-bg', 'color-surface', 'color-border', 'color-text', 'color-accent'].forEach(id => {
        document.getElementById(id).addEventListener('input', handleCustomColorChange);
    });

    document.getElementById('btn-reset-custom').addEventListener('click', () => {
        customColors[currentMode] = {};
        localStorage.setItem('pnd_custom_colors', JSON.stringify(customColors));
        const themeArray = currentMode === 'light' ? lightThemes : darkThemes;
        currentThemeId = themeArray[0].id;
        applyCurrentTheme();
        renderThemesGrid();
    });

    applyCurrentTheme();

    // --- 2. My Sources Management ---
    const defaultSources = [
        { id: 'foxbusiness', name: 'Fox Business', url: 'https://moxie.foxbusiness.com/google-publisher/latest.xml', enabled: true, column: 1, maxStories: 7 },
        { id: 'foxnewstech', name: 'Fox News Tech', url: 'https://moxie.foxnews.com/google-publisher/tech.xml', enabled: true, column: 1, maxStories: 7 },
        { id: 'foxnewspolitics', name: 'Fox News Politics', url: 'https://moxie.foxnews.com/google-publisher/politics.xml', enabled: true, column: 1, maxStories: 7 },
        { id: 'foxnewsworld', name: 'Fox News World', url: 'https://moxie.foxnews.com/google-publisher/world.xml', enabled: true, column: 1, maxStories: 7 },
        { id: 'dailycaller', name: 'The Daily Caller', url: 'https://feeds.feedburner.com/dailycaller', enabled: true, column: 1, maxStories: 7 },
        
        { id: 'breitbart', name: 'Breitbart', url: 'https://feeds.feedburner.com/breitbart', enabled: true, column: 2, maxStories: 7 },
        { id: 'gatewaypundit', name: 'The Gateway Pundit', url: 'https://www.thegatewaypundit.com/feed', enabled: true, column: 2, maxStories: 7 },
        { id: 'townhall', name: 'Townhall', url: 'https://www.bing.com/news/search?q=site%3Atownhall.com&format=rss', enabled: true, column: 2, maxStories: 7 },
        
        { id: 'washingtonexaminer', name: 'Washington Examiner Politics', url: 'https://www.washingtonexaminer.com/tag/politics/feed/', enabled: true, column: 3, maxStories: 7 },
        { id: 'newsmax', name: 'Newsmax', url: 'https://www.newsmax.com/rss/Newsfront/16/', enabled: true, column: 3, maxStories: 7 },
        { id: 'washingtontimes', name: 'The Washington Times Politics', url: 'https://www.washingtontimes.com/rss/headlines/news/politics/', enabled: true, column: 3, maxStories: 7 },
        { id: 'federalist', name: 'The Federalist', url: 'https://thefederalist.com/feed/', enabled: true, column: 3, maxStories: 7 },
        { id: 'freebeacon', name: 'Washington Free Beacon', url: 'https://freebeacon.com/feed/', enabled: true, column: 3, maxStories: 7 }
    ];

    let sources = JSON.parse(localStorage.getItem('pnd_sources'));
    let sourcesVersion = localStorage.getItem('pnd_sources_version');
    
    if (!sources || sourcesVersion !== '2') {
        sources = defaultSources;
        localStorage.setItem('pnd_sources_version', '2');
        localStorage.setItem('pnd_sources', JSON.stringify(sources));
    }

    function saveSources() {
        localStorage.setItem('pnd_sources', JSON.stringify(sources));
        localStorage.setItem('pnd_columnists', JSON.stringify(followedColumnists));
    }

    const modal = document.getElementById('sources-modal');
    const sourcesListContainer = document.getElementById('sources-list-container');
    const columnistsListContainer = document.getElementById('columnists-list-container');
    
    document.getElementById('btn-sources').addEventListener('click', () => {
        renderModalList();
        renderColumnistModalList();
        modal.style.display = 'flex';
    });
    
    document.getElementById('btn-close-modal').addEventListener('click', () => { modal.style.display = 'none'; });
    document.getElementById('btn-cancel-modal').addEventListener('click', () => { modal.style.display = 'none'; });
    
    document.getElementById('btn-save-modal').addEventListener('click', () => {
        saveSources();
        modal.style.display = 'none';
        fetchAllNews();
    });

    // Followed Columnists Management
    const defaultColumnists = [
        { name: "Victor Davis Hanson", url: "https://victorhanson.com/" },
        { name: "Mollie Hemingway", url: "https://thefederalist.com/author/mzhemingway/" },
        { name: "Thomas Sowell", url: "https://www.tsowell2.com/" }
    ];
    
    let storedCol = localStorage.getItem('pnd_columnists');
    let followedColumnists = storedCol ? JSON.parse(storedCol) : defaultColumnists;
    if (followedColumnists.length > 0 && typeof followedColumnists[0] === 'string') {
        followedColumnists = defaultColumnists;
        localStorage.setItem('pnd_columnists', JSON.stringify(followedColumnists));
    }

    document.getElementById('btn-add-columnist').addEventListener('click', () => {
        const nameInput = document.getElementById('new-columnist-name');
        const urlInput = document.getElementById('new-columnist-url');
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        if (name) {
            followedColumnists.push({ name: name, url: url });
            nameInput.value = '';
            urlInput.value = '';
            renderColumnistModalList();
        }
    });

    function renderColumnistModalList() {
        columnistsListContainer.innerHTML = '';
        followedColumnists.forEach((authorObj, index) => {
            const item = document.createElement('div');
            item.className = 'columnist-list-item';
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'columnist-list-item-info';
            
            const nameEl = document.createElement('div');
            nameEl.className = 'columnist-list-item-name';
            nameEl.textContent = authorObj.name;
            
            const urlEl = document.createElement('div');
            urlEl.className = 'columnist-list-item-url';
            urlEl.textContent = authorObj.url || '';
            
            infoDiv.appendChild(nameEl);
            if (authorObj.url) infoDiv.appendChild(urlEl);
            
            const btnDelete = document.createElement('button');
            btnDelete.className = 'delete-btn';
            btnDelete.innerHTML = 'Delete';
            btnDelete.addEventListener('click', () => {
                followedColumnists.splice(index, 1);
                renderColumnistModalList();
            });
            
            item.appendChild(infoDiv);
            item.appendChild(btnDelete);
            columnistsListContainer.appendChild(item);
        });
    }

    document.getElementById('btn-add-source').addEventListener('click', () => {
        const nameInput = document.getElementById('new-source-name');
        const urlInput = document.getElementById('new-source-url');
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        
        if (name && url) {
            sources.push({
                id: name.toLowerCase().replace(/[^a-z0-9]/g, ''),
                name: name,
                url: url,
                enabled: true,
                column: 3,
                maxStories: 7
            });
            nameInput.value = '';
            urlInput.value = '';
            renderModalList();
        }
    });

    function renderModalList() {
        // Ensure sources are sorted by column first
        sources.sort((a, b) => a.column - b.column);
        sourcesListContainer.innerHTML = '';
        sources.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'source-list-item';
            
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = src.enabled;
            cb.addEventListener('change', () => {
                src.enabled = cb.checked;
            });
            
            const nameEl = document.createElement('span');
            nameEl.style.display = "inline-block"; nameEl.style.width = "250px";
            nameEl.textContent = src.name;
            
            const maxSelect = document.createElement('select');
            for(let i=1; i<=15; i++) {
                const opt = document.createElement('option');
                opt.value = i;
                opt.text = i + ' stories';
                if(src.maxStories === i) opt.selected = true;
                maxSelect.appendChild(opt);
            }
            maxSelect.addEventListener('change', (e) => {
                src.maxStories = parseInt(e.target.value);
            });
            
            const colSelect = document.createElement('select');
            [1, 2, 3].forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.text = 'Col ' + c;
                if(src.column === c) opt.selected = true;
                colSelect.appendChild(opt);
            });
            colSelect.addEventListener('change', (e) => {
                src.column = parseInt(e.target.value);
                renderModalList();
            });
            
            const btnUp = document.createElement('button');
            btnUp.className = 'nav-btn';
            btnUp.style.padding = '5px 10px';
            btnUp.textContent = 'Up';
            btnUp.disabled = index === 0 || sources[index - 1].column !== src.column;
            btnUp.addEventListener('click', () => {
                if (index > 0 && sources[index - 1].column === src.column) {
                    [sources[index - 1], sources[index]] = [sources[index], sources[index - 1]];
                    renderModalList();
                }
            });
            
            const btnDown = document.createElement('button');
            btnDown.className = 'nav-btn';
            btnDown.style.padding = '5px 10px';
            btnDown.textContent = 'Down';
            btnDown.disabled = index === sources.length - 1 || sources[index + 1].column !== src.column;
            btnDown.addEventListener('click', () => {
                if (index < sources.length - 1 && sources[index + 1].column === src.column) {
                    [sources[index], sources[index + 1]] = [sources[index + 1], sources[index]];
                    renderModalList();
                }
            });
            
            const btnDelete = document.createElement('button');
            btnDelete.className = 'delete-btn';
            btnDelete.innerHTML = '&times;';
            btnDelete.title = 'Delete Source';
            btnDelete.addEventListener('click', () => {
                sources.splice(index, 1);
                renderModalList();
            });
            
            item.appendChild(cb);
            item.appendChild(nameEl);
            item.appendChild(maxSelect);
            item.appendChild(colSelect);
            item.appendChild(btnUp);
            item.appendChild(btnDown);
            item.appendChild(btnDelete);
            
            sourcesListContainer.appendChild(item);
        });
    }

    // --- 3. Data Fetching & Normalization ---
    let allArticles = [];
    let clusteredTopStories = [];
    let followedAuthorsArticles = [];

    const promotionalTerms = ['advertise', 'subscribe', 'newsletter', 'donate', 'about us', 'contact us', 'privacy policy', 'sign up', 'log in', 'membership', 'sponsored'];
    const stopWords = new Set(['the','and','about','after','with','from','says','that','this','for','are','was','has','have','had','not','but','will','what','when','where','who','why','how','all','any','can']);

    function isPromotional(title, link) {
        if (!title || !link) return true;
        const lowerTitle = title.toLowerCase();
        for (let term of promotionalTerms) {
            if (lowerTitle.startsWith(term)) return true;
        }
        return false;
    }

    function tokenize(title, url) {
        let text = title.toLowerCase();
        try {
            const path = new URL(url).pathname;
            text += " " + path.replace(/[\/\-_]/g, ' ');
        } catch(e) {}
        
        let words = text.replace(/[^\w\s]/g, ' ').split(/\s+/);
        let keywords = new Set();
        for (let w of words) {
            if (w.length > 2 && !stopWords.has(w)) {
                keywords.add(w);
            }
        }
        return keywords;
    }

    function normalizeTitle(title) {
        return title.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    async function fetchRSS(source) {
        if (!source.enabled) return [];
        
        const proxies = [
            { type: 'feed2json', url: 'https://feed2json.org/convert?url=' },
            { type: 'rss2json', url: 'https://api.rss2json.com/v1/api.json?rss_url=' },
            { type: 'corsproxy', url: 'https://corsproxy.io/?url=' },
            { type: 'codetabs', url: 'https://api.codetabs.com/v1/proxy?quest=' },
            { type: 'allorigins', url: 'https://api.allorigins.win/get?url=' }
        ];

        let success = false;
        let parsedArticles = [];
        const now = new Date();
        const msIn24Hours = 48 * 60 * 60 * 1000;
        
        for (let proxy of proxies) {
            try {
                const response = await fetch(proxy.url + encodeURIComponent(source.url));
                if (!response.ok) throw new Error('HTTP error ' + response.status);
                
                if (proxy.type === 'feed2json') {
                    const data = await response.json();
                    if (!data || !data.items) throw new Error('feed2json error');
                    
                    for (let item of data.items) {
                        const title = item.title ? item.title.trim() : "";
                        const link = item.url ? item.url.trim() : "";
                        if (isPromotional(title, link)) continue;
                        
                        const pubDateStr = item.date_published || "";
                        const pubDate = pubDateStr ? new Date(pubDateStr) : null;
                        if (!pubDate || isNaN(pubDate.getTime()) || (now - pubDate) > msIn24Hours) continue;
                        
                        const author = item.author && item.author.name ? item.author.name.trim() : "";
                        
                        parsedArticles.push({
                            source: source.name,
                            sourceId: source.id,
                            title: title,
                            link: link,
                            pubDate: pubDate,
                            author: author
                        });
                    }
                } else if (proxy.type === 'rss2json') {
                    const data = await response.json();
                    if (data.status !== 'ok') throw new Error('rss2json error');
                    
                    for (let item of data.items) {
                        const title = item.title ? item.title.trim() : "";
                        const link = item.link ? item.link.trim() : "";
                        if (isPromotional(title, link)) continue;
                        
                        const pubDateStr = item.pubDate || "";
                        const pubDate = pubDateStr ? new Date(pubDateStr) : null;
                        if (!pubDate || isNaN(pubDate.getTime()) || (now - pubDate) > msIn24Hours) continue;
                        
                        parsedArticles.push({
                            source: source.name,
                            sourceId: source.id,
                            title: title,
                            link: link,
                            pubDate: pubDate,
                            pubDateString: pubDateStr,
                            author: item.author || '',
                            fetchTime: now
                        });
                    }
                } 
                else {
                    let xmlText = "";
                    if (proxy.type === 'allorigins') {
                        const data = await response.json();
                        xmlText = data.contents;
                        if (xmlText && xmlText.match(/^[A-Za-z0-9+/=\s]+$/) && !xmlText.includes('<')) {
                            try { xmlText = atob(xmlText); } catch(e) {}
                        }
                    } else {
                        xmlText = await response.text();
                    }
                    
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
                    
                    if (xmlDoc.querySelector('parsererror')) throw new Error('XML Parsing Error');

                    let items = Array.from(xmlDoc.querySelectorAll("item"));
                    if (items.length === 0) items = Array.from(xmlDoc.querySelectorAll("entry"));
                    if (items.length === 0) throw new Error('No RSS/Atom items found');
                    
                    for (let item of items) {
                        const titleNode = item.querySelector("title");
                        let linkNode = item.querySelector("link");
                        let authorNode = item.querySelector("creator") || item.querySelector("author");
                        
                        let link = "";
                        if (linkNode) {
                            link = linkNode.textContent.trim() ? linkNode.textContent.trim() : linkNode.getAttribute("href");
                        }
                        const title = titleNode ? titleNode.textContent.trim() : "";
                        const author = authorNode ? authorNode.textContent.trim() : "";
                        
                        if (isPromotional(title, link)) continue;

                        const pubDateNode = item.querySelector("pubDate") || item.querySelector("published") || item.querySelector("updated");
                        const pubDateStr = pubDateNode ? pubDateNode.textContent : "";
                        const pubDate = pubDateStr ? new Date(pubDateStr) : null;
                        
                        if (!pubDate || isNaN(pubDate.getTime()) || (now - pubDate) > msIn24Hours) continue;

                        parsedArticles.push({
                            source: source.name,
                            sourceId: source.id,
                            title: title,
                            link: link,
                            pubDate: pubDate,
                            pubDateString: pubDateStr,
                            author: author,
                            fetchTime: now
                        });
                    }
                }
                
                success = true;
                source.error = false;
                break; 
            } catch (err) {
                console.warn(`Proxy ${proxy.type} failed for ${source.name}`);
            }
        }
        
        if (!success) source.error = true;
        return parsedArticles;
    }

    // --- 4. Headline Clustering Algorithm ---
    function clusterArticles(pool) {
        let clusters = [];
        
        const heroPool = pool.filter(a => {
            if (a.category === 'Followed Authors') return false;
            
            const srcName = a.source.toLowerCase();
            const srcId = a.sourceId.toLowerCase();
            if (srcName.includes('opinion') || srcId.includes('opinion') ||
                srcName.includes('column') || srcId.includes('column') ||
                srcName.includes('commentary') || srcId.includes('commentary')) {
                return false;
            }
            return true;
        });

        heroPool.forEach(article => {
            article.keywords = tokenize(article.title, article.link);
            let bestCluster = null;
            let bestScore = -1;

            clusters.forEach(cluster => {
                let shared = 0;
                article.keywords.forEach(kw => {
                    if (cluster.keywords.has(kw)) shared++;
                });
                
                let minSize = Math.min(article.keywords.size, cluster.keywords.size);
                if (minSize > 0) {
                    let score = shared / minSize;
                    if (score > bestScore) {
                        bestScore = score;
                        bestCluster = cluster;
                    }
                }
            });

            if (bestScore >= 0.42) {
                bestCluster.articles.push(article);
                article.keywords.forEach(kw => bestCluster.keywords.add(kw));
            } else {
                clusters.push({
                    keywords: new Set(article.keywords),
                    articles: [article]
                });
            }
        });

        clusters.forEach(cluster => {
            cluster.sources = new Set(cluster.articles.map(a => a.source));
            cluster.newestTime = Math.max(...cluster.articles.map(a => a.pubDate.getTime()));
        });

        clusters.sort((a, b) => {
            if (a.sources.size !== b.sources.size) return b.sources.size - a.sources.size;
            return b.newestTime - a.newestTime;
        });

        return clusters;
    }

    // --- 5. Rendering Pipeline ---
    function formatTime(date) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }

    function renderTopStories() {
        const container = document.getElementById('top-stories-container');
        if (clusteredTopStories.length === 0) {
            container.innerHTML = '<div class="loading">No top stories available.</div>';
            return;
        }

        const bestCluster = clusteredTopStories[0];
        const bestSourceCount = bestCluster.sources.size;
        let displayClusters = [];

        if (bestSourceCount >= 2) {
            displayClusters = clusteredTopStories.filter(c => c.sources.size === bestSourceCount).slice(0, 3);
        } else {
            displayClusters = [bestCluster];
        }

        let html = '';
        displayClusters.forEach((cluster, idx) => {
            let repArticle = cluster.articles[0];
            cluster.articles.forEach(a => {
                if (repArticle.title.length - a.title.length > 20) {
                    repArticle = a;
                } else if (Math.abs(repArticle.title.length - a.title.length) <= 20) {
                    const repIndex = sources.findIndex(src => src.name === repArticle.source);
                    const aIndex = sources.findIndex(src => src.name === a.source);
                    if (aIndex !== -1 && (repIndex === -1 || aIndex < repIndex)) {
                        repArticle = a;
                    }
                }
            });

            const coveredByLinks = Array.from(cluster.sources).sort().map(s => {
                const articleForSource = cluster.articles.find(a => a.source === s);
                return `<a href="${articleForSource.link}" target="_blank" rel="noopener noreferrer">${s}</a>`;
            }).join(', ');

            if (idx === 0) {
                html += `
                    <div class="hero-article">
                        <h2><a href="${repArticle.link}" target="_blank" rel="noopener noreferrer">${repArticle.title}</a></h2>
                        <div class="hero-covered-by">
                            COVERED BY: ${coveredByLinks}
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="sub-hero-article" style="margin-top: 15px;">
                        <h3><a href="${repArticle.link}" target="_blank" rel="noopener noreferrer">${repArticle.title}</a></h3>
                        <div class="hero-covered-by">
                            COVERED BY: ${coveredByLinks}
                        </div>
                    </div>
                `;
            }
        });
        
        container.innerHTML = html;
    }

    function renderFollowedColumnists() {
        const container = document.getElementById('columnists-container');
        if (!container) return;
        
        let html = '';
        followedColumnists.forEach(colObj => {
            const matchedArticles = followedAuthorsArticles.filter(a => {
                const authorLower = a.author.toLowerCase();
                const titleLower = a.title.toLowerCase();
                const colLower = colObj.name.toLowerCase();
                return authorLower.includes(colLower) || titleLower.includes(colLower) || a.source === colObj.name;
            });
            
            if (matchedArticles.length > 0) {
                const latest = matchedArticles.sort((a, b) => b.pubDate - a.pubDate)[0];
                html += `
                    <div class="columnist-item">
                        <div class="columnist-name"><a href="${latest.link}" target="_blank" rel="noopener noreferrer">${colObj.name}</a></div>
                        <div class="columnist-status">${new Date(latest.pubDate).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</div>
                    </div>
                `;
            } else {
                const nameDisplay = colObj.url ? `<a href="${colObj.url}" target="_blank" rel="noopener noreferrer">${colObj.name}</a>` : colObj.name;
                html += `
                    <div class="columnist-item">
                        <div class="columnist-name">${nameDisplay}</div>
                        <div class="columnist-status" style="color: var(--text-muted);">No article today</div>
                    </div>
                `;
            }
        });
        container.innerHTML = html;
    }

    async function fetchCartoons() {
        try {
            const url = 'https://townhall.com/political-cartoons/';
            const response = await fetch("https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(url));
            if (!response.ok) throw new Error('Network response was not ok');
            const htmlText = await response.text();
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");
            
            const targetAuthors = ['Margolis & Cox', 'Jon Russo', 'Gary Varvel', 'Tom Stiglich', 'Henry Payne', 'AF Branco', 'Al Goodwyn'];
            const foundCartoons = {};
            const finalCartoons = [];
            
            const cards = doc.querySelectorAll('.thm-cartoon-card');
            cards.forEach(card => {
                const authorEl = card.querySelector('.app-cartoon-author');
                const imgEl = card.querySelector('.card-img-top img');
                const dateEl = card.querySelector('.date');
                const linkEl = card.querySelector('.app-cartoon-link');
                
                if (authorEl && imgEl) {
                    const authorName = authorEl.textContent.trim();
                    let authorHref = authorEl.getAttribute('href') || '';
                    if (authorHref && !authorHref.startsWith('http')) {
                        authorHref = 'https://townhall.com' + authorHref;
                    }
                    const imgSrc = imgEl.src;
                    const dateText = dateEl ? dateEl.textContent.trim() : '';
                    let href = linkEl ? linkEl.getAttribute('href') : '';
                    if (href && !href.startsWith('http')) {
                        href = 'https://townhall.com' + href;
                    }
                    
                    if (targetAuthors.includes(authorName) && !foundCartoons[authorName]) {
                        foundCartoons[authorName] = true;
                        finalCartoons.push({ author: authorName, authorLink: authorHref, src: imgSrc, date: dateText, link: href || 'https://townhall.com/political-cartoons/' });
                    }
                }
            });
            
            if (finalCartoons.length > 0) {
                const gridHtml = finalCartoons.map(c => `
                    <div style="text-align: center; display: flex; flex-direction: column;">
                        <a href="${c.link}" target="_blank" rel="noopener noreferrer" style="display: block; margin-bottom: 5px;">
                            <img src="${c.src}" alt="${c.author} Cartoon" style="width: 100%; height: auto; object-fit: contain; border: 1px solid var(--border-color); border-radius: 4px;">
                        </a>
                        <div style="font-family: var(--font-ui); font-size: 0.85rem; font-weight: 600; color: var(--header-red); margin-top: auto;">
                            <a href="${c.authorLink}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">${c.author}</a>
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); display: none;">${c.date}</div>
                    </div>
                `).join('');
                
                return `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">${gridHtml}</div>
                `;
            }
        } catch (error) {
            console.error('Error fetching cartoons:', error);
        }
        return `
            <div class="loading">Failed to load cartoons.</div>
        `;
    }

    async function fetchAllNews() {
        const lastRefreshElement = document.getElementById('last-refresh');
        const statusMessageElement = document.getElementById('status-message');

        const todayStr = new Date().toLocaleDateString('en-US');
        let collapsedState = JSON.parse(localStorage.getItem('pnd_collapsed_sources')) || { date: '', sources: [] };
        if (collapsedState.date !== todayStr) {
            collapsedState = { date: todayStr, sources: [] };
            localStorage.setItem('pnd_collapsed_sources', JSON.stringify(collapsedState));
        }

        statusMessageElement.textContent = "Fetching news...";
        allArticles = [];
        followedAuthorsArticles = [];
        
        document.getElementById('top-stories-container').innerHTML = '<div class="loading">Fetching latest top stories...</div>';
        
        const col1 = document.getElementById('col-1');
        const col2 = document.getElementById('col-2');
        const col3 = document.getElementById('col-3');
        const cartoonsEl = document.getElementById('cartoons-container');
        
        col1.innerHTML = '<div class="loading">Loading...</div>';
        col2.innerHTML = '<div class="loading">Loading...</div>';
        if (cartoonsEl) cartoonsEl.innerHTML = '<div class="loading">Loading cartoons...</div>';

        const columnistSources = followedColumnists.map(col => {
            let feedUrl = col.url;
            if (!feedUrl.endsWith('/feed') && !feedUrl.endsWith('/feed/') && !feedUrl.includes('.xml')) {
                feedUrl = feedUrl.replace(/\/$/, '') + '/feed/';
            }
            return {
                id: 'col_' + col.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
                name: col.name,
                url: feedUrl,
                enabled: true,
                column: 0,
                maxStories: 5
            };
        });

        const fetchPromises = [...sources, ...columnistSources].map(src => fetchRSS(src));
        const cartoonPromise = fetchCartoons();
        
        const results = await Promise.allSettled(fetchPromises);
        const cartoonHtmlResult = await cartoonPromise;
        
        if (cartoonsEl) cartoonsEl.innerHTML = cartoonHtmlResult;
        
        let rawPool = [];
        results.forEach(res => {
            if (res.status === 'fulfilled' && res.value) {
                rawPool = rawPool.concat(res.value);
            }
        });
        
        let seenUrls = new Map();
        let seenTitles = new Map();
        
        rawPool.forEach(a => {
            const normTitle = normalizeTitle(a.title);
            let existing = seenUrls.get(a.link) || seenTitles.get(normTitle);
            
            if (existing) {
                if (!existing.author && a.author) existing.author = a.author;
                if (!existing.pubDate && a.pubDate) existing.pubDate = a.pubDate;
            } else {
                allArticles.push(a);
                seenUrls.set(a.link, a);
                seenTitles.set(normTitle, a);
            }
        });
        
        const politicsKws = ['biden', 'trump', 'election', 'democrat', 'republican', 'congress', 'senate', 'white house', 'scotus', 'supreme court', 'campaign', 'voter'];
        const usKws = ['police', 'shooting', 'school', 'state', 'california', 'texas', 'florida', 'fbi', 'border', 'fema', 'judge', 'law'];
        const worldKws = ['ukraine', 'israel', 'gaza', 'china', 'russia', 'putin', 'europe', 'war', 'military', 'un', 'hamas', 'iran', 'palestine', 'macron', 'sunak', 'nato'];
        const bizKws = ['stock', 'market', 'inflation', 'fed', 'economy', 'ceo', 'company', 'bank', 'interest rate', 'wall street', 'tesla', 'amazon'];
        const techKws = ['apple', 'google', 'microsoft', 'ai', 'cyber', 'software', 'hardware', 'meta', 'facebook', 'openai', 'chatgpt', 'hacker'];
        
        allArticles.forEach(a => {
            const titleLower = a.title.toLowerCase();
            const authorLower = a.author.toLowerCase();
            const isFollowed = followedColumnists.some(col => authorLower.includes(col.name.toLowerCase()) || titleLower.includes(col.name.toLowerCase()) || a.source === col.name);
            
            if (isFollowed) {
                a.category = 'Followed Authors'; a.catPriority = 6;
            } else if (politicsKws.some(kw => titleLower.includes(kw))) {
                a.category = 'Politics'; a.catPriority = 1;
            } else if (usKws.some(kw => titleLower.includes(kw))) {
                a.category = 'U.S.'; a.catPriority = 2;
            } else if (worldKws.some(kw => titleLower.includes(kw))) {
                a.category = 'World'; a.catPriority = 3;
            } else if (bizKws.some(kw => titleLower.includes(kw))) {
                a.category = 'Business'; a.catPriority = 4;
            } else if (techKws.some(kw => titleLower.includes(kw))) {
                a.category = 'Tech'; a.catPriority = 5;
            } else {
                a.category = 'Other'; a.catPriority = 99;
            }
        });

        allArticles.sort((a, b) => {
            if (a.catPriority !== b.catPriority) return a.catPriority - b.catPriority;
            return b.pubDate - a.pubDate;
        });
        
        followedAuthorsArticles = allArticles.filter(a => a.category === 'Followed Authors');
        
        clusteredTopStories = clusterArticles(allArticles);
        
        col1.innerHTML = '';
        col2.innerHTML = '';
        
        Array.from(col3.children).forEach(child => {
            if (child.id !== 'cartoons-header' && child.id !== 'cartoons-container' && child.id !== 'columnists-header' && child.id !== 'columnists-container') {
                child.remove();
            }
        });
        
        renderTopStories();
        renderFollowedColumnists();
        
        sources.forEach(src => {
            if (!src.enabled) return;
            
            const sourceArticles = allArticles.filter(a => a.sourceId === src.id && !followedAuthorsArticles.includes(a));
            
            const isCollapsed = collapsedState.sources.includes(src.id);
            
            let siteUrl = '#';
            if (sourceArticles.length > 0) {
                try {
                    siteUrl = new URL(sourceArticles[0].link).origin;
                } catch(e) {}
            } else {
                try {
                    let hostname = new URL(src.url).hostname;
                    if (hostname.startsWith('feeds.') || hostname.startsWith('moxie.')) {
                        hostname = hostname.split('.').slice(1).join('.');
                    }
                    siteUrl = 'https://' + hostname;
                } catch(e) {}
            }

            let html = `
                <div class="column-header" style="margin-top: ${colHasContent(src.column) ? '30px' : '0'};">
                    <span class="col-indicator" data-source-id="${src.id}" style="cursor: pointer;">${isCollapsed ? '+' : '-'}</span>
                    <h2><a href="${siteUrl}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">${src.name.toUpperCase()}</a></h2>
                </div>
                <div class="feed-content" id="feed-${src.id}" style="display: ${isCollapsed ? 'none' : 'block'};">
            `;
            
            if (src.error) {
                html += '<div class="loading">Failed to load.</div>';
            } else if (sourceArticles.length === 0) {
                html += '<div class="loading">No articles in the last 48 hours.</div>';
            } else {
                let initialList = sourceArticles.slice(0, src.maxStories);
                let hiddenList = sourceArticles.slice(src.maxStories);
                
                html += initialList.map(article => `
                    <div class="feed-item">
                        <h4><a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a></h4>
                        <div class="feed-item-meta">
                            ${article.source} | ${formatTime(article.pubDate)}
                        </div>
                    </div>
                `).join('');
                
                if (hiddenList.length > 0) {
                    html += `<div class="hidden-stories" id="hidden-${src.id}" style="display: none;">`;
                    html += hiddenList.map(article => `
                        <div class="feed-item">
                            <h4><a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a></h4>
                            <div class="feed-item-meta">
                                ${article.source} | ${formatTime(article.pubDate)}
                            </div>
                        </div>
                    `).join('');
                    html += `</div>`;
                    html += `<button class="show-more-btn" data-target="${src.id}">+ ${hiddenList.length} more</button>`;
                }
            }
            html += `</div>`;
            
            if (src.column === 1) col1.innerHTML += html;
            else if (src.column === 2) col2.innerHTML += html;
            else if (src.column === 3) col3.innerHTML += html;
        });
        
        document.querySelectorAll('.show-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = e.target.getAttribute('data-target');
                const hiddenDiv = document.getElementById(`hidden-${targetId}`);
                if (hiddenDiv.style.display === 'none') {
                    hiddenDiv.style.display = 'block';
                    e.target.textContent = 'Show Less';
                } else {
                    hiddenDiv.style.display = 'none';
                    e.target.textContent = `+ ${hiddenDiv.children.length} more`;
                }
            });
        });

        document.querySelectorAll('.col-indicator').forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const targetId = e.target.getAttribute('data-source-id');
                if (!targetId) return;
                
                const feedDiv = document.getElementById(`feed-${targetId}`);
                const isCurrentlyCollapsed = (feedDiv.style.display === 'none');
                
                if (isCurrentlyCollapsed) {
                    feedDiv.style.display = 'block';
                    e.target.textContent = '-';
                    collapsedState.sources = collapsedState.sources.filter(id => id !== targetId);
                } else {
                    feedDiv.style.display = 'none';
                    e.target.textContent = '+';
                    if (!collapsedState.sources.includes(targetId)) {
                        collapsedState.sources.push(targetId);
                    }
                }
                localStorage.setItem('pnd_collapsed_sources', JSON.stringify(collapsedState));
            });
        });


        const now = new Date();
        lastRefreshElement.textContent = `Last refresh: ${now.toLocaleDateString()} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        statusMessageElement.textContent = "Ready";
    }

    function colHasContent(colNum) {
        if (colNum === 1) return document.getElementById('col-1').innerHTML.includes('feed-content');
        if (colNum === 2) return document.getElementById('col-2').innerHTML.includes('feed-content');
        if (colNum === 3) return document.getElementById('col-3').innerHTML.includes('feed-content');
        return false;
    }

    // Initial Fetch
    fetchAllNews();
});



