import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { StationService } from 'src/app/services/station.service';
import { StationFormDto } from 'src/app/models/stationFormDto';
import { __await } from 'tslib';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PictureService } from 'src/app/services/picture.service';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';


@Component({
  selector: 'app-stations-map',
  templateUrl: './stations-map.component.html',
  styleUrls: ['./stations-map.component.css']
})
export class StationsMapComponent implements OnInit {

  map2:any;
  stationFormDtos:any=[];
  stations:any=[];
  coordinate:any;
  lastPictureByStation: any;

constructor( public stationService: StationService, public pictureService: PictureService,  private router: Router) { }

  ngOnInit(): void {

  this.createMap();

  }
 

 async getStations(){
   //Récupération des datas en BDD
   return this.stationService.onGetStations().toPromise();
 }

 async getLastPictureByStation(id:number){
   return this.pictureService.onGetLastPictureByStation(id).toPromise();
 }

   //Créer un vecteur source et un layer
   //Créer une map et y ajouter les layers
 async createMap(){
  this.stationFormDtos = await this.getStations();
  //S'il n'y a pas de stations en BDD
  if(this.stationFormDtos.length==0)  return;
  
console.log(this.stationFormDtos);
  const features = [];
  for(let station of this.stationFormDtos){
    console.log(station.id);
    this.lastPictureByStation= await this.getLastPictureByStation(station.id);
    console.log(this.lastPictureByStation);
    features.push(
      new Feature({
        geometry: new Point([station.lattitude, station.longitude]),
        size:20,
      })
      )
  }
  
const vectorSource = new VectorSource(
    {
      features
    }
    )
    const vectorLayer = new VectorLayer({
    source: vectorSource,
  });
  
  //création de la map à laquelle on ajoute les layers
  const map = new Map({
    target: 'map2',
    layers: [
      new TileLayer({
        source: new OSM(),        
      }),
      vectorLayer,
    ],
    view: new View({
      //Zoom sur la France
      center: [261231, 5997553],
      zoom: 4,

    }),
  })
 }

}
