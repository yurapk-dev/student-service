import * as repo from '../repository/studentRepository.js'

const renameId = student => {
    if (!student) return student;
    const {_id, ...data} = student;
    return {id: _id, ...data};
};

export const addStudent = async student => {
    return repo.createStudent(student)
}

export const findStudent = async id => renameId(await repo.findStudentsById(+id));


export const deleteStudent = async id => renameId(await repo.deleteStudent(+id));

export const updateStudent = async (id, data) => renameId(await repo.updateStudent(+id, data));

export const addScore = async (id, examName, score) => await repo.updateStudent(+id, {[`scores.${examName}`]: score});

export const findStudentsByName = async name => (await repo.findStudentsByName(name)).map(renameId);

export const countStudentsByNames = async names => await repo.countStudentsByNames(names);

export const findStudentsByMinScore = async (exam, minScore) => (await repo.findStudentsByMinScore(exam, +minScore)).map(renameId);

