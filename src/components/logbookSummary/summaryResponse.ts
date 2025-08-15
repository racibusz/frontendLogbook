import { SummaryDTO } from "./summaryDTO";

export interface SummaryResponseDTO{
    page: number,
    totalSummary: SummaryDTO,
    previousPagesSummary: SummaryDTO,
    thisPageSummary: SummaryDTO,
}