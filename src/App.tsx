import { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import xml2js from "xml2js";
import "leaflet/dist/leaflet.css";
import { createHash } from "node:crypto";

function App() {
  const [kml, setKml] = useState<any>("");
  const [kmlText, setKMLText] = useState<string>("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dwikavindra/kadirojo2-kml/main/Kadirojo2.kml"
    )
      .then((res) => res.text())
      .then((kmlText) => {
        setKMLText(kmlText);
        const parser = new DOMParser();
        console.log("Belo is from xml");
        const kml = parser.parseFromString(kmlText, "text/xml");
        console.log("KML from useEffect", kml);
        // const geoJSON = geojson.kml(kml);
        setKml(kml);
      });
  }, []);

  const filterKml = (kmlText) => {
    console.log("Before parseString");
    xml2js.parseString(kmlText, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
      } else {
        console.log("Parsed JSON:", JSON.stringify(result));
        const newKML = parseOnlyPlaceMark(result);
        console.log("this is newKML", newKML);
        setKml(newKML);
        setCounter(counter + 1);
      }
    });
  };

  const parseOnlyPlaceMark = (xmlParsed: any) => {
    const parsed = xmlParsed.kml.Document[0].Folder[0].Placemark;
    console.log("this is parsed", parsed);
    const placeMarks = parsed.filter(
      (p) => p["Polygon"] !== undefined && p["Polygon"] !== null
    );
    console.log(placeMarks);
    const newPlaceMarks = placeMarks.toSpliced(0, 1);
    xmlParsed.kml.Document[0].Folder[0].Placemark = newPlaceMarks;
    console.log("Removed", newPlaceMarks);
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(xmlParsed);
    console.log("This is the xml ", xml);
    const parser = new DOMParser();
    const kmllocal = parser.parseFromString(xml, "text/xml");
    return kmllocal;
    // setKml(kml);
  };
  return (
    <div
      key={counter}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "white",
      }}
    >
      <div style={{ color: "black" }}>{counter}</div>
      <button
        onClick={() => {
          const RT = filterKml(kmlText);
        }}
      >
        Press filteredKML
      </button>
      <MapContainer
        style={{ height: "90vh", width: "90vw" }}
        zoom={15}
        center={[-7.767533, 110.44855]}
        key={kml}
      >
        <TileLayer
          key={counter}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {kml && <ReactLeafletKml kml={kml} />}
      </MapContainer>
    </div>
  );
}

export default App;
