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
        url: 'http://localhost:8080/geoserver/workspace/wms?service=WMS&version=1.1.0&request=GetMap&layers=workspace%3Atest&bbox=-2.227963319875549%2C0.125477595420097%2C-0.922309758121722%2C47.272183893718775&width=330&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers',
        params: {'LAYERS': 'topp:states', 'TILED': true},
        serverType: 'geoserver'
      }),
    }),
  ];
  const map = new Map({
    layers: layers,
    target: 'map',
    view: new View({
      center: [-10997148, 4569099],
      zoom: 4,
    }),
  });

    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([7.0785, 51.4614]),
        zoom: 5
      })
    });
  }

}
