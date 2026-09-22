import * as repo from '../repository/studentRepository.js'

const withoutPassword = student => {
    const {password, ...studentWithoutPassword} = student;
    return studentWithoutPassword;
};

export const addStudent = async student => {
    return repo.createStudent(student)
}

export const findStudent = async id => {
    const student = repo.findStudentsById(+id);
    return student ? withoutPassword(student) : undefined;
}

export const deleteStudent = async id => {
    const student = repo.deleteStudent(+id);
    return student ? withoutPassword(student) : undefined;
}

export const updateStudent = async (id, data) => {
    return repo.updateStudent(+id, data);
}

export const addScore = async (id, examName, score) => {
    return repo.addScore(+id, examName, score);
}

export const findStudentsByName = async name => {
    return repo.findStudentsByName(name).map(withoutPassword);
}

export const countStudentsByNames = async names => {
    return repo.countStudentsByNames(names);
};

export const findStudentsByMinScore = async (exam, minScore) => {
    return repo.findStudentsByMinScore(exam, minScore).map(withoutPassword);
}

