import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import { StationFormDto } from 'src/app/models/stationFormDto';

@Component({
  selector: 'app-station-map-form',
  templateUrl: './station-map-form.component.html',
  styleUrls: ['./station-map-form.component.css']
})
export class StationMapFormComponent implements OnInit {
  map:any;
  event:Event;
  closeModal:string;
  coordinate:any;
  stationFormDto:StationFormDto= new StationFormDto();
  constructor(private modalService: NgbModal, private router: Router ) { }

  ngOnInit(): void {
    this.createMap();

  }

  createMap(){
    const layers = [
      new TileLayer({
        source: new OSM(),
      }),
       new TileLayer({
      /* Extent donne l'emprise géographique dans laquelle récuperer les données.
      Ici, l'emprise est la France, donc on ne pourra pas voir les données d'autres pays.
      Il vaut mieux donc, ne pas la définir.
      extent: [-932842, 6616605, 1141353, 5227285],
*/      
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {'TILED': true},
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
  }

  getAddPhoto(){
    // Etape 1 Créer une nouvelle station en BDD et vérifier qu'elle ressort
    // Une fois ok: Au click ouvrir la page d'ajout de photos et lier les photos à la station
    stationFormDto:StationFormDto;
    this.stationFormDto.longitude= this.coordinate[1];
    this.stationFormDto.lattitude= this.coordinate[0];
    this.router.navigate(['/picture-form',this.stationFormDto]);
 }
  
  getModal(event: any, content:any){
    console.log(event);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
    this.coordinate = this.map.getEventCoordinate(event);
 }

 
 private getDismissReason(reason: any): string {
  this.coordinate=null;
 if (reason === ModalDismissReasons.ESC) {
   return 'by pressing ESC';
 } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
   return 'by clicking on a backdrop';
 } else {
   return  `with: ${reason}`;
 }
}



}
