import { PrismaClient, Prisma } from "@prisma/client";
import { PeopleService } from ".";
import { encryptMatch } from "../utils/match";
import Exception from "../exceptions/Exception";

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
      throw error;
    }
  };

  getOne = async (idEvent: number) => {
    try {
      const item = await prisma.event.findFirst({
        where: {
          id: idEvent,
        },
      });
      if (!item) throw new Exception("Event not found", 404);
      return item;
    } catch (error: any) {
      throw error;
    }
  };

  updateEvent = async (idEvent: number, data: EventUpdateData) => {
    try {
      await this.getOne(idEvent);
      return await prisma.event.update({ where: { id: idEvent }, data });
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

  /*
    Group A (id: 1)
     - Bonieky
     - Márcio
     - Pedro

    Group B (id: 4)
     - João
     - Inácio

    Group C (id: 5)
    - Gabriela
   */

  doMatches = async (id: number): Promise<boolean> => {
    try {
      const eventItem = await prisma.event.findFirst({
        where: { id },
        select: { grouped: true },
      });
      if (eventItem) {
        const peopleList = await PeopleService.getAll({ id_event: id });
        if (peopleList.length > 0) {
          // if (peopleList) {
          // lista temporária das pessoas sorteadas
          let sortedList: { id: number; match: number }[] = [];
          // lista de pessoas sorteaveis
          let sortable: number[] = [];

          let attempts = 0;
          let maxAttempts = peopleList.length;
          let keepTrying = true;

          while (keepTrying && attempts < maxAttempts) {
            keepTrying = false;
            attempts++;
            sortedList = [];
            sortable = peopleList.map((item) => item.id);

            for (let i in peopleList) {
              let sortableFiltered: number[] = sortable;
              if (eventItem.grouped) {
                // fazer um filtro apenas com pessoas que participam de outros grupos
                sortableFiltered = sortable.filter((sortableItem) => {
                  let sortablePerson = peopleList.find(
                    (item) => item.id === sortableItem
                  );
                  return peopleList[i].id_group !== sortablePerson?.id_group;
                });
              }

              // condição = se não tem ninguém para ser sorteado / se tem apenas 1 única pessoa e essa pessoa sou eu
              if (
                sortableFiltered.length === 0 ||
                (sortableFiltered.length === 1 &&
                  peopleList[i].id === sortableFiltered[0])
              ) {
                keepTrying = true;
              } else {
                // gerar um número aleatório baseado na quantidade de pessoas que podem ser tiradas
                // se tem 5 pessoas então entre 0 e 4
                let sortedIndex = Math.floor(
                  Math.random() * sortableFiltered.length
                );
                // condição no while para verificar se o sortedIndex foi igual ao meu id
                // então sortedIndex é gerado novamente
                while (sortableFiltered[sortedIndex] === peopleList[i].id) {
                  sortedIndex = Math.floor(
                    Math.random() * sortableFiltered.length
                  );
                }

                sortedList.push({
                  id: peopleList[i].id,
                  match: sortableFiltered[sortedIndex],
                });

                // remove a pessoa que acabou de ser tirada no sortedList.push acima
                sortable = sortable.filter(
                  (item) => item !== sortableFiltered[sortedIndex]
                );
              }
            }
          }

          console.log(`ATTEMPTS: ${attempts}`);
          console.log(`MAX ATTEMPTS: ${maxAttempts}`);
          console.log(sortedList);

          if (attempts < maxAttempts) {
            for (let i in sortedList) {
              await PeopleService.update(
                {
                  id: sortedList[i].id,
                  id_event: id,
                },
                { matched: encryptMatch(sortedList[i].match) }
              );
            }
            return true;
          }
        }
      }

      throw new Exception(
        "It was not possible to raffle with this groups/peoples",
        400
      );
      // return false;
    } catch (error) {
      throw error;
    }
  };
}

export default new EventService();
