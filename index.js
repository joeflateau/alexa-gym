let alexa = require('alexa-app');

let getTodaysStreams = require('./collegegymfans.js').getTodaysStreams;

function setup(name) {
  let app = new alexa.app(name);
   
  app.intent('ListStreamsCommand', function(request,response) {
    getTodaysStreams()
      .then((streams) => {
        let streamText = streams.map(stream => {
          let { title, time } = stream;
          return `<s>${title} <break /> at ${time}.</s>`;
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