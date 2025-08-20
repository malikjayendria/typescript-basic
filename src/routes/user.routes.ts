import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize";

const router = Router();

router.use(authenticate);

router.get("/", authorize(["admin", "superadmin"]), UserController.getAll);
router.get("/:id", authorize(["admin", "superadmin"]), UserController.getById);

router.post("/", authorize(["superadmin"]), UserController.create);
router.put("/:id", authorize(["superadmin"]), UserController.update);
router.delete("/:id", authorize(["superadmin"]), UserController.delete);

export default router;
