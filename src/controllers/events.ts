import { RequestHandler } from "express";
import { EventsService } from "../services";
import { z } from "zod";

class EventsController {
  create: RequestHandler = async (req, res) => {
    const createEventSchema = z.object({
      title: z.string(),
      description: z.string(),
      grouped: z.boolean(),
    });

    const body = createEventSchema.safeParse(req.body);

    if (!body.success) {
      return res.json({ error: body.error.issues });
    }

    const item = await EventsService.create(body.data);
    if (item) return res.status(201).json({ event: item });
    res.json({ error: "An error has occurred" });
  };

  getAll: RequestHandler = async (req, res) => {
    const items = await EventsService.getAll();
    if (items) return res.json({ events: items });
    res.json({ error: "An error has occurred" });
  };

  getEvent: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await EventsService.getOne(Number(id));
      res.json({ event: item });
    } catch (error: any) {
      res.json(error.message);
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

      if (updatedEvent.status) {
        // fazer o sorteio
      } else {
        // limpar o sorteio
      }

      res.json({ event: updatedEvent });
    } catch (error: any) {
      res.json(error.message);
    }
  };

  delete: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await EventsService.delete(Number(id));
      res.json({ event: result });
    } catch (error: any) {
      res.json(error.message);
    }
  };
}

export default new EventsController();
