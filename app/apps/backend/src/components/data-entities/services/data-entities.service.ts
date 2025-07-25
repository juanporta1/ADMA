import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, QueryBuilder, Repository } from 'typeorm';
import { Neighborhood } from '../entities/neighborhood.entity';
import { Specie } from '../entities/specie.entity';
import { Reason } from '../entities/reason.entity';
import { ResidualNumber } from '../entities/residual-number.entity';
import { User } from '../entities/user.entity';
import { Setting } from '../entities/setting.entity';
import { CreateSettingDTO } from '../dto/create-setting.DTO';
import { UpdateSettingDTO } from '../dto/update-setting.DTO';
import { Veterinarian } from '../entities/veterinarian.entity';
import { CreateVeterinarianDTO } from '../dto/create-veterinarian.DTO';
import { UpdateVeterinarianDTO } from '../dto/update-veterinarian.DTO';
import { FindVeterinarianDTO } from '../dto/find-veterinarian.DTO';
import { CreateCustomAppointmentScheduleDTO } from '../dto/create-custom-appointment-schedule-DTO';
import { AppointmentSchedule } from '../entities/appointment-schedule.entity';
import { FindCustomAppointmentScheduleDTO } from '../dto/find-custom-appointment-schedule.DTO';
import { UpdateCustomAppointmentScheduleDTO } from '../dto/update-custom-appointment-schedule.DTO';

@Injectable()
export class DataEntitiesService {
  constructor(
    @InjectRepository(Neighborhood)
    private neighborhoodRepository: Repository<Neighborhood>,
    @InjectRepository(Specie)
    private specieRepository: Repository<Specie>,
    @InjectRepository(Reason)
    private reasonRepository: Repository<Reason>,
    @InjectRepository(ResidualNumber)
    private residualNumberRepository: Repository<ResidualNumber>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
    @InjectRepository(Veterinarian)
    private veterinarianRepository: Repository<Veterinarian>,
    @InjectRepository(AppointmentSchedule)
    private appointmentScheduleRepository: Repository<AppointmentSchedule>
  ) {}

  // ==================== MÉTODOS GET ====================
  async getSpecies() {
    const qb = this.specieRepository.createQueryBuilder('s');
    qb.orderBy('s.specie', 'ASC');
    qb.where('s.inUse = true'); // Solo devuelve las especies que están en uso
    return await qb.getMany();
  }

  async getNeighborhoods() {
    const qb = this.neighborhoodRepository.createQueryBuilder('n');
    qb.orderBy('n.neighborhood', 'ASC');
    qb.where('n.inUse = true'); // Solo devuelve los barrios que están en uso
    return await qb.getMany();
  }

  async getReasons() {
    return await this.reasonRepository.find();
  }

