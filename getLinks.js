const scrapy = require('node-scrapy');
const fetch = require('node-fetch');
const qs = require('querystring');
const fs = require('fs');

const get = async (url) => {
    console.log(`getting ${decodeURI(url)}`);
    return await (await fetch(url)).text();
};

const baseUrl = 'https://teenslang.su';

const result = [];

(async () => {
    for (let abcPage of scrapy.extract(await get(baseUrl), ['.alph_menu => href'])) {
        const abcSection = {content: decodeURI(abcPage).substr(-1)};
        const paginationLinks = scrapy.extract(await get(`${baseUrl}/${abcPage}`), ['.page_number => href']);
        abcSection.pages = paginationLinks ? parseInt(qs.parse(paginationLinks[paginationLinks.length - 2]).page) : 1;
        result.push(abcSection);
    }
    fs.writeFileSync("links.json", JSON.stringify(result, null, 4));
})();

