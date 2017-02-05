let cheerio = require('cheerio');
let rp = require('request-promise');
let URI = require('urijs');

function getTodaysStreams(){
  return rp({
    uri:'https://www.collegegymfans.com/',
    gzip: true
  })
  .then(function(resp){
    let $ = cheerio.load(resp);
    let tableRows = $('#rt-showcase > div.rt-grid-6.rt-alpha > div > div > div.module-content > div > table > tbody > tr');
    let grid = tableRows.get().slice(2).map(tr => {
      let tds = $(tr).children().get();
      let streamUrl = $(tds[3]).find("a").attr("href");
      let time = $(tds[1]).text();
      let object = ({
        title: $(tds[0]).text(),
        time: time,
        site: URI(streamUrl).hostname().replace(/^www[.]/i, "")
      });
      return object;
    });
    return grid;
  });
}

module.exports = {
  getTodaysStreams: getTodaysStreams
};