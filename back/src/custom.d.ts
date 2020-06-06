import { IUser } from './model/Auth';

declare global {
    namespace Express {
        export interface Request {
            user?: IUser;
            [key: string]: any;
        }
    }
}
