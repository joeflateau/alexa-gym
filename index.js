let alexa = require('alexa-app');

let getTodaysStreams = require('./collegegymfans.js').getTodaysStreams;

function setup(name) {
  let app = new alexa.app(name);
   
  app.intent('ListStreamsCommand', function(request,response) {
    getTodaysStreams()
      .then((streams) => {
        let streamText = streams.map(stream => `${stream.title} at ${stream.time} on ${stream.site}`).join(". ");
        response.say(`There are ${streams.length || 'no'} streams today. ${streamText}`);
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