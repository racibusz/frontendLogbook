import { LicenseDTO } from "./licenseDTO";

export interface Endorsement {
    id: number;
    name: string;
    flightHoursReneval: boolean;
    license: LicenseDTO;
    expirationDate: Date
    extensionStatus: boolean[]
}