import {createContext, useEffect, useState} from "react";
import {IPlayer, IPlayerContextType, IPlayersProviderProps} from "./types";
import {getPlayerByName} from "../api/playerService";


const initialContext = {
    players: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    compares: [],
    getPlayers: () => {
    },
    setPlayerPage: () => {
    },
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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [players, setPlayers] = useState<IPlayer[]>(() => {
        return JSON.parse(localStorage.getItem("players") || "[]");
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [compares, setCompares] = useState<IPlayer[]>(() => {
        return JSON.parse(localStorage.getItem("compares") || "[]");
    });

    const getPlayers = async (playerName: string, page: number) => {
        setIsLoading(true)
        try {
            const fetchedPlayers = await getPlayerByName(playerName, page, setTotalPages)
            if (fetchedPlayers) {
                setPlayers(fetchedPlayers)
                setIsLoading(false)
            }
        } catch (err) {

        }
    }

    const setPlayerPage = async (newPage: number, playerName: string) => {
        setIsLoading(true)
        setPage(newPage)
        try {
            const fetchedPlayers = await getPlayerByName(playerName, newPage, setTotalPages)
            if (fetchedPlayers) {
                setPlayers(fetchedPlayers)
                setIsLoading(false)
            }
        } catch (e) {

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
                page,
                totalPages,
                isLoading,
                compares,
                setPlayerPage,
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
