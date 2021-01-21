export class Users {
    public id: number;
    public username: string;
    public password:string;
    public name:string;
    public surname:string;
    public dance_studio: string;
    public country: string;
    public flag_adjucator: number;
    public flag_dance_category: number;
    
    constructor(id:number, username: string, password:string, name:string, surname:string, dance_studio: string, country: string, flag_adjucator: number, flag_dance_category: number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.dance_studio = dance_studio;
        this.country = country;
        this.flag_adjucator = flag_adjucator;
        this.flag_dance_category = flag_dance_category;

    }
}