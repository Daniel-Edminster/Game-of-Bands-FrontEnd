export const BASE_URL = 
    process.env.NODE_ENV === "production" 
    ? 'https://CHANGE_PROD_URL' // production express server, TBD
    : 'http://localhost:8080'; //local express server

