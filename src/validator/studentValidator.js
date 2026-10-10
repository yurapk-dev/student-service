import Joi from 'joi';

export const addStudentSchema = Joi.object({
    id: Joi.number().required().integer().positive(),
    name: Joi.string().required().min(3).max(15),
    password: Joi.string().required().min(3).max(15),
});
export const updateStudentSchema = Joi.object({
    name: Joi.string(),
    password: Joi.string()
});
export const scoreSchema = Joi.object({
    examName: Joi.string().required(),
    score: Joi.number().required().integer().positive().min(0).max(100)
});