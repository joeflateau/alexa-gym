let alexa = require('alexa-app');

let getTodaysStreams = require('./collegegymfans.js').getTodaysStreams;

let wrapAbbreviations = (title) => title.replace(/[A-Z]{2,}/g, "<say-as interpret-as='characters'>$&</say-as>");

function setup(name) {
  let app = new alexa.app(name);

  function sayStreams(response){
    return getTodaysStreams()
      .then((streams) => {
        let streamText = streams.map(stream => {
          let { title, time } = stream;
          title = wrapAbbreviations(title);
          return `<s>${title} <break /> at ${time}.</s>`;
        }).join("\n");

        response.say(`<p>There are ${streams.length || 'no'} streams today.</p>\n${streamText}`);
        response.send();
      })
      .catch(err => {
        console.error(err);
      });
  }
   
  app.launch(function(request,response) {
      sayStreams(response);
      return false;
    }
  );
   
  app.intent('ListStreamsCommand', function(request,response) {
      sayStreams(response);
      return false;
    }
  );

  return app;
}

module.exports = setup;