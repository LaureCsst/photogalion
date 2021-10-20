import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

@Component({
  selector: 'app-stations-map',
  templateUrl: './stations-map.component.html',
  styleUrls: ['./stations-map.component.css']
})
export class StationsMapComponent implements OnInit {
  map:any;

  

  ngOnInit(): void {

    const layers = [
      new TileLayer({
        source: new OSM(),
      }),
       new TileLayer({
      extent: [-13884991, 2870341, -7455066, 6338219],
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {'LAYERS': 'workspace:test', 'TILED': true},
        serverType: 'geoserver',
        transition:0,
        
      }),
    }),
  ];
  let map = new Map({
    layers: layers,
    target: 'map',
    view: new View({
      center: [-10997148, 4569099],
      zoom: 4,
    }),
  });


  }

}
