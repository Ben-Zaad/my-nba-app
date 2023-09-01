import axios from "axios";
import {API_URL} from "./apiConfig";

export const getPlayerByName = async (name: string) => {
    try {
        const players = await axios.get(`${API_URL}`, {params: {search: name}})
        console.log(players)
    } catch (e) {
        console.error(`Could not find player ${name}`)
    }
}