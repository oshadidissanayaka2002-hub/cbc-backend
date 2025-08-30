import Student from "../models/student.js"

export function getStudents (req,res){

    Student.find().then(
        (studentList)=>{[
            res.json({
                list : studentList 
            })
        ]}
    )
}

export function createStudent(req,res){

    const student = new Student(req.body)
    student.save().then(()=>{
        res.json({
            message: "Student create"
        })
    })
    
}

export function deleteStudent(req,res){

    Student.deleteOne({name : req.body.name}).then(
        ()=>{
            ews.json({
                message : "Student deleted successfullt"
            }

            )
        }
    )
}