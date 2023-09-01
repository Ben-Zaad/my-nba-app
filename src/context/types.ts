export interface IPlayer {
    key: string;
    id: number | string;
    firstName?: string;
    lastName?: string;
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
    isLoading: boolean,
    compares: IPlayer[];
    setPlayerPage: (newPage: number) => void;
    getPlayers: (playerName: string, page: number) => void;
    addCompare: (player: IPlayer) => void;
    removeCompare: (id: number | string) => void;
}

export interface IPlayersProviderProps {
    children: React.ReactNode;
}