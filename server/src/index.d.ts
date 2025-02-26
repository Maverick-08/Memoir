import { Request } from 'express';

interface UserDetails {
    [key: string]: any;
}

declare module 'express' {
    interface Request {
        userDetails?: UserDetails;
    }
}
