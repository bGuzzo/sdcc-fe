import { UserRole } from "../enums/user-role";

export class User {
    public id: string | null = null;
    public firebaseId: string | null = null;
    public email: string | null = null;
    public name: string | null = null;
    public surname: string | null = null;
    public role: UserRole | null = null;
    public username: string | null = null;
}