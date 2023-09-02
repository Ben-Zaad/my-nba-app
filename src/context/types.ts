export interface IPlayer {
    key: string;
    id: number | string;
    firstName?: string;
    lastName?: string;
    height?: string;
    position?: string;
    team?: ITeam;
}

export interface ITeam {
    id: number,
    fullName: string,
    teamName: string,
    abbreviation: string,
    city: string,
    conference: string,
    division: string,
}

export interface IPlayerContextType {
    players: IPlayer[],
    page: number,
    totalPages: number,
    isLoading: boolean,
    favorites: IPlayer[];
    setPlayerPage: (newPage: number, playerName: string) => void;
    addFavorite: (player: IPlayer) => void;
    removeFavorite: (id: number | string) => void;
}

export interface IPlayersProviderProps {
    children: React.ReactNode;
}