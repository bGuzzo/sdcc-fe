import { UserRole } from "../enums/user-role";

export interface User {
    id: string;
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    role: UserRole;
 }