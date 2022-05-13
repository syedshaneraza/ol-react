import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import {
  defaults,
  ScaleLine,
  Rotate,
  FullScreen,
  ZoomSlider,
  ZoomToExtent,
  MousePosition,
  OverviewMap,
  Attribution
} from "ol/control";

  function App() {
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
            new Attribution()
          ]),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
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
  };

export default App;
