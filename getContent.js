const scrapy = require('node-scrapy');
const fetch = require('node-fetch');
const qs = require('querystring');
const fs = require('fs');

const get = async (url) => {
    console.log(`getting ${decodeURI(url)}`);
    return await (await fetch(encodeURI(url))).text();
};

const baseUrl = 'https://teenslang.su';

const pagesData = JSON.parse(fs.readFileSync("links.json"));

(async () => {
    for (let abcPage of pagesData) {
        for (let paginationPage = 1; paginationPage <= abcPage.pages; paginationPage++) {
            const words = scrapy.extract(await get(`${baseUrl}/?page=${paginationPage}&content=${abcPage.content}*`), ['.cap[itemprop=term] => $textContent']);
            fs.appendFileSync("words.txt", `${words.join("\n")}\n`)
        }
    }
})();
