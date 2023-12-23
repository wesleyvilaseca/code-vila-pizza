import { hash } from 'bcryptjs';
import { prismaClient } from '../../prisma'

interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        if (! email) {
            throw new Error("Email incorrect");
        }

        const user_exist = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(user_exist) {
            throw new Error("User already exists");
        }

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: await hash(password, 8)
            }, 
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return user;
    }
}

export { CreateUserService }