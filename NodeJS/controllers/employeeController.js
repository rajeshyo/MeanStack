const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const cloudinary = require('cloudinary')

var { Employee } = require('../models/employee');
const upload = require('../handlers/multer');
require('../handlers/cloudinary');

// => localhost:3000/employees/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

// router.post('/',  upload.single('image'),async(req, res) => {
//     const result = await cloudinary.v2.uploader.upload(req.file.path)
//     // router.post('/',  (req, res) => {
//     var emp = new Employee({
//         name: req.body.name,
//         position: req.body.position,
//         office: req.body.office,
//         salary: req.body.salary,
//         a: req.body.a,
//         image: image = result.secure_url
//     });
//     await emp.save((err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

router.post('/', upload.single('image'), async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const blog = new Employee()
    blog.name = req.body.name
    blog.position = req.body.position
    blog.office = req.body.office
    blog.salary = req.body.salary
    blog.imageUrl = result.secure_url
    await blog.save()
    res.send(blog);
  res.end();
  })

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
        imageUrl: req.body.imageUrl,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;