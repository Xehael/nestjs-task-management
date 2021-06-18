// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './user.entity';
// import { UserRepository } from './user.repository';

// @Injectable()
// export class AuthService {
    
//     constructor(
//         @InjectRepository(UserRepository)
//         private userRepository: UserRepository,
//         private jwtService: JwtService
//     ){

//     }

//     async signIn(createUserDto: CreateUserDto): Promise<User> {
//         const payload: JwtPayload = {username};
//         const accessTokes = await this.jwtService.sign(payload);

//         return await this.userRepository.signIn(createUserDto)
//     }
// }
