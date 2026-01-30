import {CreateFlightDTO} from "./createFlightDTO";
export interface ModifyFlightDTO {
    flight:CreateFlightDTO;
    flightId: number;
}