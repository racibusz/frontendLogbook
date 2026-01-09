import {AirplaneTypeDTO} from './airplaneTypeDTO';

export interface AirplaneDTO {
    id: number;
    aircraftType: AirplaneTypeDTO;
    registration: string;
}