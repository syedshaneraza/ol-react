import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON, MVT } from "ol/format";
import { Circle, Fill, Icon, Stroke, Style, Text } from 'ol/style';
// import VectorTileLayer from "ol/layer/VectorTile";
// import VectorTileSource from "ol/source/VectorTile";
import pakistanUrl from "../assets/geojson/pakistan.geojson";
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
      anchor: [0.5, 38],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: './assets/maps/marker4.png',
    });
    const styles = {
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

  useEffect(() => {
    const initialMap = new Map({
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
          // style: new Style({
          //   stroke: new Stroke({
          //     color: "green",
          //     width: 3,
          //   }),
          // }),
          style: (feature) => {
            return styles[feature.getGeometry().getType()];
          },
        }),
        // new VectorTileLayer({
        //   declutter: true,
        //   source: new VectorTileSource({
        //     attributions:
        //       '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
        //       '© <a href="https://www.openstreetmap.org/copyright">' +
        //       "OpenStreetMap contributors</a>",
        //     format: new MVT(),
        //     url:
        //       "https://api.mapbox.com/styles/v1/shaneraza/cl34a0h6j001814s9fnowgntz/tiles/{z}/{x}/{y}@2x?access_token="+key,
        //   }),
        // //   style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text),TODO: You can styles it as you want using mapbox
        // }),
      ],
      view: new View({
        center: [7000000, 3000000],
        zoom: 3,
      }),
    });
    setMap(initialMap);
  }, []);

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      ref={mapElement}
      className="map-container"
    />
  );
}

export default App;
