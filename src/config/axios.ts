import axios from "axios";
console.log("KARMA_BASE_URL:", process.env.KARMA_BASE_URL);
console.log("KARMA_API_KEY loaded:", Boolean(process.env.KARMA_API_KEY));


export const adjutorClient = axios.create({
    baseURL: process.env.KARMA_BASE_URL!,
    headers: {
        Authorization: `Bearer ${process.env.KARMA_API_KEY!}`,
        "Content-Type": "application/json"
    }
});