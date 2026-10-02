import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

 async registerUser(createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const newUser = this.userRepository.create({
      ...createUserDto,
      userPassword: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async loginUser(LoginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: LoginUserDto.userEmail,
      },
    });

    if (!user) {
      throw new UnauthorizedException("No estás autorizado");
    }
   
    const match = await bcrypt.compare(
      LoginUserDto.userPassword,
      user.userPassword,
    );

    if (!match) throw new UnauthorizedException("No estás autorizado");
    const payload = {
      sub: user.userId,
      userEmail: user.userEmail,
      userPassword:user.userPassword,
      userRoles: user.userRoles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}