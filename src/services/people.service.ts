import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type FilterPeople = { id_event?: number; id_group?: number; id: number };
type GetAllFilter = { id_event: number; id_group?: number };

class PeopleService {
  create = async () => {
    try {
    } catch (error) {
      throw error;
    }
  };

  getAll = async (filters: GetAllFilter) => {
    try {
      return await prisma.eventPeople.findMany({ where: filters });
    } catch (error) {
      throw error;
    }
  };

  getOne = async (filters: FilterPeople) => {
    try {
      const result = await prisma.eventPeople.findFirst({ where: filters });
      if (!result) throw new Error("Person not found");
      return result;
    } catch (error) {
      throw error;
    }
  };

  update = async () => {
    try {
    } catch (error) {
      throw error;
    }
  };

  delete = async () => {
    try {
    } catch (error) {
      throw error;
    }
  };
}

export default new PeopleService();
