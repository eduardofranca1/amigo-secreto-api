import { Prisma, PrismaClient } from "@prisma/client";
import { EventsService } from ".";
import Exception from "../exceptions/Exception";

const prisma = new PrismaClient();

type GroupFilters = { id: number; id_event?: number };
type GroupsCreateData = Prisma.Args<typeof prisma.eventGroup, "create">["data"];
type GroupUpdateData = Prisma.Args<typeof prisma.eventGroup, "update">["data"];

class GroupsService {
  create = async (data: GroupsCreateData) => {
    try {
      if (!data.id_event) throw new Error("Event ID is required.");
      await EventsService.getOne(data.id_event);
      return await prisma.eventGroup.create({ data });
    } catch (error) {
      throw error;
    }
  };

  getAll = async (id_event: number) => {
    try {
      return await prisma.eventGroup.findMany({ where: { id_event } });
    } catch (error) {
      throw error;
    }
  };

  getOne = async (filters: GroupFilters) => {
    console.log("🚀 ~ GroupsService ~ getOne= ~ filters:", filters);
    try {
      const eventGroup = await prisma.eventGroup.findFirst({ where: filters });
      if (!eventGroup) throw new Exception("Event group not found", 404);
      return eventGroup;
    } catch (error) {
      throw error;
    }
  };

  update = async (filters: GroupFilters, data: GroupUpdateData) => {
    try {
      await this.getOne(filters);
      return await prisma.eventGroup.update({ where: filters, data });
    } catch (error) {
      throw error;
    }
  };

  delete = async (filters: GroupFilters) => {
    try {
      await this.getOne(filters);
      return await prisma.eventGroup.delete({ where: filters });
    } catch (error) {
      throw error;
    }
  };
}

export default new GroupsService();
