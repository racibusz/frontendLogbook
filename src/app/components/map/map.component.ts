import { Component, Input, Signal } from '@angular/core';
import * as L from 'leaflet';
import {FlightDTO} from '../../DTOs/flightDTO';
import { WritableSignal, effect } from '@angular/core';
import { AirportDTO } from '../../DTOs/airportDTO';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map!: L.Map;
  @Input() aerodrome1!: Signal<AirportDTO | undefined>;
  @Input() aerodrome2!: Signal<AirportDTO | undefined>;
  private flightLine?: L.Polyline;

  ngAfterViewInit(): void {
    this.generateMap();
  }
  constructor() {
    effect(() => {
      this.aerodrome1();
      if(this.flightLine){
        this.clearLine();
        this.drawLine();
      }
      else{
        this.drawLine();
      }
    });
  }
  generateMap(){
    this.initMap();
    if(this.aerodrome1() && this.aerodrome2()){
      this.drawLine();
    }
  }

  private drawLine(): void {
    this.clearLine()
    if(this.aerodrome1() == undefined || this.aerodrome2() == undefined){
      return;
    }
    const pointA: [number, number] = [
      this.aerodrome1()?.latitute ?? 0,
      this.aerodrome1()?.longtitute ?? 0
    ];
    const pointB: [number, number] = [
      this.aerodrome2()?.latitute ?? 0,
      this.aerodrome2()?.longtitute ?? 0
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
      zoom: 8,
      keyboard: false
    });

    setTimeout(() => {
    const mapContainer = document.getElementById('map');
    mapContainer?.setAttribute('tabindex', '-1');

    const tabbables = mapContainer?.querySelectorAll('[tabindex]');
    tabbables?.forEach(el => el.setAttribute('tabindex', '-1'));
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