export class UserRegistrationRequest {
    public email: string;
    public password: string;
    public name: string;
    public surname: string;
    
    public constructor(email: string, password: string, name: string, surname: string){
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }
}
