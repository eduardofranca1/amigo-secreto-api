import { RequestHandler } from "express";
import { PeopleService } from "../services";
import { z } from "zod";
import { decryptMatch } from "../utils/match";

class PeopleController {
  create: RequestHandler = async (req, res) => {
    try {
      const { id_event, id_group } = req.params;

      const createPersonSchema = z.object({
        name: z.string(),
        cpf: z.string().transform((value) => value.replace(/\.|-/gm, "")),
      });
      const body = createPersonSchema.safeParse(req.body);
      if (!body.success) {
        return res.status(400).json({ error: body.error.issues });
      }
      const result = await PeopleService.create({
        id_event: Number(id_event),
        id_group: Number(id_group),
        name: body.data.name,
        cpf: body.data.cpf,
      });
      res.status(201).json({ person: result });
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  getAll: RequestHandler = async (req, res) => {
    try {
      const { id_event, id_group } = req.params;
      const result = await PeopleService.getAll({
        id_event: Number(id_event),
        id_group: !isNaN(Number(id_group)) ? Number(id_group) : undefined,
      });
      res.json({ people: result });
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  getOne: RequestHandler = async (req, res) => {
    try {
      const { id_event, id_group, id } = req.params;
      const result = await PeopleService.getOne({
        id_event: Number(id_event),
        id_group: !isNaN(Number(id_group)) ? Number(id_group) : undefined,
        id: !isNaN(Number(id)) ? Number(id) : undefined,
      });
      res.json(result);
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  searchPerson: RequestHandler = async (req, res) => {
    try {
      const { id_event } = req.params;

      const searchPersonSchema = z.object({
        cpf: z.string().transform((value) => value.replace(/\.|-/gm, "")),
      });

      const query = searchPersonSchema.safeParse(req.query);
      if (!query.success) {
        return res.status(400).json({ error: query.error.issues });
      }

      const personItem = await PeopleService.getOne({
        id_event: Number(id_event),
        cpf: query.data.cpf,
      });

      if (personItem && personItem.matched) {
        const matchId = decryptMatch(personItem.matched);

        const personMatched = await PeopleService.getOne({
          id_event: Number(id_event),
          id: matchId,
        });

        return res.json({
          person: {
            id: personItem.id,
            name: personItem.name,
          },
          personMatched: {
            id: personMatched.id,
            name: personMatched.name,
          },
        });
      }
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  update: RequestHandler = async (req, res) => {
    try {
      const { id, id_event, id_group } = req.params;
      const updatePersonSchema = z.object({
        name: z.string().optional(),
        cpf: z
          .string()
          .transform((value) => value.replace(/\.|-/gm, ""))
          .optional(),
        matched: z.string().optional(),
      });
      const body = updatePersonSchema.safeParse(req.body);
      if (!body.success) {
        return res.status(400).json({ error: body.error.issues });
      }
      const result = await PeopleService.update(
        {
          id: !isNaN(Number(id)) ? Number(id) : undefined,
          id_event: Number(id_event),
          id_group: !isNaN(Number(id_group)) ? Number(id_group) : undefined,
        },
        body.data
      );
      if (result) {
        const person = await PeopleService.getOne({
          id: Number(id),
          id_event: Number(id_event),
        });
        res.json(person);
      }
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  delete: RequestHandler = async (req, res) => {
    try {
      const { id, id_event, id_group } = req.params;
      await PeopleService.delete({
        id: Number(id),
        id_event: !isNaN(Number(id_event)) ? Number(id_event) : undefined,
        id_group: !isNaN(Number(id_group)) ? Number(id_group) : undefined,
      });
      res.json("OK");
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };
}

export default new PeopleController();
