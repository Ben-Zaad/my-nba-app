import axios from "axios";
import {API_URL} from "./apiConfig";
import {IPlayer} from "../context/types";

export const getPlayerByName = async (name: string) : Promise<IPlayer[]> => {
    try {
        const response = await axios.get(`${API_URL}`, {params: {search: name}})
        return response.data.data.map((el: any) => {
            return {
                key: el.id,
                id: el.id,
                firstName: el.first_name,
                lastName: el.last_name,
                position: el.position,
            }
        })
    } catch (e) {
        console.error(`Could not find player ${name}`)
        return [];
    }
}