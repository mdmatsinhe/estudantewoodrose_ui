export interface Utilizador{
    id?:number
    username: string;
    password: string;
    type: string;
    loginCount: number; 
}