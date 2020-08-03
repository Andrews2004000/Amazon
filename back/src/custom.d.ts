import { UserClass } from './model/Auth';
import { DocumentType } from '@typegoose/typegoose'

declare global {
    namespace Express {
        export interface Request {
            user?: DocumentType<UserClass>;
            [key: string]: any;

        }
    }
}
