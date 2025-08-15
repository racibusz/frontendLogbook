import { Component } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { signal } from "@angular/core";
import { Flight } from "../flights-list/flight.interface";
import { LogbookSummaryComponent } from "../../../components/logbookSummary/logbooksummary.component";

@Component({
    selector: 'logbook-page',
    templateUrl: './logbook_page.component.html',
    imports: [LogbookSummaryComponent]
})
export class LogbookPageComponent {
    constructor(private apiService: ApiService){}
    page = signal(0);
    totalPages = signal(0);
    flights = signal<Flight[]>([]);

    getFlights(){
        this.apiService.getData("flights"+(this.page()!=0?"?page="+this.page():"")).subscribe({
            next: (res)=>{ this.flights.set(res.flights); this.page.set(res.presentPage); this.totalPages.set(res.totalPages)},
            error: (err) => {throw err}
        });
    }
    ngOnInit(){
        this.getFlights();
    }
    nextPage(){
        this.page.update((prev)=>{return prev + 1});
        this.getFlights();
    }
    previousPage(){
        this.page.update((prev)=>{return prev - 1});
        this.getFlights();
    }
}