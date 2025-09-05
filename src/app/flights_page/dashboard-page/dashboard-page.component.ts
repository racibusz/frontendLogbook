import { Component, CSP_NONCE, signal } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import {Flight} from "../flights-list/flight.interface";
import {SummaryDTO} from "../../../components/logbookSummary/summaryDTO";

@Component({
    selector: 'dashboard-page',
    templateUrl: './dashboard-page.component.html',
    standalone: true,
    imports: [],
})
export class DashboardPageComponent {
    constructor(private apiService: ApiService, private router:Router){}

    // Component logic goes here
    previousFlight = signal<Flight | null>(null);
    upcomingFlight = signal<Flight | null>(null);
    summary = signal<SummaryDTO | null>(null);
    countUp(to: number){
        
    }
    getPreviousFlight() {
        this.apiService.getData('flights').subscribe({
            next: (data) => {
                for (let flight of data.flights) {
                    if (new Date(flight.flightDate) < new Date()) {
                        this.previousFlight.set(flight);
                    }
                    if(new Date(flight.flightDate) >= new Date() && this.upcomingFlight() == null){
                        this.upcomingFlight.set(flight);
                    }
                }
            }
        });
    }
    getSummary(){
        this.apiService.getData('flights/summary').subscribe({
            next: (data) => {
                this.summary.set(data.totalSummary);
            }
        });
    }
    ngOnInit(){
        this.getSummary();
        this.getPreviousFlight();
    }
}