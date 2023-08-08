import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { categoryId: 1 },
    update: {},
    create: {
      title: 'Сантехника',
      tasks: {
        create: [
          {
            title: 'Замена вентиля ГВС',
            userId: '13',
            description: 'Старый течет. Надо срочно',
            city: 'Санкт-Птербург',
            tags: {
              create: [
                {
                  message: 'срочно',
                  userId: '13',
                }
              ]
            }
          },
        ]
      },
    }
  });
  await prisma.category.upsert({
    where: { categoryId: 2 },
    update: {},
    create: {
      title: 'Электрика',
      tasks: {
        create: [
          {
            title: 'Установка розетки',
            userId: '13',
            description: 'Установить розетку на кухне',
            comments: {
              create: [
                {
                  message: 'Могу сделать сегодня',
                  userId: '14',
                }
              ]
            }
          },
          {
            title: 'Поменять лампочку',
            userId: '13',
            description: 'Перегорела',
            favorite: {
              create: [
                {
                  userId: '14'
                }
              ]
            },
            comments: {
              create: [
                {
                  message: 'Могу сделать',
                  userId: '14',
                }
              ]
            }
          }
        ]
      }
    }
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
