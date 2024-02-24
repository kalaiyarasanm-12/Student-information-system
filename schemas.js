const Joi = require('joi');

module.exports.studentSchema = Joi.object({
    student: Joi.object({
        name: Joi.string().required(),
        batchno: Joi.number().required().min(0),
        username: Joi.number().required().min(0),
        department: Joi.string().required(),
        address: Joi.string().required(),
        dob: Joi.date().required(),
        gender: Joi.string().required(),
        admissionNumber: Joi.number().required().min(0),
        mobileNumber: Joi.number().required().min(0),
        attendance: Joi.number().required().min(0),
        eventName: Joi.string().required(),
        eventDate: Joi.date().required(),
        subject1: Joi.string().required(),
        mark1: Joi.number().required().min(0),
        subject2: Joi.string().required(),
        mark2: Joi.number().required().min(0),
        subject3: Joi.string().required(),
        mark3: Joi.number().required().min(0),
        subject4: Joi.string().required(),
        mark4: Joi.number().required().min(0),
        subject5: Joi.string().required(),
        mark5: Joi.number().required().min(0),
        subject6: Joi.string().required(),
        mark6: Joi.number().required().min(0)
    }).required()
})
