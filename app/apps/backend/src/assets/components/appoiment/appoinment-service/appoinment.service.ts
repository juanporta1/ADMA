import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, Filter, Repository } from 'typeorm';
import { CreateAppoinmentDTO } from '../appoinment-DTOs/create-appoinment.dto';
import { Appoinment } from '../appoinment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAppoinmentDto } from '../appoinment-DTOs/update-appoinment.dto';
import { FilterAppoinmentDto } from '../appoinment-DTOs/filter-appoinment.dto';

@Injectable()
export class AppoinmentService {
  constructor(
    @InjectRepository(Appoinment)
    private appoinmentRepository: Repository<Appoinment>
  ) {}

  async getAll(querys: FilterAppoinmentDto) {
    if (Object.keys(querys).length != 0) {
      const fliterQueryBuilder =
        this.appoinmentRepository.createQueryBuilder('a');
      if (querys.id)
        fliterQueryBuilder.andWhere('a.ID_appoinment = :id', { id: querys.id });
      if (querys.owner)
        fliterQueryBuilder.andWhere('a.owner ILIKE :owner', {
          owner: `%${querys.owner}%`,
        });
      if (querys.neighborhood)
        fliterQueryBuilder.andWhere('a.neighborhood = :neighborhood', {
          neighborhood: querys.neighborhood,
        });
      if (querys.size)
        fliterQueryBuilder.andWhere('a.size = :size', { size: querys.size });
      if (querys.sex)
        fliterQueryBuilder.andWhere('a.sex = :sex', { sex: querys.sex });
      if (querys.race)
        fliterQueryBuilder.andWhere('a.race = :race', { race: querys.race });
      if (querys.date)
        fliterQueryBuilder.andWhere('a.date = :date', { date: querys.date });
      if (querys.startDate)
        fliterQueryBuilder.andWhere('a.date >= :startDate', {
          startDate: new Date(querys.startDate),
        });
      if (querys.endDate)
        fliterQueryBuilder.andWhere('a.date <= :endDate', {
          endDate: new Date(querys.endDate),
        });
      if (querys.dni)
        fliterQueryBuilder.andWhere('a.dni ILIKE :dni', {
          dni: `${querys.dni}%`,
        });

      if (querys.orderBy) {
        if (querys.orderBy === 'owner-asc')
          fliterQueryBuilder.orderBy('a.owner', 'ASC');
        else if (querys.orderBy === 'owner-desc')
          fliterQueryBuilder.orderBy('a.owner', 'DESC');
        else if (querys.orderBy === 'date-asc')
          fliterQueryBuilder.orderBy('a.date', 'ASC');
        else if (querys.orderBy === 'date-desc')
          fliterQueryBuilder.orderBy('a.date', 'DESC');
        else if (querys.orderBy === 'id-asc')
          fliterQueryBuilder.orderBy('a.ID_appoinment', 'ASC');
        else if (querys.orderBy === 'id-desc')
          fliterQueryBuilder.orderBy('a.ID_appoinment', 'DESC');
      }

      if (querys.status)
        fliterQueryBuilder.andWhere('a.status = :status', {
          status: querys.status,
        });
      return await fliterQueryBuilder.getMany();
    } else {
      return await this.appoinmentRepository.find();
    }
  }
  async createAppoinmentsBulk(
    appoinments: CreateAppoinmentDTO[]
  ): Promise<Appoinment[]> {
    const allAppoinments: Appoinment[] = [];
    appoinments.forEach(async (appoinment) => {
      try {
        const newAppoinment = this.appoinmentRepository.create(appoinment);
        await this.appoinmentRepository.save(newAppoinment);
        allAppoinments.push(newAppoinment);
      } catch (error) {
        throw error;
      }
    });
    return allAppoinments;
  }

  async createOneAppoinment(
    appoinment: CreateAppoinmentDTO
  ): Promise<Appoinment> {
    try {
      const newAppoinment = await this.appoinmentRepository.create(appoinment);
      return await this.appoinmentRepository.save(newAppoinment);
    } catch (error) {
      throw error;
    }
  }

  async deleteAppoinment(id: number) {
    const appoinment = await this.appoinmentRepository.findOne({
      where: { ID_appoinment: id },
    });
    if (!appoinment)
      return new HttpException('No se encontro el recurso solicitado.', 404);

    if (appoinment.date <= new Date())
      return new HttpException('No se puede borrar este recurso', 403);

    try {
      return await this.appoinmentRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateAppoinment(id: number, updatedAppoinment: UpdateAppoinmentDto) {
    try {
      return await this.appoinmentRepository.update(id, updatedAppoinment);
    } catch (error) {
      throw error;
    }
  }
}
