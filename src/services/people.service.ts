import { PrismaClient, Prisma } from "@prisma/client";
import { GroupsService } from ".";
import Exception from "../exceptions/Exception";

const prisma = new PrismaClient();

type FilterPeople = {
  id_event: number;
  id_group?: number;
  id?: number;
  cpf?: string;
};

type DeleteFilters = { id: number; id_event?: number; id_group?: number };
type UpdateFilters = { id?: number; id_event: number; id_group?: number };

type GetAllFilter = { id_event: number; id_group?: number };
type PersonCreateData = Prisma.Args<
  typeof prisma.eventPeople,
  "create"
>["data"];
type PersonUpdateData = Prisma.Args<
  typeof prisma.eventPeople,
  "update"
>["data"];

class PeopleService {
  create = async (data: PersonCreateData) => {
    try {
      if (!data.id_group) throw new Error("You have to inform group id");
      await GroupsService.getOne({
        id: data.id_group,
        id_event: data.id_event,
      });
      return await prisma.eventPeople.create({ data });
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
      if (!filters.id && !filters.cpf)
        throw new Exception("You need to inform the ID or CPF person.", 400);
      const result = await prisma.eventPeople.findFirst({ where: filters });
      if (!result) throw new Exception("Person not found", 404);
      return result;
    } catch (error) {
      throw error;
    }
  };

  update = async (filters: UpdateFilters, data: PersonUpdateData) => {
    try {
      return await prisma.eventPeople.updateMany({ where: filters, data });
    } catch (error) {
      throw error;
    }
  };

  delete = async (filters: DeleteFilters) => {
    try {
      const result = await prisma.eventPeople.findFirst({ where: filters });
      if (!result) throw new Error("Person not found");
      return await prisma.eventPeople.delete({ where: filters });
    } catch (error) {
      throw error;
    }
  };
}

export default new PeopleService();
