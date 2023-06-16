import { UserRole } from "../../enums/user-role";

export interface UserResponse {
    id: string,
    email: string,
    role: UserRole
}
