import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('token')
  getToken(): any {
    const token = this.jwtService.sign({ user: 'test' });
    return { bearer: token };
  }

  @Get('resource')
  @UseGuards(AuthGuard())
  getResource(): any {
    return { resource: 'here are some data ' + new Date().toString() };
  }
}
