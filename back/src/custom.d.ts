import { IUser } from './models/Authentication';

declare global {
    namespace Express {
        export interface Request {
            user?: IUser;
        }
    }
}
