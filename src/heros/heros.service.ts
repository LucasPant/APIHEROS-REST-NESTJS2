import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './entities/hero.entity';
import { resourceUsage } from 'process';

@Injectable()
export class HerosService {

  private readonly heros: Hero [] = [];
  private id = 1

  create(createHeroDto: CreateHeroDto) {
    const newHero = {
      id: this.id,
      nome: createHeroDto.nome,
      codinome: createHeroDto.codinome,
      poderes: createHeroDto.poderes,
      status: createHeroDto.status,
      equipe: createHeroDto.equipe,
    }
    this.id = this.id +1;

    this.heros.push(newHero);

    return newHero;
  }

  findAll() {
    return this.heros;
  }

  findOne(id: number) {
    const hero = this.heros.find(hero => hero.id === id);
    if (!hero){
      throw new NotFoundException ('Herói não encontrado')
    } 
    return hero;
  }

  update(id: number, updateHeroDto: UpdateHeroDto) {
    const hero = this.findOne(id);

    hero.nome = updateHeroDto.nome;
    hero.codinome = updateHeroDto.codinome;
    hero.poderes = updateHeroDto.poderes;
    hero.status = updateHeroDto.status;
    hero.equipe = updateHeroDto.equipe;

    return;
  }

  remove(id: number) {
    this.findOne(id);

    const heroIndex = this.heros.findIndex((hero) => hero.id === id )

    this.heros.splice(heroIndex, 1)

    return;
  }
}
