import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Neighborhood } from '../entities/neighborhood.entity';
import { Specie } from '../entities/specie.entity';
import { Reason } from '../entities/reason.entity';
import { privateDecrypt } from 'crypto';
import { ResidualNumber } from '../entities/residual-number.entity';
import { User } from '../entities/user.entity';

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
  ) {}

  async createSpecie(body: {specie: string}){
    const newSpecie = this.specieRepository.create(body);
    return await this.specieRepository.save(newSpecie);
  }

  async createReason(body: {reason: string}){
    const newReason = this.reasonRepository.create(body);
    return await this.reasonRepository.save(newReason);
  }

  async createReasonsBulk(body: {reason: string}[]){
    const newReasons = body.map((reason) => {
      return this.reasonRepository.create(reason);
    })
    return await this.reasonRepository.save(newReasons);
  }

  async createNeighborhood(body: {neighborhood: string}){
    const newNeighborhood = this.neighborhoodRepository.create(body);
    return await this.neighborhoodRepository.save(newNeighborhood);
  }

  async createNeighborhoodsBulk(body: {neighborhood: string}[]){
    const newNeighborhoods = body.map((neighborhood) => {
      return this.neighborhoodRepository.create(neighborhood);
    })
    return await this.neighborhoodRepository.save(newNeighborhoods);
  }



  async getSpecies(){
    return await this.specieRepository.find();
  }

  async getNeighborhoods() {
    return await this.neighborhoodRepository.find();
  }


  async getReasons() {
    return await this.reasonRepository.find();
  }

  async getResidualNumbers(){
    return await this.residualNumberRepository.find();
  }
  
  async createResidualNumber(number: number){
    const newResidualNumber = this.residualNumberRepository.create({number});
    return await this.residualNumberRepository.save(newResidualNumber);
  }

  async deleteResidualNumber(id: number){
    return await this.residualNumberRepository.delete(id);
  }

  async createUser(user: {email: string, role: string}){
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async getUsers(){
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string){
    return await this.userRepository.findOne({where: {email}});
  }
}
