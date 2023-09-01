import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { TaskPostEntity } from './task-post.entity';
import { Task } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { PostQuery } from './query/post.query';


@Injectable()
export class TaskPostRepository implements CRUDRepository<TaskPostEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskPostEntity): Promise<Task> {
    const entityData = item.toObject();
    return this.prisma.task.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        categories: {
          connect: entityData.categories
            .map(({ categoryId }) => ({ categoryId }))
        },
      },
      include: {
        comments: true,
        categories: true,
        city: true,
      }
    });
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId,
      }
    });
  }

  public async findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId
      },
      include: {
        comments: true,
        categories: true,
        city: true,
      }
    });
  }

  public async findByUserId(userId: string, status: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId: userId,
        status: status,
      },
      include: {
        comments: true,
        categories: true,
        city: true,
      }
    });
  }

  public find({limit, categories, city, contractorId, status, sortDirection, page, userId, tag}: PostQuery): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        categories: {
          some: {
            categoryId: {
              in: categories
            }
          }
        },
        city: {
          id: {in: city}
        },
        status: status,
        contractorId: contractorId,
        userId: userId,
        tags: tag !== undefined ? {hasEvery: tag}: undefined,
      },
      take: limit,
      include: {
        comments: true,
        categories: true,
        city: true,
      },
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(taskId: number, item: TaskPostEntity): Promise<Task> {
    return this.prisma.task.update({
      where: {
        taskId,
        },
      data: {
        ...item.toObject(),
        comments: {
          connect: item.toObject().comments
          .map(({ commentId }) => ({ commentId }))
        },
        categories: {
          connect: item.toObject().categories
            .map(({ categoryId }) => ({ categoryId }))
        },
      },
      include: {
        comments: true,
        categories: true,
        city: true,
      }
    });

  }
}
