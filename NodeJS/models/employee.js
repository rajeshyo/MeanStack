const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    // name: { type: String },
    // position: { type: String },
    // office: { type: String },
    // salary: { type: String },
    // a: {type: String},
    // image: { type: String }

    name: {
        type: String,
        required: 'Name is Required'
      },
      position: {
        type: String,
        required: 'position is Required'
      },
      office: {
        type: String,
        required: 'office is Required'
      },
      salary: {
        type: String,
        required: 'salary is Required'
      },
      imageUrl: {
        type: String
      }
    
});

module.exports = { Employee };