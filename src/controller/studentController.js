import * as service from '../service/studentService.js'

const sendNotFound = (req, res) => {
    return res.status(404).send({
        "timestamp": new Date().toISOString(),
        "status": 404,
        "error": "Not Found",
        "message": `Student with id ${req.params.id} not found`,
        "path": req.path
    });
};

export const addStudent = async (req, res) => {
    const success = await service.addStudent(req.body);
    if (success) {
        return res.status(204).send();
    } else {
        return res.status(409).send()
    }
}
export const findStudent = async (req, res) => {
    const student = await service.findStudent(req.params.id);
    if (student) {
        return res.json(student);
    } else {
        return sendNotFound(req, res);
    }
}

export const deleteStudent = async (req, res) => {
    const student = await service.deleteStudent(req.params.id);
    if (student) {
        return res.status(200).json(student);
    } else {
        return sendNotFound(req, res);
    }
}

export const updateStudent = async (req, res) => {
    const student = await service.updateStudent(req.params.id, req.body);
    if (student) {
        const {id, name, password} = student;
        return res.status(200).json({id, name, password});
    } else {
        return sendNotFound(req, res);
    }
}

export const addScore = async (req, res) => {
    const {examName, score} = req.body;
    const success = await service.addScore(req.params.id, examName, score);
    if (success) {
        return res.status(204).send();
    } else {
        return sendNotFound(req, res);
    }
}

export const findStudentsByName = async (req, res) => {
    const students = await service.findStudentsByName(req.params.name);
    return res.status(200).json(students);
}

export const countStudentsByNames = async (req, res) => {
    const {names} = req.query;
    if (!names) return res.status(200).json(0);
    const namesArray = Array.isArray(names) ? names : [names];
    const countStudents = await service.countStudentsByNames(namesArray);
    return res.status(200).json(countStudents);
};

export const findStudentsByMinScore = async (req, res) => {
    const {exam, minScore} = req.params
    const students = await service.findStudentsByMinScore(exam, minScore);
    return res.status(200).json(students);
}

