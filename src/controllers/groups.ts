import { RequestHandler } from "express-serve-static-core";
import { GroupsService } from "../services";
import { z } from "zod";

class GroupsController {
  create: RequestHandler = async (req, res) => {
    try {
      const { id_event } = req.params;
      const createGroupSchema = z.object({
        name: z.string().min(1),
      });

      const body = createGroupSchema.safeParse(req.body);

      if (!body.success) {
        return res.status(400).json({ error: body.error.issues });
      }

      const group = await GroupsService.create({
        id_event: Number(id_event),
        name: body.data.name,
      });
      res.status(201).json({ EventGroup: group });
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  getAll: RequestHandler = async (req, res) => {
    try {
      const { id_event } = req.params;
      const items = await GroupsService.getAll(Number(id_event));
      if (items) return res.json({ groups: items });
      res.json({ error: "An error has occurred" });
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  getGroup: RequestHandler = async (req, res) => {
    try {
      const { id, id_event } = req.params;
      const result = await GroupsService.getOne({
        id: Number(id),
        id_event: !isNaN(Number(id_event)) ? Number(id_event) : undefined,
      });
      res.json(result);
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  update: RequestHandler = async (req, res) => {
    try {
      const { id, id_event } = req.params;
      const updateGroupSchema = z.object({
        name: z.string().optional(),
      });
      const body = updateGroupSchema.safeParse(req.body);
      if (!body.success) {
        return res.status(400).json({ error: body.error.issues });
      }
      const result = await GroupsService.update(
        {
          id: Number(id),
          id_event: !isNaN(Number(id_event)) ? Number(id_event) : undefined,
        },
        body.data
      );
      res.json({ EventGroup: result });
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };

  delete: RequestHandler = async (req, res) => {
    try {
      const { id, id_event } = req.params;
      const result = await GroupsService.delete({
        id: Number(id),
        id_event: !isNaN(Number(id_event)) ? Number(id_event) : undefined,
      });
      res.json({ Group: result });
    } catch (error: any) {
      res.status(error.code).json(error.message);
    }
  };
}

export default new GroupsController();