  async getResidualNumbers() {
    return await this.residualNumberRepository.find();
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getSetting(querys: { settingName?: string }) {
    return await this.settingRepository.find({ where: querys });
  }

  async getVeterinarians(querys: FindVeterinarianDTO) {
    const qb = this.veterinarianRepository.createQueryBuilder('v');
    if (querys.ID_veterinarian)
      qb.andWhere('v.ID_veterinarian = :id', { id: querys.ID_veterinarian });
    return await qb.getMany();
  }

  async getAppointmentSchedules(querys: FindCustomAppointmentScheduleDTO) {
    const qb = this.appointmentScheduleRepository.createQueryBuilder('as');
    if (querys.date) {
      qb.andWhere('as.date = :date', { date: querys.date });
    }
    if (querys.hour) {
      qb.andWhere('as.hour = :hour', { hour: querys.hour });
    }
    return await qb.getMany();
  }
  // ==================== MÉTODOS CREATE ====================
  async createSpecie(body: { specie: string }) {
    const existingSpecie = await this.specieRepository.findOne({
      where: { specie: body.specie },
    });
    if (existingSpecie) {
      return await this.specieRepository.update(existingSpecie.ID_specie, {
        inUse: true,
      });
    }
    const newSpecie = this.specieRepository.create(body);
    return await this.specieRepository.save(newSpecie);
  }

  async createReason(body: { reason: string }) {
    const existingReason = await this.reasonRepository.findOne({
      where: { reason: body.reason },
    });
    if (existingReason) {
      return await this.reasonRepository.update(existingReason.ID_reason, {
        inUse: true,
      });
    }
    const newReason = this.reasonRepository.create(body);
    return await this.reasonRepository.save(newReason);
  }

  async createReasonsBulk(body: { reason: string }[]) {
    const newReasons = body.map((reason) => {
      return this.reasonRepository.create(reason);
    });
    return await this.reasonRepository.save(newReasons);
  }

  async createNeighborhood(body: { neighborhood: string }) {
    const existingNeighborhood = await this.neighborhoodRepository.findOne({
      where: { neighborhood: body.neighborhood },
    });
    if (existingNeighborhood) {
      return await this.neighborhoodRepository.update(
        existingNeighborhood.ID_neighborhood,
        { inUse: true }
      );
    }
    const newNeighborhood = this.neighborhoodRepository.create(body);
    return await this.neighborhoodRepository.save(newNeighborhood);
  }

  async createNeighborhoodsBulk(body: { neighborhood: string }[]) {
    const newNeighborhoods = body.map((neighborhood) => {
      return this.neighborhoodRepository.create(neighborhood);
    });
    return await this.neighborhoodRepository.save(newNeighborhoods);
  }

  async createResidualNumber(number: number) {
    const newResidualNumber = this.residualNumberRepository.create({ number });
    return await this.residualNumberRepository.save(newResidualNumber);
  }

  async createUser(user: { email: string; role: string }) {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async createSetting(body: CreateSettingDTO) {
    const newSetting = this.settingRepository.create(body);
    return await this.settingRepository.save(newSetting);
  }

  async createVeterinarian(body: CreateVeterinarianDTO) {
    const newVeterinarian = this.veterinarianRepository.create(body);
    return await this.veterinarianRepository.save(newVeterinarian);
  }

  async createCustomAppointmentSchedule(
    body: CreateCustomAppointmentScheduleDTO
  ) {
    const existingSchedule = await this.appointmentScheduleRepository.findOne({
      where: {
        date: body.date,
        hour: body.hour,
      },
    });
    if (existingSchedule) {
      return await this.appointmentScheduleRepository.update(
        existingSchedule.ID_appointmentSchedule,
        { maxAppointments: body.maxAppointments }
      );
    }
    const newAppointmentSchedule =
      this.appointmentScheduleRepository.create(body);
    return await this.appointmentScheduleRepository.save(
      newAppointmentSchedule
    );
  }
  // ==================== MÉTODOS UPDATE ====================
  async updateNeighborhood(
    body: { neighborhood?: string; inUse?: boolean },
    id: number
  ) {
    return await this.neighborhoodRepository.update(id, body);
  }

  async updateReason(
    body: { reason?: string; inUse?: boolean; reasonSex?: 'a' | 'm' | 'h' },
    id: number
  ) {
    return await this.reasonRepository.update(id, body);
  }

  async updateSpecie(body: { specie?: string; inUse?: boolean }, id: number) {
    return await this.specieRepository.update(id, body);
  }

  async updateSetting(body: UpdateSettingDTO) {
    return await this.settingRepository.update(
      { settingName: body.settingName },
      body
    );
  }

  async updateVeterinarian(body: UpdateVeterinarianDTO, id: number) {
    return await this.veterinarianRepository.update(id, body);
  }

  async editUser(body: { email: string; role: string }, id: number) {
    return await this.userRepository.update(id, body);
  }

  async updateAppointmentSchedule(
    body: UpdateCustomAppointmentScheduleDTO,
    id: number
  ) {
    const current = await this.appointmentScheduleRepository.findOne({
      where: { ID_appointmentSchedule: id },
    });
    if (!current) {
      throw new Error('Appointment schedule not found');
    }
    const updated = { ...current, ...body };

    const duplicate = await this.appointmentScheduleRepository.findOne({
      where: {
        date: updated.date,
        hour: updated.hour,
        ID_appointmentSchedule: Not(id), // importante: ignoramos el actual
      },
    });

    if (duplicate) {
      this.appointmentScheduleRepository.delete(
        duplicate.ID_appointmentSchedule
      );
    }
    return await this.appointmentScheduleRepository.update(id, body);
  }

  // ==================== MÉTODOS DELETE ====================
  async deleteResidualNumber(id: number) {
    return await this.residualNumberRepository.delete(id);
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }

  async deleteAppointmentSchedule(id: number) {
    return await this.appointmentScheduleRepository.delete(id);
  }
}
