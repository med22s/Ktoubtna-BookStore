const  app              = require('./config/express');
const  {dbConnection}   = require('./config/db.js');
const config            = require('./config/config');


// open mongoose connection
dbConnection();

// listen to requests
app.listen(config.serverPort, () =>  {
        console.log(`server started on port ${config.serverPort} (${config.nodeEnv})`);
    }
);
