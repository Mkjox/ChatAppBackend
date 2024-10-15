declare module '../models' {
    import { Sequelize, Model } from "sequelize";

    export const sequelize: Sequelize;

    export class User extends Model {
        id: number;
        name: string;
        email: string;
        password: string;
    }

    export class ChatRoom extends Model {
        id: number;
        name: string;
    }

    export class Message extends Model {
        id: number;
        content: string;
        userId: number;
        chatRoomId: number;
    }
}