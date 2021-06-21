/* eslint-disable prettier/prettier */
import { UserDto } from "./dto/create-user.dto";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Res,
  UnauthorizedException,
  UseInterceptors,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UserInterface } from "./dto/user.interface";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { AuthInterceptor } from "./auth.interceptor";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async createUser(createuserDto: UserDto): Promise<User> {
    const { username, email, password } = createuserDto;

    const salt = await bcrypt.genSalt(10);

    const user = new User();
    user.username = username;
    user.password = await bcrypt.hash(password, salt);
    user.email = email;
    user.user_status_id = 1;

    try {
      return await user.save();
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new ConflictException("User already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async authUser(
    userAuth: UserInterface,
    @Res({ passthrough: true }) response: Response
  ) {
    const { email, password } = userAuth;
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestException("Email does not exists");
    }

    if (user && (await user.validatePassword(password))) {
      const token = await this.jwtService.signAsync({ id: user.id });
      response.cookie("token", token, { httpOnly: true });
      return user;
    } else {
      throw new UnauthorizedException("Invalid email or password");
    }
  }

  @UseInterceptors(AuthInterceptor)
  async findOneBy(condition): Promise<User> {
    return await this.userRepository.findOne(condition);
  }

  async getUser(request: Request) {
    try {
      const cookie = request.cookies["token"];
      const data = await this.jwtService.verifyAsync(cookie);
      return this.findOneBy({ id: data["id"] });
    } catch (error) {
      throw new UnauthorizedException("You have to log first");
    }
  }
}
