import { environment } from "src/environments/environment";

export class Constants {
    // Secured
    public static API_USER_INFO= environment.backendUrl + 'user';

    // Not Secured
    public static API_USER_NEW= environment.backendUrl + 'register-user';
}
