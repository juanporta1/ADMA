import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Neighborhood } from '../entities/neighborhood.entity';
import { Specie } from '../entities/specie.entity';
import { Reason } from '../entities/reason.entity';
import { privateDecrypt } from 'crypto';

@Injectable()
export class DataEntitiesService {
  constructor(
    @InjectRepository(Neighborhood)
    private neighborhoodRepository: Repository<Neighborhood>,
    @InjectRepository(Specie)
    private specieRepository: Repository<Specie>,
    @InjectRepository(Reason)
    private reasonRepository: Repository<Reason>
  ) {}

  async createSpecie(body: {specie: string}){
    const newSpecie = this.specieRepository.create(body);
    return await this.specieRepository.save(newSpecie);
  }

  async createReason(body: {reason: string}){
    const newReason = this.reasonRepository.create(body);
    return await this.reasonRepository.save(newReason);
  }

  async createNeighborhood(body: {neighborhood: string}){
    const newNeighborhood = this.neighborhoodRepository.create(body);
    return await this.neighborhoodRepository.save(newNeighborhood);
  }

  async createNeighborhoodsBulk(body: {neighborhoods: {neighborhood: string}[]}){
    const newNeighborhoods = body.neighborhoods.map((neighborhood) => {
      return this.neighborhoodRepository.create(neighborhood);
    })
    return await this.neighborhoodRepository.save(newNeighborhoods);
  }

  async getSpecies() {}

  async getNeighborhoods() {}


  async getReasons() {}

}
