import { Request } from 'express';

interface UserDetails {
    [key: string]: any; // or a more specific type if you know the structure
}

declare module 'express' {
    interface Request {
        userDetails?: UserDetails;
    }
}
