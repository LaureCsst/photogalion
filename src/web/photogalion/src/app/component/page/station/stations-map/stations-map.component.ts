import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Stamen from 'ol/source/Stamen';
import { StationService } from 'src/app/services/station.service';
import { StationFormDto } from 'src/app/models/stationFormDto';
import { __await } from 'tslib';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PictureService } from 'src/app/services/picture.service';
import { Feature, Overlay } from 'ol';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { TokenStorageService } from 'src/app/services/connectionService/tokenStorage/token-storage.service';


@Component({
  selector: 'app-stations-map',
  templateUrl: './stations-map.component.html',
  styleUrls: ['./stations-map.component.css']
})

export class StationsMapComponent implements OnInit {

  map2: any;
  stationFormDtos: any = [];
  stations: any = [];
  coordinate: any;
  lastPictureByStation: any;
  picturesByStation: any = [];
  feature:any;
  stationId:any;
  isStationClicked: boolean=false;
  isPictureClicked: boolean=false;
  pictureById:any;


  constructor(public stationService: StationService, public pictureService: PictureService, private router: Router, private token: TokenStorageService) { }

  ngOnInit(): void { 
    this.isUserLogged(this.token);
    this.createMap()
  }

  async getStations() {
    //Récupération des datas en BDD
    return this.stationService.onGetStations().toPromise();
  }

  async getPicturesByStation(id: number) {
    //Récupération des datas en BDD
    return this.pictureService.onGetPicturesByStation(id).toPromise();
  }
  async getLastPictureByStation(id: number) {
    return this.pictureService.onGetLastPictureByStation(id).toPromise();
  }

  async callPicturesByStation(stationId:number){
    if(this.isStationClicked){
      this.picturesByStation = await this.getPicturesByStation(stationId);
    }    
  }

  onGetImageById(id:number){
    if(!this.picturesByStation) return;
    this.pictureById=null;
    this.picturesByStation.forEach((picture:any) => {
    if(picture.id == id){
        this.pictureById=picture;
      }
    });
    this.isPictureClicked=true;
  }

  onReturnToStation(){
    this.createMap();
    this.isPictureClicked=false;
  }

  //Créer un vecteur source et un layer
  //Créer une map et y ajouter les layers
  async createMap() {
    this.stationFormDtos = await this.getStations();
    //S'il n'y a pas de stations en BDD
    if (this.stationFormDtos.length == 0) return;
    const features = [];

    for (let station of this.stationFormDtos) {
      const iconStyle = new Style({
        image: new Icon({
          src: "../../../assets/icons/picture-icon.png",
          scale: 0.5,
        })
      });
      const feature = new Feature({
        geometry: new Point([station.lattitude, station.longitude]),
        name: station.id,
        size: 20,
      });
      feature.setStyle(iconStyle);
      features.push(feature);
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
    var map = new Map({
      target: 'map2',
      layers: [
        new TileLayer({
          source: new Stamen({
            layer:'watercolor',
          }),
        }),
        new TileLayer({
          source: new Stamen({
            layer: 'terrain-labels',
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        //Zoom sur la France
        center: [261231, 5997553],
        zoom: 4,

      }),
    });

    const element = document.getElementById('popup');

    const popup = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
    });
    map.addOverlay(popup);


    this.stationId= map.on("click", (evt)=>{
      map.forEachFeatureAtPixel(evt.pixel, (feature)=> {
        this.feature=feature;
      });
      if(this.feature){
        //this.picturesByStation = this.getPicturesByStation(this.feature.get('name'));
        this.isStationClicked=true;
        this.callPicturesByStation(this.feature.get('name'));
      }
    });
 
  

    // change mouse cursor when over marker
    map.on('pointermove', function (e) {
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      (<any>map.getTargetElement()).style.cursor = hit ? 'pointer' : '';
    });

    // Close the popup when the map is moved
    map.on('movestart', function () {
      (<any>$(element)).popover('dispose');
    });


  }
  public isUserLogged(tokenStorage:any){
    if (!tokenStorage.getToken()) {
      this.router.navigate(['/login'])
    }
  }
}


