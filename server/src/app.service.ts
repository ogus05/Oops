import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatchBoxDto, PostBoxDto } from './dto/box.dto';
import { Box } from './entities/box';
import { Font } from './entities/font';
import { KeyWord } from './entities/keyword';
import { Oop } from './entities/oop';
import {pbkdf2Sync} from 'crypto';
import { Template } from './entities/template';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(KeyWord)
    private readonly keyWordRepository: Repository<KeyWord>,
    @InjectRepository(Oop)
    private readonly oopRepository: Repository<Oop>,
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>,
    @InjectRepository(Font)
    private readonly fontRepository: Repository<Font>,
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ){
  }

  passwordEncryptor = (password: string, token: string) => {
    return pbkdf2Sync(password, token, 10, 8, 'sha512').toString('base64');
  }

  async getAllKeyWord(){
    const keywords = await this.keyWordRepository.find();
    return keywords;
  }

  async getFontList(){
    const fontList = await this.fontRepository.find();
    return fontList;
  }

  async getAllToken(){
    const tokens = await this.boxRepository.find({
      select: {token: true}
    });
    return tokens.map(box => {
      return box.token;
    });
  }

  async getTemplate(ID: number){
    const template = await this.templateRepository.findOne({
      where: {
        box: {
          ID,
        }
      }, select: {
        box: {
          oops: {
            ID: false,
            borderColor: true,
          }
        }
      },
    });
      return {
        backgroundColor: template.box.backgroundColor,
        oops: template.box.oops.map(oop => {
          delete oop.ID;
          return oop
        })
      };
  }

  async getTemplateCount(){
    const count = await this.templateRepository.count();
    return count;
  }

  async getAllTemplate(){
    const templates = await this.templateRepository.find();
    return templates
  }

  async getBox(token: string){
    const box = await this.boxRepository.findOne({
      where: {token: token}
    });
    return {oops: box.oops, backgroundColor: box.backgroundColor};
  }

  async postAuth(token: string, password: string){
    const box = await this.boxRepository.findOne({
      select: {ID: true},
      where: {token: token, password: this.passwordEncryptor(password, token)}
    });
    if(box) return true;
    else return false;
  }

  async postBox(dto: PostBoxDto){
    const token = Math.random().toString(36).substring(2, 12).concat(Math.random().toString(36).substring(2, 12));
    const oopsEntity = dto.oops.map((v, i) => 
      this.oopRepository.create(v)
    )

    const boxEntity = this.boxRepository.create({
      backgroundColor: dto.backgroundColor,
      token: token,
      password: this.passwordEncryptor(dto.password, token),
      oops: oopsEntity,
    });
    await this.boxRepository.save(boxEntity);
    return token;
  }
  
  async patchBox(dto: PatchBoxDto){
    const boxEntity = await this.boxRepository.findOne({
      where: {token: dto.token, password: this.passwordEncryptor(dto.password, dto.token)}
    });
    if(!boxEntity){
      return false;
    } else{
      const oopsEntity = dto.oops.map((v, i) => 
        this.oopRepository.create(v)
      );
      boxEntity.backgroundColor = dto.backgroundColor;
      boxEntity.oops = oopsEntity;
      await this.boxRepository.save(boxEntity);
      return true;
    }
  }
}
