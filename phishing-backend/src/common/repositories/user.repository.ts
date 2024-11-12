import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { T_UserDoc, User } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<T_UserDoc>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findOne({ id }).exec();
    }

    async create(userData: { email: string; password: string; fullName: string }): Promise<User> {
        const newUser = new this.userModel(userData); // Only pass necessary fields
        return newUser.save();
    }
}
