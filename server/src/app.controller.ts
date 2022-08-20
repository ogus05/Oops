import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';
import { PatchBoxDto, PostBoxDto } from './dto/box.dto';
import { font } from './font.o';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getWelcome(@Req() req: Request, @Res() res: Response){
    res.sendFile(join(__dirname, '../../client/public', 'welcome.html'));
  }
  @Get('main')
  async getMain(@Req() req: Request, @Res() res: Response){
    res.sendFile(join(__dirname, '../../client/public', 'main.html'));
  }

  @Get('font')
  async getFontList(@Req() req: Request, @Res() res: Response){
    const fontList = await this.appService.getFontList();
    if(!fontList) throw new InternalServerErrorException("서버측 오류입니다. 다시 시도 해 주세요.");
    res.send(fontList);
  }

  @Get('font/css/:ID')
  async getFontCss(@Param('ID') id: number, @Req() req: Request, @Res() res: Response,
  @Query('type') type: number){
    res.writeHead(200, {
      'Content-Type' : 'text/css; charset=utf8',
    });
    res.write(`
      @font-face{
        font-family: '${id}';
        src: url('/font/oop/${id}.${font[type]}')
      }
      .oop.font${id}>.textBox{
        font-family: '${id}';
    `)
    res.end();
  }

  @Get('token')
  async getAllToken(@Req() req: Request, @Res() res: Response){
    const tokens = await this.appService.getAllToken();
    if(!tokens) throw new InternalServerErrorException("서버측 오류입니다. 다시 시도 해 주세요.");
    res.send(tokens);
  }


  @Get('box')
  async getOops(@Query('token') token, @Req() req: Request, @Res() res: Response){
    const box = await this.appService.getBox(token);
    if(!box){
      throw new BadRequestException("잘못된 정보입니다.");
    }
    res.send(box);
  }

  @Get('keyword')
  async getKeyWord(@Req() req: Request, @Res() res: Response){
    const keyword = await this.appService.getAllKeyWord()
    if(!keyword) throw new InternalServerErrorException("서버측 오류입니다. 다시 시도 해 주세요.");
    res.send(keyword);
  }

  @Get('template')
  async getAllTemplate(@Req() req: Request, @Res() res: Response){
    const templates = await this.appService.getAllTemplate();
    if(!templates) throw new InternalServerErrorException("서버측 오류입니다. 다시 시도 해 주세요.");
    res.send(templates);
  }

  @Get('template/count')
  async getTemplateCount(@Req() req: Request, @Res() res: Response){
    const count = await this.appService.getTemplateCount();
    res.send(count.toString());
  }

  @Get('template/:ID')
  async getTemplate(@Param('ID') ID: number, @Req() req: Request, @Res() res: Response){
    if(isNaN(ID)){
      throw new BadRequestException("잘못된 접근입니다.");
    } else{
      const template = await this.appService.getTemplate(ID);
      if(!template) throw new InternalServerErrorException("서버측 오류입니다. 다시 시도 해 주세요.");
      res.send(template);
    }
  }

  @Post('auth')
  async postAuth(@Body() body: {token: string, password: string}, @Req() req: Request, @Res() res: Response){
    if(await this.appService.postAuth(body.token, body.password)){
      res.send();
    } else{
      throw new BadRequestException("잘못된 정보입니다.")
    }
  }

  @Post('box')
  async postBox(@Body() body: PostBoxDto, @Req() req: Request, @Res() res: Response){
    const token = await this.appService.postBox(body);
    if(!token) throw new InternalServerErrorException("서버측 오류입니다. 다시 시도 해 주세요.");
    res.send({token});
  }

  @Patch('box')
  async patchBox(@Body() body: PatchBoxDto, @Req() req: Request, @Res() res: Response){
    if(await this.appService.patchBox(body)){
      res.send();
    } else{
      throw new BadRequestException("잘못된 정보입니다.");
    }
  }
}

