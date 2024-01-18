import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type GetOneFilters = { id: number; id_event?: number };

class GroupsService {
  getAll = async (id_event: number) => {
    try {
      return await prisma.eventGroup.findMany({ where: { id_event } });
    } catch (error) {
      throw error;
    }
  };

  getOne = async (filters: GetOneFilters) => {
    try {
      const event = await prisma.eventGroup.findFirst({ where: filters });
      if (!event) throw new Error("Event group not found");
      return event;
    } catch (error) {
      throw error;
    }
  };
}

export default new GroupsService();
