export interface NavPointDTO {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}
export interface navpointOrderedDTO{
    id: number;
    order: number;
    navPoint: NavPointDTO;
}