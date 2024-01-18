import { RequestHandler } from "express-serve-static-core";
import { GroupsService } from "../services";

class GroupsController {
  getAll: RequestHandler = async (req, res) => {
    try {
      const { id_event } = req.params;
      const items = await GroupsService.getAll(Number(id_event));
      if (items) return res.json({ groups: items });
      res.json({ error: "An error has occurred" });
    } catch (error: any) {
      res.json(error.message);
    }
  };

  getGroup: RequestHandler = async (req, res) => {
    try {
      const { id, id_event } = req.params;
      const eventGroup = await GroupsService.getOne({
        id: Number(id),
        id_event: !isNaN(Number(id_event)) ? Number(id_event) : undefined,
      });
      res.json(eventGroup);
    } catch (error: any) {
      res.json(error.message);
    }
  };
}

export default new GroupsController();
