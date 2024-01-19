import { RequestHandler } from "express";
import { PeopleService } from "../services";

class PeopleController {
  create: RequestHandler = async (req, res) => {
    try {
    } catch (error: any) {
      res.json(error.message);
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
      res.json(error.message);
    }
  };
  getOne: RequestHandler = async (req, res) => {
    try {
      const { id_event, id_group, id } = req.params;
      const result = await PeopleService.getOne({
        id_event: !isNaN(Number(id_event)) ? Number(id_event) : undefined,
        id_group: !isNaN(Number(id_group)) ? Number(id_group) : undefined,
        id: Number(id),
      });
      res.json(result);
    } catch (error: any) {
      res.json(error.message);
    }
  };

  update: RequestHandler = async (req, res) => {
    try {
    } catch (error: any) {
      res.json(error.message);
    }
  };

  delete: RequestHandler = async (req, res) => {
    try {
    } catch (error: any) {
      res.json(error.message);
    }
  };
}

export default new PeopleController();
