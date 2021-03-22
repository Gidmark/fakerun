import { Player } from "./player"
import { Position } from "./position"

export interface Challenge {
    startPosition: Position;
    endPosition: Position;
    startDate: Date;
    players: Player[];
}
