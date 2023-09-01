import {createContext, useEffect, useState} from "react";
import {IPlayer, IPlayerContextType, IPlayersProviderProps} from "./types";
import {getPlayerByName} from "../api/playerService";


const initialContext = {
    players: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    favorites: [],
    getPlayers: () => {
    },
    setPlayerPage: () => {
    },
    addFavorite: () => {
    },
    removeFavorite: () => {
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
    const [players, setPlayers] = useState<IPlayer[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [favorites, setFavorites] = useState<IPlayer[]>(() => {
        return JSON.parse(localStorage.getItem("favorites") || "[]");
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
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (player: IPlayer) => {
        const playerExists = favorites.some(
            (compare) => compare.id === player.id
        );

        if (!playerExists) {
            setFavorites((prev) => [...prev, player]);
        }
    };

    const removeFavorite = (id: string | number) => {
        setFavorites((prev) => prev.filter((player) => player.id !== id));
    };

    return (
        <PlayerContext.Provider
            value={{
                players,
                page,
                totalPages,
                isLoading,
                favorites,
                setPlayerPage,
                getPlayers,
                addFavorite,
                removeFavorite,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayersProvider;
