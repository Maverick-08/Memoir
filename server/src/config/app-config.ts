import {config} from 'dotenv'
config()


export const PORT:(string|3000) = process.env.PORT || 3000

export const CorsOptions = {
    credentials : true,
    origin: "http://localhost:5173"
}