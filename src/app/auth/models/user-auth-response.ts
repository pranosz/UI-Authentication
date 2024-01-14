import { Role } from "./role.type";

export interface UserAuthResponse {
    accessToken: string;
    roles: Role[];
}
