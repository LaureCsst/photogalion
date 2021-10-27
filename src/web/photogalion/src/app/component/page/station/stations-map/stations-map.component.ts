import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { StationService } from 'src/app/services/station.service';
import { StationFormDto } from 'src/app/models/stationFormDto';
import { __await } from 'tslib';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import Layer from 'ol/layer/Layer';
import Circle from 'ol/geom/Circle';
import Fill from 'ol/style/Fill';

@Component({
  selector: 'app-stations-map',
  templateUrl: './stations-map.component.html',
  styleUrls: ['./stations-map.component.css']
})
export class StationsMapComponent implements OnInit {
  map:any;
  map2:any;
  event:Event;
  coordinate:any;
  stationFormDto:StationFormDto= new StationFormDto();
  stationFormDtos:any=[];
  stations:any=[];

constructor( public stationService: StationService) { }

  

  ngOnInit(): void {

    const layers = [
      new TileLayer({
        source: new OSM(),
      }),
       new TileLayer({
      /* Extent donne l'emprise géographique dans laquelle récuperer les données.
      Ici, l'emprise est la France, donc on ne pourra pas voir les données d'autres pays.
      Il vaut mieux donc, ne pas la définir.
      extent: [-932842, 6616605, 1141353, 5227285],*/
      
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {'LAYERS': 'workspace:test', 'TILED': true},
        serverType: 'geoserver',
        transition:0,
        
      }),
    }),
  ];
  this.map = new Map({
    layers: layers,
    target: 'map',
    view: new View({
      //Zoom sur la France
      center: [261231, 5997553],
      zoom: 4,
    }),
  });

  this.createMap();

  }

  getCoord(event: any){
    this.coordinate = this.map.getEventCoordinate(event);
    console.log(this.coordinate);
    // Etape 1 Créer une nouvelle station en BDD et vérifier qu'elle ressort
    // Une fois ok: Au click ouvrir la page d'ajout de photos et lier les photos à la station
    stationFormDto:StationFormDto;
    this.stationFormDto.longitude= this.coordinate[1];
    this.stationFormDto.lattitude= this.coordinate[0];
    this.stationService.onAddStation(this.stationFormDto);
    
    console.log(this.stationFormDtos)
 }

 async getStations(){
   //Récupération des datas en BDD
   return this.stationService.onGetStations().toPromise();
 }

   //Créer un vecteur source et un layer
   //Créer une map et y ajouter les layers
 async createMap(){
  this.stationFormDtos = await this.getStations();
  if(this.stationFormDtos.length==0) return;
  const features = [];
  for(let e of this.stationFormDtos){
    features.push( new Feature({
      geometry: new Point([e.lattitude, e.longitude]),
      size:20,
    })
    )
  }
  
  console.log(features);
  //Création source et layer à partir des datas
  const vectorSource = new VectorSource({features});
  const vectorLayer = new VectorLayer({
    source: vectorSource
  });
  
  console.log("4---");
  //création de la map à laquelle on ajoute les layers
  
  const map = new Map({
    target: 'map2',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer
    ],
    view: new View({
      //Zoom sur la France
      center: [261231, 5997553],
      zoom: 4,
    }),
    
  })
 }

}
