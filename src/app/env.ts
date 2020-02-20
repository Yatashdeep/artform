const HTTP_TIMEOUT:number=20000;
export interface Enviroment{
    mainApi:String,
    timeout:number
}
export const Test:Enviroment={
mainApi:'http://localhost:3000',
timeout:HTTP_TIMEOUT    
}
export const Live:Enviroment={
    // mainApi:'https://www.demo.artformplatform.com/api/users',
    mainApi:'https://www.artformplatform.com/api/users',
    timeout:HTTP_TIMEOUT
}
export const ENV:Enviroment=Live;