const pino = require('pino')
const express = require('express')
const config = require('./lib/config')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
require('express-async-errors')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function main () {
  const port = 8080
  const logger = pino({ name, level: 'info' }).child({
    appVersion: version,
    env: process.env.STAGE
  });

  const app = express();
  app.use(require('cors')());
  app.use(bodyParser.json());

  app.post('/benchmark', async (req, res) => {
    logger.info("Recieved request");
    const { model, batchSize, coresNum } = req.body;

    let benchmarkTimes = [];
    for (let platform in config) {
        const benchmarkConfig = (config[platform] || {})[model]
        if (!benchmarkConfig) {
          logger.debug({ platform, model, batchSize, coresNum }, 'couldnt find benchmark configurations')
          return res.send("-1").end();
        };
    
        const time = benchmarkConfig * parseInt(batchSize) * parseInt(coresNum);
        const benchmarkTime = time * (0.9 + (0.2 * Math.random()));
        
        //Wait time to simulate test
        await sleep(benchmarkTime);
        //Add benchmark time-result
        benchmarkTimes.push(benchmarkTime);
    }

    res.send(benchmarkTimes).end();
  });

  app.use((err, req, res, next) => {
    logger.error(err, 'error while trying to handle request')
    res.status(500).end()
  });

  return new Promise(function (resolve, reject) {
    const server = app.listen(port, () => {
      logger.info('listening on port ' + port)
      resolve(server)
    }).on('error', reject)
  });
};


main();