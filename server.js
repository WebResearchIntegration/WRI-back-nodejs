const express    = require('express'),
      bodyParser = require('body-parser'),
      cors       = require('cors'),
      config     = require('./config'),
      app        = express();

const port = config.PORT;

app.use(bodyParser({extended: false}));

require('./routes')(app);

app.listen(port, () => {
    console.log("WRI API - Available on port 3000");
});