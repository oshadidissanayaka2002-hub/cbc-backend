import express from "express";
import { createProduct, getProduct } from "../control/productControlers.js";

const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProduct)

export default productRouter;