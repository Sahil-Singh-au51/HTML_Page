const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const studentRouter = require("./routers/student")

const app = express();
const port = process.env.PORT || 8000;
// process.env.PORT(it is used when we deploy it on any server like horeku) or else it run on localhost 3000


app.use(express.json());
app.use(studentRouter);
// app.get("/",(req,res)=>{
//     res.send("hello from the other sides by Sahil Singh.");
// })
// create a new student
//by using promise
// app.post("/students",(req,res)=>{
//     console.log(req.body);
// const user = new Student(req.body);
// user.save().then(()=>{
//     res.status(201).send(user);
// }).catch((e)=>{
//     res.status(400).send(e);
// })    
// })
//by using async-await
// app.post("/students", async (req, res) => {
//     try {
//         const user = new Student(req.body);

//         const createUser = await user.save();
//         res.status(201).send(createUser);
//     } catch (e) { res.status(400).send(e); }
// })

//read the data of registered students
// app.get("/students", async (req, res) => {
//     try {
//         const studentsData = await Student.find();
//         res.send(studentsData);
//     } catch (e) {
//         res.send(e);
//     }
// })
// get individual student data using id
// app.get("/students/:id", async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const studentData = await Student.findById(_id);
//         if (!studentData) {
//             return res.status(404).send();
//         } else {
//             res.send(studentData);
//         }
//     } catch (e) {
//         res.status(500).send(e);
//     }
// })

//delete the students by it id
// app.delete("/students/:id", async (req, res) => {
//     try {
//         const deleteStudent = await Student.findByIdAndDelete(req.params.id);
//         if (!req.params.id) {
//             return res.status(400).send();
//         }
//         res.send(deleteStudent);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// })
// update the students by it id
// app.patch("/students/:id", async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const updateStudents = await Student.findByIdAndUpdate(_id, req.body,{new : true});
//         res.send(updateStudents);
//     } catch (e) {
//         res.status(404).send(e);
//     }
// })

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})