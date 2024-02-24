const express = require('express');
const router = express.Router();
const { studentSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const ExpressError = require('../utils/ExpressError');
const Student = require('../models/student');
const { isLoggedIn } = require('../middleware');

const validateStudent = (req, res, next) => {

    const { error } = studentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const students = await Student.find({});
    res.render('students/index', { students })
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('students/new');
})

router.post('/', validateStudent, isLoggedIn, catchAsync(async (req, res) => {
    //if (!req.body.student) throw new ExpressError('Invalid Student Data', 400);

    const student = new Student(req.body.student);
    await student.save();
    req.flash('success', 'Successfully Added a New Student');
    res.redirect(`/students/${student._id}`)
}))


router.get('/:id', catchAsync(async (req, res,) => {
    const student = await Student.findById(req.params.id)
    if (!student) {
        req.flash('error', 'Cannot Find the Student');
        return res.redirect('/students');
    }
    res.render('students/show', { student });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        req.flash('error', 'Cannot Edit the Student');
        return res.redirect('/students');
    }
    res.render('students/edit', { student });
}));


router.put('/:id', validateStudent, catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, { ...req.body.student });
    req.flash('success', 'Updated Successfully');
    res.redirect(`/students/${student._id}`)
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    req.flash('success', 'Student Deleted Successfully');
    res.redirect('/students');
}));

module.exports = router;