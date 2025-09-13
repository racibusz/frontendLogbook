import { Endorsement } from "./endorsementDTO";

export interface LicenseDTO {
    id: number;
    number: string;
    endorsements: Endorsement[];
}