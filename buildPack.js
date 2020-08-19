const fs = require('fs');


const words = fs.readFileSync("words.txt", "utf8").split("\n");

fs.writeFileSync("Сленг.json", JSON.stringify({
    wordList: [...(new Set(words.map((it) => it.charAt(0).toUpperCase() + it.slice(1))))],
    author: "churuya",
    packName: "Сленг"
}, null, 4));
