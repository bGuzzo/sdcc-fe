import { environment } from "src/environments/environment";

export class Constants {
    // Secured
    public static API_USER_INFO = environment.backendApi + 'users'; // Get
    public static API_DRUG_ALL = environment.backendApi + 'drugs/paginated'; // Get
    public static API_DRUG_SEARCH = environment.backendApi + 'drugs/search'; // Get
    public static API_DRUG_NEW = environment.backendApi + 'drugs/new'; // Put

    // Not Secured
    public static API_USER_NEW= environment.backendPublicApi + 'register-user'; // Get

}
