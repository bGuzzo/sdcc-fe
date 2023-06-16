import { UserRole } from "../enums/user-role";

export interface User {
    id: string,
    firebaseId: string,
    email: string,
    name: string,
    surname: string,
    role: UserRole,
    username: string,
}