import React, { useState, useEffect, useRef, Fragment } from "react";
import "./App.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON, MVT } from "ol/format";
import { Circle, Fill, Icon, Stroke, Style, Text } from 'ol/style';
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import pakistanUrl from "../assets/geojson/pakistan.geojson";
import marker from "../assets/maps/marker.png"
import { transform } from "ol/proj";
import {
  defaults,
  ScaleLine,
  Rotate,
  FullScreen,
  ZoomSlider,
  ZoomToExtent,
  MousePosition,
  OverviewMap,
  Attribution,
} from "ol/control";

function App() {
  const style_key = 'cl34a0h6j001814s9fnowgntz'
  const image = new Icon({
      anchor: [0.5, 1],
      imgSize:[32, 48],
      // anchorXUnits: 'fraction',
      // anchorYUnits: 'pixels',
      src: marker,
    });
    let styles = {
      Point: new Style({
        image: image,
      }),
      LineString: new Style({
        stroke: new Stroke({
          color: '#ff0000',
          width: 3,
        }),
      }),
      MultiLineString: new Style({
        stroke: new Stroke({
          color: '#ff0000',
          width: 3,
        }),
      }),
      MultiPoint: new Style({
        image: image,
      }),
      MultiPolygon: new Style({
        stroke: new Stroke({
          color: '#ff0000',
          width: 3,
        }),
      }),
      Polygon: new Style({
        stroke: new Stroke({
          color: '#ff0000',
          width: 3,
        }),
      }),
      GeometryCollection: new Style({
        stroke: new Stroke({
          color: 'magenta',
          width: 2,
        }),
        fill: new Fill({
          color: 'magenta',
        }),
        image: new Circle({
          radius: 10,
          fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)',
          }),
          stroke: new Stroke({
            color: 'magenta',
          }),
        }),
      }),
      Circle: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)',
        }),
      }),
    };
          
  const key = 'pk.eyJ1Ijoic2hhbmVyYXphIiwiYSI6ImNsMzQ5c2R0bTA1ajYzaXA3cXp4dnZya2oifQ.KFTqUVHyNQAbC8IO42zLew';
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  let initialMap;
  useEffect(() => {
    initialMap = new Map({
      target: mapElement.current,
      controls: defaults().extend([
        new ScaleLine(),
        new Rotate(),
        new FullScreen(),
        new ZoomSlider(),
        new ZoomToExtent(),
        new MousePosition(),
        new OverviewMap(),
        new Attribution(),
      ]),
      layers: [
        new TileLayer({
          source: new OSM({
            url:
            "https://api.mapbox.com/styles/v1/shaneraza/cl34al4bu008j14mm8da77vhf/tiles/{z}/{x}/{y}?access_token="+key,
          }),
        }),
        new VectorLayer({
          source: new VectorSource({
            url: pakistanUrl,
            format: new GeoJSON(),
          }),
          style: (feature) => {
            return styles[feature.getGeometry().getType()];
          },
          properties: {
            id: 'main-layer',
            name: 'Pakistan',
          },
        }),
      ],
      view: new View({
        center: [7000000, 3000000],
        zoom: 3,
        // projection: 'EPSG:4326'
      }),
    });
    // Hook to triger addfeature funtion to add a feature in main-layer source.
    //TODO: This funciton needs to be trigered as per requirements of task
    addFeature();
    
    // TODO: Below is the list of all the event listners available on map instance 
    // singleclick: A true single click with no dragging and no double click. This event is delayed 250ms to ensure that it’s not a double click
    // postrender: Triggered after map is rendered
    // pointermove: Triggered when pointer is moved
    // pointerdrag: Triggered when pointer is dragged
    // movestart: Triggered when map starts moving
    // moveend: Triggered after map is moved
    // dblclick: A true double click with no dragging
    // click: A single click with no dragging. Double click will fire two events

    //Creating a Map Click Event Listener
    map.on('singleclick', function (e) {
      //Perform Task on click
    });

    setMap(initialMap);
  },[]);

  // add a feature to a specific layer i.e. 'main-layer'
  
  const addFeature = () => {
    let markerFeature = new Feature({ geometry: new Point([0, 0]) });
    let layer;
    initialMap.getLayers().forEach((lr) => {
      if (lr.getProperties()['id'] === 'main-layer') {
        layer = lr;
      }
    });
    layer && layer.getSource().addFeature(markerFeature);
  }

  // Remove a feature from a specific layer i.e. 'main-layer'
  const removeFeature = (feature) => {
    let layer;
    this.map.getLayers().forEach((lr) => {
      if (lr.getProperties()['id'] === 'main-layer') {
        layer = lr;
      }
    });
    layer && layer.getSource().removeFeature(feature);
    }
  
  // Transform ( projection ) feautre coordinates or transform coodinates and make feature from these transformed coordinates
  const tranformProjection = (feature, coordinates) => {
      // Transforms a coordinate from source projection to destination projection. This returns a new coordinate (and does not modify the original).
      // we can either trnasform thru coordinates or feature
      let trans = transform(coordinates, 'EPSG:3857', 'EPSG:4326');
      feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
  };

  const showOrHideLayer = (event) => {
    map.getLayers().forEach((lr) => {
      if (lr.getProperties()['id'] === 'main-layer') {
        // console.log('in here');
        lr.setVisible(event.target.checked);
        }
      });
    }

  return (
    <Fragment>
    <div
      style={{ height: "100vh", width: "100%" }}
      ref={mapElement}
    >
      <div id="info" className="layer-switcher">
        <input
          type="checkbox"
          name="main-layer"
          id="lr"
          defaultChecked
          onClick={showOrHideLayer}
        />
        <label htmlFor="lr">Show / Hide Main Layer</label>
      </div>
      </div>
      </Fragment>
  );
}

export default App;
