import {createContext, useEffect, useState} from "react";
import {IPlayer, IPlayerContextType, IPlayersProviderProps} from "./types";
import {getPlayerByName} from "../api/playerService";


const initialContext = {
    players: [],
    isLoading: false,
    compares: [],
    getPlayers: () => {},
    addCompare: () => {
    },
    removeCompare: () => {
    },
};

export const PlayerContext =
    createContext<IPlayerContextType>(initialContext);

const PlayersProvider: React.FC<IPlayersProviderProps> = (
    {
        children,
    }) => {
    const [players, setPlayers] = useState<IPlayer[]>(() => {
        return JSON.parse(localStorage.getItem("players") || "[]");
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [compares, setCompares] = useState<IPlayer[]>(() => {
        return JSON.parse(localStorage.getItem("compares") || "[]");
    });

    const getPlayers = async (playerName: string) => {
        try {
            const fetchedPlayers = await getPlayerByName(playerName)
            // setPlayers(fetchedPlayers)
        } catch (err) {

        }
    }

    useEffect(() => {
        localStorage.setItem("compares", JSON.stringify(compares));
    }, [compares]);

    const addCompare = (player: IPlayer) => {
        const playerExists = compares.some(
            (compare) => compare.id === player.id
        );

        if (!playerExists) {
            setCompares((prev) => [...prev, player]);
        }
    };

    const removeCompare = (id: string | number) => {
        setCompares((prev) => prev.filter((player) => player.id !== id));
    };

    return (
        <PlayerContext.Provider
            value={{
                players,
                isLoading,
                compares,
                getPlayers,
                addCompare,
                removeCompare,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayersProvider;
