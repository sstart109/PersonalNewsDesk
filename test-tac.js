const url = 'https://feeds.townhall.com/Townhall/Latest';
const proxy = 'https://corsproxy.io/?url=';
async function run() {
    try {
        const res = await fetch(proxy + encodeURIComponent(url), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            }
        });
        const text = await res.text();
        console.log("Status:", res.status);
        console.log("Text:", text.substring(0, 200));
    } catch (e) {
        console.log(e);
    }
}
run();
