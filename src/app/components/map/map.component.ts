import { Component, Input, Signal } from '@angular/core';
import * as L from 'leaflet';
import {FlightDTO} from '../../DTOs/flightDTO';
import {ApiService} from '../../services/api.service';
import { WritableSignal, effect } from '@angular/core';
import { AirportDTO } from '../../DTOs/airportDTO';
import { FlightRouteDTO } from '../../DTOs/flightRouteDTO';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map!: L.Map;
  @Input() aerodrome1!: Signal<AirportDTO | undefined>;
  @Input() aerodrome2!: Signal<AirportDTO | undefined>;

  @Input() route?: Signal<FlightRouteDTO | undefined>;

  private flightLine?: L.Polyline | L.Circle;

  ngAfterViewInit(): void {
    this.generateMap();
  }
  constructor(private apiService: ApiService) {
    effect(() => {
      this.aerodrome1();
      if(!this.map){
        return;
      }
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
    this.clearLine();
    if(this.aerodrome1() == undefined || this.aerodrome2() == undefined || this.aerodrome1()?.latitude == undefined || this.aerodrome1()?.longitude == undefined || this.aerodrome2()?.latitude == undefined || this.aerodrome2()?.longitude == undefined){
      return;
    }
    if(this.aerodrome1()?.icaoCode === this.aerodrome2()?.icaoCode){
      this.flightLine = L.circle([this.aerodrome1()?.latitude ?? 0, this.aerodrome1()?.longitude ?? 0], {
        color: 'blue',
        fillColor: '#30f',
        fillOpacity: 0.2,
        radius: 500
      }).addTo(this.map);
    }
    else{
      const pointA: [number, number] = [
        this.aerodrome1()?.latitude ?? 0,
        this.aerodrome1()?.longitude ?? 0
      ];
      const pointB: [number, number] = [
        this.aerodrome2()?.latitude ?? 0,
        this.aerodrome2()?.longitude ?? 0
      ];

      let route = [pointA];
      if(this.route){
        for(const point of this.route()?.navPoints ?? []){
          route.push([point.navPoint.latitude ?? 0, point.navPoint.longitude ?? 0]);
        }
      }
      route.push(pointB);

      this.flightLine = L.polyline(route, {
        color: 'blue',
        weight: 2,
        opacity: 0.7
      }).addTo(this.map);
    }
    this.map.fitBounds(this.flightLine.getBounds(), {padding: [30, 30]});
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [52.2297, 21.0122], // Warszawa
      zoom: 8,
      keyboard: false
    });
    L.tileLayer(this.apiService.getBaseUrl()+'/map/tiles/{z}/{x}/{y}', {
      maxZoom: 11,
      minZoom: 6,
      attribution: 'www.openflightmaps.org ',
    }).addTo(this.map);
  }
  private clearLine(): void {
    if (this.flightLine) {
      this.flightLine.removeFrom(this.map);
    }
  }
}