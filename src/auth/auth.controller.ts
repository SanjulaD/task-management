import { UserInterface } from "./dto/user.interface";
import { User } from "./entities/user.entity";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/create-user.dto";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthInterceptor } from "src/auth/auth.interceptor";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  async signUp(@Body(ValidationPipe) userDto: UserDto): Promise<User> {
    return await this.authService.createUser(userDto);
  }

  @Post("/signin")
  async signIn(
    @Body() userAuth: UserInterface,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.authUser(userAuth, response);
  }

  @Get('user')
  async getUser(@Req() request: Request) {
    return this.authService.getUser(request);
  }

  @UseInterceptors(AuthInterceptor)
  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("token");

    return {
      message: "Logout Success",
    };
  }
}
