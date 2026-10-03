import Student from "../model/student.js";


let collection;

export const init = db => collection = db.collection('college');

export const createStudent = async ({id, name, password}) => {
    const existingStudent = await collection.findOne({_id: id});
    if (existingStudent) {
        return false;
    }
    await collection.insertOne({_id: id, name, password, scores: {}});
    return true;
}

export const findStudentsById = async id => await collection.findOne({_id: id}, {projection: {password: 0}})

export const deleteStudent = async id => await collection.findOneAndDelete({_id: id}, {projection: {password: 0}})


export const updateStudent = async (id, data) => await collection.findOneAndUpdate({_id: id},
    {$set: data}, {projection: {scores: 0}, returnDocument: 'after'})

export const findStudentsByName = async name => await collection.find({name: {$regex: `^${name}$`, $options: 'i'}},
    {projection: {password: 0}}).toArray();

export const countStudentsByNames = async names => {
    if (names.length === 0) return 0;
    return await collection.countDocuments({
        $or: names.map(name => ({name: {$regex: `^${name}$`, $options: 'i'}}))
    });
}

export const findStudentsByMinScore = async (exam, minScore) => await collection.find({[`scores.${exam}`]: {$gte: minScore}}, {projection: {password: 0}}).toArray();




