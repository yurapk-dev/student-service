import Student from "../model/student.js";

const students = new Map();

export const createStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(id, new Student(id, name, password));
    return true;
}

export const findStudentsById = id => students.get(id);

export const deleteStudent = id => {
    const student = students.get(id);
    if (!student) {
        return undefined;
    }
    students.delete(id);
    return student;
};

export const updateStudent = (id, {name, password}) => {
    const student = students.get(id);
    if (!student) {
        return undefined;
    }
    if (name !== undefined) {
        student.name = name;
    }
    if (password !== undefined) {
        student.password = password;
    }
    return student;
};

export const addScore = (id, examName, score) => {
    const student = students.get(id);
    if (!student) {
        return false;
    }
    student.scores[examName] = score;
    return true;
};

export const findStudentsByName = name => {
    const result = [];
    for (const student of students.values()) {
        if (student.name.toLowerCase() === name.toLowerCase()) {
            result.push(student);
        }
    }
    return result;
};

export const countStudentsByNames = names => {
    let count = 0;
    for (const student of students.values()) {
        if (names.some(name => name.toLowerCase() === student.name.toLowerCase())) {
            count++;
        }
    }
    return count;
};

export const findStudentsByMinScore = (exam, minScore) => {
    return Array.from(students.values()).filter(
        student => +student.scores[exam] >= +minScore
    );
};



