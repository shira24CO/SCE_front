export type Student = {
    name: string,
    id: string,
    imgUrl: string
}

const data: Student[] = [
];

const getAllStudents = (): Student[] => {
    return data;
}

const getStudent = (id: string): Student | undefined => {
    return data.find((student) => student.id == id);
}

const addStudent = (student: Student) => {
    data.push(student);
}

const deleteStudent = (id: string) => {
    const index = data.findIndex((student) => student.id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

export default { getAllStudents, getStudent, addStudent, deleteStudent };