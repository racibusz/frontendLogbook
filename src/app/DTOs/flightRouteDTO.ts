import { navpointOrderedDTO } from "./navpointDTO";
export interface FlightRouteDTO {
    id: number;
    navPoints: navpointOrderedDTO[];
}