import express from "express";
import { getDashboard, getSummary } from "../controllers/general.js";

const router = express.Router();

router.get("/dashboard", getDashboard);

router.get('/summary', getSummary);

export default router;