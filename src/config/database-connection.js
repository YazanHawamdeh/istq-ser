const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err, result) => {
  err ? console.log(`ERROR: database connection err`) : console.log('CONNECTED TO DB');
});
