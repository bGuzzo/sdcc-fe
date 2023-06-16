export class UserRegistrationRequest {
    private email: string;
    private password: string;
    
    public constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
}
