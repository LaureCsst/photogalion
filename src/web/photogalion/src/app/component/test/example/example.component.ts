import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import TileWMS from 'ol/source/TileWMS';
import Stamen from 'ol/source/Stamen';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const map = new Map({
    layers: [
        
    new TileLayer({
      source: new OSM(),
    }),
    new TileLayer({
      source: new Stamen({
        layer: 'watercolor',
      }),
    }),
    new TileLayer({
      //Récupération du web map service sur geoserver
      source: new TileWMS({
      url: 'http://localhost:8080/geoserver/photogalion/wms',
      params: {'LAYERS': 'photogalion:station', 'TILED': true}
      })
    }),
      ],
      target: 'map',
      view: new View({
        center: [261231, 5997553],
        zoom: 2,
      }),
    });
  }


}
