import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// cria um tipo com os dados necessários / obrigatórios para criar um objeto de event
type EventCreateData = Prisma.Args<typeof prisma.event, "create">["data"];
type EventUpdateData = Prisma.Args<typeof prisma.event, "update">["data"];

class EventService {
  create = async (object: EventCreateData) => {
    try {
      return await prisma.event.create({
        data: object,
      });
    } catch (error) {
      throw error;
    }
  };

  getAll = async () => {
    try {
      return await prisma.event.findMany();
    } catch (error) {
      return false;
    }
  };

  getOne = async (idEvent: number) => {
    try {
      const item = await prisma.event.findFirst({
        where: {
          id: idEvent,
        },
      });
      if (!item) throw new Error("Event not found");
      return item;
    } catch (error: any) {
      throw error;
    }
  };

  updateEvent = async (idEvent: number, data: EventUpdateData) => {
    try {
      const item = await this.getOne(idEvent);
      return await prisma.event.update({ where: { id: item.id }, data });
    } catch (error) {
      throw error;
    }
  };

  delete = async (idEvent: number) => {
    try {
      await this.getOne(idEvent);
      return await prisma.event.delete({ where: { id: idEvent } });
    } catch (error) {
      throw error;
    }
  };
}

export default new EventService();
