import { Component, inject, Input, SimpleChanges} from "@angular/core";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { signal } from "@angular/core";
import { SummaryDTO } from "./summaryDTO";
import { ApiService } from "../../app/services/api.service";
import { SummaryResponseDTO } from "./summaryResponse";

@Component({
    selector: '[logbook-summary]',
    imports: [],
    templateUrl: './logbooksummary.component.html',
    standalone: true,   
})
export class LogbookSummaryComponent {
    constructor(private apiService: ApiService){}
    summary = signal<SummaryResponseDTO | undefined>(undefined);
    @Input() page! : number;
    getSummary(){
        this.apiService.getData("flights/summary"+(this.page!=0?"?page="+this.page:"")).subscribe({
            next: (res)=>{ this.summary.set(res); },
            error: (err) => {throw err}
        });
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['page'] && changes['page'].currentValue !== undefined) {
            this.getSummary();
        }
    }
    // ngOnInit(){
        // this.getSummary();
    // }
}