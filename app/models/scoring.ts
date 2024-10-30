
export interface PlayerPick {
    element: number;  
    position: number;        
    is_captain: boolean;   
    is_vice_captain: boolean;
    multiplier: number;    
}

export interface FplTeamPicksResponse {
    picks: PlayerPick[];     
    entry_history: Record<string, any>; 
    subs: any[];             
}
