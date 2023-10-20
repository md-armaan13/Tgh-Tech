declare namespace NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        MONGO_URL: string;
        salt:string;
        JWT_SECRET_KEY:string;
        ExpiresIn:string;
       
    }
}