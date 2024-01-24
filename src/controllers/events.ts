import { RequestHandler } from "express";
import { EventsService, PeopleService } from "../services";
import { z } from "zod";

class EventsController {
  create: RequestHandler = async (req, res) => {
    try {
      const createEventSchema = z.object({
        title: z.string(),
        description: z.string(),
        grouped: z.boolean(),
      });

      const body = createEventSchema.safeParse(req.body);

      if (!body.success) {
        return res.status(400).json({ error: body.error.issues });
      }

      const item = await EventsService.create(body.data);
      if (item) return res.status(201).json({ event: item });
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  getAll: RequestHandler = async (req, res) => {
    try {
      const items = await EventsService.getAll();
      if (items) return res.json({ events: items });
      res.json({ error: "An error has occurred" });
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  getEvent: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await EventsService.getOne(Number(id));
      res.json({ event: item });
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  update: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const updateEventSchema = z.object({
        status: z.boolean().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        grouped: z.boolean().optional(),
      });

      const body = updateEventSchema.safeParse(req.body);
      if (!body.success) return res.json({ error: body.error.issues });

      const updatedEvent = await EventsService.updateEvent(
        Number(id),
        body.data
      );
      if (updatedEvent) {
        if (updatedEvent.status) {
          // fazer o sorteio
          const result = await EventsService.doMatches(Number(id));
          if (!result) {
            return res.json({ error: "Groups impossible to raffle" });
          }
        } else {
          // limpar o sorteio
          await PeopleService.update({ id_event: Number(id) }, { matched: "" });
        }
        return res.json({ event: updatedEvent });
      }
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  delete: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      await EventsService.delete(Number(id));
      res.status(204).json("Event deleted");
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };
}

export default new EventsController();
