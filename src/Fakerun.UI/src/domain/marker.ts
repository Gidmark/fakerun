import { Position } from "./position"

export class MarkerIcon {
    public static Start = require("@/assets/markers/start.png");
    public static Finish = require("@/assets/markers/finish.png");
}

export interface Marker {
    position: Position;
    tooltip?: string | null;
    icon?: string | null;
}
