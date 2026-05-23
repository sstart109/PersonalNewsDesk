const url = 'https://news.google.com/rss/search?q=site:theamericanconservative.com+when:1d&hl=en-US&gl=US&ceid=US:en';
const proxy = 'https://api.codetabs.com/v1/proxy?quest=';
async function run() {
    const res = await fetch(proxy + encodeURIComponent(url));
    const text = await res.text();
    console.log(text.substring(0, 200));
}
run();
