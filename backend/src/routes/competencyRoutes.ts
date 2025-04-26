import { Router } from "express";
import { CompetencyController } from "../controllers/CompetencyController";

const router = Router();
const controller = new CompetencyController();

router.get("/student/:studentId/next", (req, res) => controller.getNextCompetency(req, res));
router.get("/student/:studentId/competencies/:competencyId/questions", (req, res) => controller.getQuestions(req, res));
router.post("/student/:studentId/competencies/:competencyId/answers", (req, res) => controller.submitAnswers(req, res));
router.get("/student/:studentId/competencies/:competencyId/mastery", (req, res) => controller.getMasteryLevel(req, res));
router.put("/student/:studentId/competencies/:competencyId/mastery", (req, res) => controller.updateMasteryLevel(req, res));

export default router; 