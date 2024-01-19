import { Router } from "express";
import * as auth from "../controllers/auth";
import { authenticate } from "../middlewares/authenticate";
import {
  EventsController,
  GroupsController,
  PeopleController,
} from "../controllers";

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

router.post(
  "/admin/events/:id_event/groups",
  authenticate,
  GroupsController.create
);
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
router.put(
  "/admin/events/:id_event/groups/:id",
  authenticate,
  GroupsController.update
);
router.delete(
  "/admin/events/:id_event/groups/:id",
  authenticate,
  GroupsController.delete
);

router.post(
  "/admin/events/:id_event/groups/:id_group/people",
  authenticate,
  PeopleController.create
);
router.get(
  "/admin/events/:id_event/groups/:id_group/people",
  authenticate,
  PeopleController.getAll
);
router.get(
  "/admin/events/:id_event/groups/:id_group/people/:id",
  authenticate,
  PeopleController.getOne
);
router.put(
  "/admin/events/:id_event/groups/:id_group/people/:id",
  authenticate,
  PeopleController.update
);
router.delete(
  "/admin/events/:id_event/groups/:id_group/people/:id",
  authenticate,
  PeopleController.delete
);

export default router;
