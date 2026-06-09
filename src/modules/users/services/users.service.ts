import { v4 as uuidv4 } from "uuid";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersRepository } from "../repositories/users.repository";
import { WalletsRepository } from "../../wallets/repositories/wallets.repository";
import { AppError } from "../../../shared/errors/app-error";

export class UsersService {
    private usersRepository: UsersRepository;
    private walletsRepository: WalletsRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
        this.walletsRepository = new WalletsRepository();
    }

    async create(data: CreateUserDto) {
        const emailExists = await this.usersRepository.findByEmail(data.email);

        if (emailExists) {
            throw new AppError("Email already exists", 409);
        }

        const phoneExists = await this.usersRepository.findByPhone(data.phone);

        if (phoneExists) {
            throw new AppError("Phone number already exists", 409);
        }

        const userId = uuidv4();
        const walletId = uuidv4();

        const user = {
            id: userId,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone,
            karma_blacklisted: false
        };

        const wallet = {
            id: walletId,
            user_id: userId,
            balance: 0
        };

        await this.usersRepository.create(user);
        await this.walletsRepository.create(wallet);

        return {
            id: userId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            wallet: {
                id: walletId,
                balance: 0
            }
        };
    }
}