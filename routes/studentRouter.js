import express from "express";
import { getStudents , createStudent , deleteStudent} from "../control/studentControlers.js";

const studentRouter = express.Router();

studentRouter.get("/",getStudents)
studentRouter.post("/",createStudent)
studentRouter.delete("/",deleteStudent)


export default studentRouter;