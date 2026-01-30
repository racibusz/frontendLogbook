import { Component, Input } from '@angular/core';
import * as L from 'leaflet';
import {FlightDTO} from '../../DTOs/flightDTO';
import { WritableSignal, effect } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map!: L.Map;
  @Input() selectedFlight!:WritableSignal<FlightDTO|null>
  private flightLine?: L.Polyline;

  ngAfterViewInit(): void {
    this.generateMap();
  }
  constructor() {
    effect(() => {
      this.selectedFlight();
      if(this.flightLine){
      this.clearLine();
      this.drawLine();
      }
    });
  }
  generateMap(){
    this.initMap();
    this.drawLine();
  }

  private drawLine(): void {
    this.clearLine()
    const pointA: [number, number] = [
      this.selectedFlight()?.departureAerodrome.latitute ?? 0,
      this.selectedFlight()?.departureAerodrome.longtitute ?? 0
    ];
    const pointB: [number, number] = [
      this.selectedFlight()?.arrivalAerodrome.latitute ?? 0,
      this.selectedFlight()?.arrivalAerodrome.longtitute ?? 0
    ];


    this.flightLine = L.polyline([pointA, pointB], {
      color: 'blue',
      weight: 2,
      opacity: 0.7
    }).addTo(this.map);


    this.map.fitBounds(this.flightLine.getBounds(), {padding: [30, 30]});
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [52.2297, 21.0122], // Warszawa
      zoom: 8
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
  private clearLine(): void {
    if (this.flightLine) {
      this.flightLine.removeFrom(this.map);
    }
  }
}