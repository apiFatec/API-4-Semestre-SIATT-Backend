import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRegisterDTO } from './DTO/user.register.dto';
import { ResultDTO } from 'src/dto/result.dto';
import { FindOneOptions } from 'typeorm';
import * as bcrypt  from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async register(data: UserRegisterDTO): Promise<ResultDTO> {
    let user = new User()
    user.email = data.email
    user.name = data.name
    user.password = bcrypt.hashSync(data.password,8)
    return this.userRepository.save(user)
    .then((result) => {
      return<ResultDTO>{
        status: true,
        message: "Usuário cadastrado com sucesso!"
      }
    })
    .catch((error) => {
      return<ResultDTO>{
        status: false,
        message: "Ocorreu algum erro durante a criação de usuário!"
      }
    })
    
  }
  async findOne(email: string): Promise<User | undefined> {
    const options: FindOneOptions<User> = {
      where: { email: email },
    };
    return this.userRepository.findOne(options);
  }
}