import { Story } from "app/model/story";
import { GameUser } from "app/model/gameUser";

export class Game {
    name: string;
    description: string;
    velocity: string;
    shareVelocity: string;   
    includeDealer: string;
    cardSet: string;
    autoFlip: string;
    changeAfterVote: string;
    calculateScore: string;
    useTimer: string;    
    createdDate: string;
    status: string;
    createdBy: string;
    createdByUid: string;
    $key: string;
    Stories: Story[];
    Users: GameUser[];
}
