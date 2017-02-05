let cheerio = require('cheerio');
let rp = require('request-promise');
let URI = require('urijs');

let debug = require('debug')('alexa-gym:collegegymfans');

let moment = require('moment');

let offsets = {
  "ET":0,
  "CT":1,
  "MT":2,
  "PT":3
};

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
      let [ relativeTime, zone ] = time.split(" ");
      
      debug(zone);
      if (offsets.hasOwnProperty(zone)) {
        relativeTime = moment(relativeTime, 'H:mm Z').add(offsets[zone], 'hours').format('H:mm');
      } 

      let site = URI(streamUrl).hostname().replace(/^www[.]/i, "");
      let title = $(tds[0]).text();

      let object = ({
        title: title,
        time: relativeTime,
        site: site
      });

      return object;
    });
    return grid;
  });
}

module.exports = {
  getTodaysStreams: getTodaysStreams
};