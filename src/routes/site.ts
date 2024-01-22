import { Router } from "express";
import { EventsController, PeopleController } from "../controllers";

const router = Router();

router.get("/ping", (req, res) => res.json({ pong: true }));

router.get("/events/:id", EventsController.getEvent);
router.get("/events/:id_event/search", PeopleController.searchPerson);

export default router;
