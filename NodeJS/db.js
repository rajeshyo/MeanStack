const mongoose = require('mongoose');

mongoose.connect('mongodb://test:r25071995@ds145895.mlab.com:45895/testing', (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;