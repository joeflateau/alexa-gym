let alexa = require('alexa-app');

let getTodaysStreams = require('./collegegymfans.js').getTodaysStreams;

function setup(name) {
  let app = new alexa.app(name);
   
  app.intent('ListStreamsCommand', function(request,response) {
    getTodaysStreams()
      .then((streams) => {
        let streamText = streams.map(stream => {
          let { title, time, site } = stream;
          let [ relativeTime, zone ] = time.split(" ");
          return `<s>${title} <break /> at ${relativeTime} <say-as interpret-as="spell-out">${zone}</say-as> <break /> on ${site}.</s>`;
        }).join("\n");

        response.say(`<p>There are ${streams.length || 'no'} streams today.</p>\n${streamText}`);
        response.send();
      })
      .catch(err => {
        console.error(err);
      });
      return false;
    }
  );

  return app;
}

module.exports = setup;