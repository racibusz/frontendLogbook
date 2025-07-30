import { Component } from "@angular/core";
import { Input } from "@angular/core";

@Component({
    selector: "li[flight-list-item]",
    templateUrl: "./flight-list-item.component.html",
    standalone: true
})
export class FlightListItemComponent {
    @Input() flight: any; // ← teraz Angular rozpoznaje to jako proper input!
}