import axios from "axios";
import {API_URL} from "./apiConfig";

export const getPlayerByName = (name: string) => {
    try{
        const players = axios.get(`${API_URL}`)
        console.log(players)
    } catch (e) {
        console.error(`Could not find player ${name}`)
    }
}