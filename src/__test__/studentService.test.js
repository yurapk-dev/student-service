import {jest, beforeEach, describe, it, expect} from '@jest/globals';

const mockRepo = {
    createStudent: jest.fn(),
    findStudentById: jest.fn(),
    deleteStudent: jest.fn(),
    updateStudent: jest.fn(),
    findStudentsByName: jest.fn(),
    countStudentsByNames: jest.fn(),
    findStudentsByMinScore: jest.fn()
}

jest.unstable_mockModule('../repository/studentRepository.js', () => mockRepo)

const studentService = await import('../service/studentService.js')

beforeEach(() => {
    jest.clearAllMocks()

})

describe('studentService', () => {
    it('addStudent return false when student already exists', async () => {
        //Arrange
        mockRepo.findStudentById.mockResolvedValue({id: 1});
        // Act
        const result = await studentService.addStudent({
            id: 1,
            name: 'John',
            password: 'password'
        });
        //Assert
        expect(result).toBeFalsy()
        expect(mockRepo.createStudent).not.toHaveBeenCalled();
        expect(mockRepo.findStudentById).toHaveBeenCalledWith(1);
    })

    it('addStudent return true when student does not exists', async () => {
        //Arrange
        mockRepo.findStudentById.mockResolvedValue(null);
        // Act
        const result = await studentService.addStudent({
            id: 2,
            name: 'John',
            password: 'password'
        });
        //Assert
        expect(result).toBeTruthy()
        expect(mockRepo.createStudent).toHaveBeenCalledWith(
            {
                _id: 2,
                name: 'John',
                password: 'password'
            });
        expect(mockRepo.findStudentById).toHaveBeenCalledWith(2);
    })

        // ============= delete student test ===============
    it('deleteStudent returns deleted student', async () => {
        // Arrange
        const student = {id: 1, name: 'John'};
        mockRepo.deleteStudent.mockResolvedValue(student);

        // Act
        const result = await studentService.deleteStudent('1');

        // Assert
        expect(result).toEqual(student);
        expect(mockRepo.deleteStudent).toHaveBeenCalledWith(1);
        expect(mockRepo.deleteStudent).toHaveBeenCalledTimes(1);
    });

    it('deleteStudent returns null when student does not exist', async () => {
        // Arrange
        mockRepo.deleteStudent.mockResolvedValue(null);

        // Act
        const result = await studentService.deleteStudent('99');

        // Assert
        expect(result).toBeNull();
        expect(mockRepo.deleteStudent).toHaveBeenCalledWith(99);
        expect(mockRepo.deleteStudent).toHaveBeenCalledTimes(1);
    });

 // ================== updateStudent test ===================
    it('updateStudent returns updated student', async () => {
        // Arrange
        const data = {name: 'Jack'};
        const student = {id: 1, name: 'Jack'};
        const toObject = jest.fn().mockReturnValue(student);
        mockRepo.updateStudent.mockResolvedValue({toObject});

        // Act
        const result = await studentService.updateStudent('1', data);

        // Assert
        expect(mockRepo.updateStudent).toHaveBeenCalledWith(1, data);
        expect(toObject).toHaveBeenCalledTimes(1);
        expect(result).toEqual(student);
    });

    it('updateStudent returns null when student does not exist', async () => {
        // Arrange
        const data = {name: 'Jack'};
        mockRepo.updateStudent.mockResolvedValue(null);

        // Act
        const result = await studentService.updateStudent('99', data);

        // Assert
        expect(result).toBeNull();
        expect(mockRepo.updateStudent).toHaveBeenCalledWith(99, data);
    });
})

