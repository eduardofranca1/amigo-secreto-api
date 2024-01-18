import { Router } from "express";
import * as auth from "../controllers/auth";
import EventsController from "../controllers/events";
import { authenticate } from "../middlewares/authenticate";
import { GroupsController } from "../controllers";

const router = Router();

router.post("/admin/login", auth.login);

router.get("/admin/ping", authenticate, (req, res) =>
  res.json({ pong: true, admin: true })
);

router.post("/admin/events", authenticate, EventsController.create);
router.get("/admin/events", authenticate, EventsController.getAll);
router.get("/admin/events/:id", authenticate, EventsController.getEvent);
router.put("/admin/events/:id", authenticate, EventsController.update);
router.delete("/admin/events/:id", authenticate, EventsController.delete);

router.get(
  "/admin/events/:id_event/groups",
  authenticate,
  GroupsController.getAll
);
router.get(
  "/admin/events/:id_event/groups/:id",
  authenticate,
  GroupsController.getGroup
);

export default router;
