import axios from "axios";
import {API_URL} from "./apiConfig";
import {IPlayer} from "../context/types";

export const getPlayerByName = async (name: string, page: number): Promise<IPlayer[]> => {
    try {
        const response = await axios.get(`${API_URL}`, {params: {search: name, page}})
        return response.data.data.map((el: any) => {
            return {
                key: el?.id,
                id: el?.id,
                firstName: el?.first_name,
                lastName: el?.last_name,
                position: el?.position,
                team: {
                    id: el?.team?.id,
                    fullName: el?.team?.full_name,
                    teamName: el?.team?.name,
                    abbreviation: el?.team?.abbreviation,
                    city: el?.team?.city,
                    conference: el?.team?.conference,
                    division: el?.team?.division,
                }
            }
        })
    } catch (e) {
        console.error(`Could not find player ${name}`)
        return [];
    }
}