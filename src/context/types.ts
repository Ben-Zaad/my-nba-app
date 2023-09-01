export interface IPlayer {
    key: string;
    id: number | string;
    firstName?: string;
    lastName?: string;
    position?: string;
}

export interface IPlayerContextType {
    players: IPlayer[],
    isLoading: boolean,
    compares: IPlayer[];
    getPlayers: (playerName: string) => void;
    addCompare: (player: IPlayer) => void;
    removeCompare: (id: number | string) => void;
}

export interface IPlayersProviderProps {
    children: React.ReactNode;
}