import { Endorsement } from "./endorsementDTO";

export interface LicenseDTO {
    id: number;
    number: string;
    dateOfIssue: Date;
    endorsements: Endorsement[];
}