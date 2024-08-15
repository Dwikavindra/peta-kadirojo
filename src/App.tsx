import { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import xml2js from "xml2js";
import "leaflet/dist/leaflet.css";

function App() {
  const [kml, setKml] = useState<any>("");
  const [kmlJson, setKmlJson] = useState<any>("");
  const [counter, setCounter] = useState(0);
  const [placemarks, setPlaceMarks] = useState<any>("");
  const [shownPlaceMarks, setShownPlaceMarks] = useState<any>("");
  const [checked, setChecked] = useState<any>({
    rt1: true,
    rt2: true,
    rt3: true,
    rt4: true,
    rt5: true,
    rt6: true,
    rt7: true,
  });

  const updatePlacemarks = (newChecked: boolean, routeName: string) => {
    let newShownPlaceMarks;

    if (!newChecked) {
      newShownPlaceMarks = shownPlaceMarks.filter(
        (placemark: any) => placemark.name[0] !== routeName
      );
    } else {
      const routePlacemark = placemarks.find(
        (placemark: any) => placemark.name[0] === routeName
      );
      if (
        !shownPlaceMarks.some(
          (placemark: any) => placemark.name[0] === routeName
        ) &&
        routePlacemark
      ) {
        newShownPlaceMarks = [...shownPlaceMarks, routePlacemark];
      } else {
        return;
      }
    }

    if (newShownPlaceMarks) {
      const newKMLJSON = {
        ...kmlJson,
        kml: {
          ...kmlJson.kml,
          Document: [
            {
              ...kmlJson.kml.Document[0],
              Folder: [
                {
                  ...kmlJson.kml.Document[0].Folder[0],
                  Placemark: newShownPlaceMarks,
                },
              ],
            },
          ],
        },
      };

      const builder = new xml2js.Builder();
      const xml = builder.buildObject(newKMLJSON);
      const parser = new DOMParser();
      const newKML = parser.parseFromString(xml, "text/xml");

      setKmlJson(newKMLJSON);
      setShownPlaceMarks(newShownPlaceMarks);
      setKml(newKML);
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dwikavindra/kadirojo2-kml/main/Kadirojo2.kml"
    )
      .then((res) => res.text())
      .then((kmlText) => {
        xml2js.parseString(kmlText, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
          } else {
            setPlaceMarks(result.kml.Document[0].Folder[0].Placemark);
            setShownPlaceMarks(result.kml.Document[0].Folder[0].Placemark);
            setKmlJson(result);
          }
        });
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        setKml(kml);
      });
  }, []);
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
      {/* <button onClick={() => {}}>Press filteredKML</button> */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="checkbox"
            style={{ color: "white" }}
            checked={checked.rt1}
            onChange={(e) => {
              console.log(e.target.checked);
              const newChecked = e.target.checked;
              updatePlacemarks(newChecked, "RT 01");
              setChecked({ ...checked, rt1: newChecked });
            }}
          />
          <h4>RT 1</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="checkbox"
            style={{ color: "white" }}
            checked={checked.rt1}
            onChange={(e) => {
              console.log(e.target.checked);
              const newChecked = e.target.checked;
              updatePlacemarks(newChecked, "RT 2");
              setChecked({ ...checked, rt1: newChecked });
            }}
          />
          <h4>RT 2</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="checkbox"
            style={{ color: "white" }}
            checked={checked.rt1}
            onChange={(e) => {
              console.log(e.target.checked);
              const newChecked = e.target.checked;
              updatePlacemarks(newChecked, "RT 01");
              setChecked({ ...checked, rt1: newChecked });
            }}
          />
          <h4>RT 3</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="checkbox"
            style={{ color: "white" }}
            checked={checked.rt1}
            onChange={(e) => {
              console.log(e.target.checked);
              const newChecked = e.target.checked;
              updatePlacemarks(newChecked, "RT 01");
              setChecked({ ...checked, rt1: newChecked });
            }}
          />
          <h4>RT 4</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="checkbox"
            style={{ color: "white" }}
            checked={checked.rt1}
            onChange={(e) => {
              console.log(e.target.checked);
              const newChecked = e.target.checked;
              updatePlacemarks(newChecked, "RT 01");
              setChecked({ ...checked, rt1: newChecked });
            }}
          />
          <h4>RT 5</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="checkbox"
            style={{ color: "white" }}
            checked={checked.rt1}
            onChange={(e) => {
              console.log(e.target.checked);
              const newChecked = e.target.checked;
              updatePlacemarks(newChecked, "RT 01");
              setChecked({ ...checked, rt1: newChecked });
            }}
          />
          <h4>RT 6</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="checkbox"
            style={{ color: "white" }}
            checked={checked.rt1}
            onChange={(e) => {
              console.log(e.target.checked);
              const newChecked = e.target.checked;
              updatePlacemarks(newChecked, "RT 01");
              setChecked({ ...checked, rt1: newChecked });
            }}
          />
          <h4>RT 7</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="checkbox"
            style={{ color: "white" }}
            checked={checked.rt1}
            onChange={(e) => {
              console.log(e.target.checked);
              const newChecked = e.target.checked;
              updatePlacemarks(newChecked, "RT 01");
              setChecked({ ...checked, rt1: newChecked });
            }}
          />
          <h4>RT 1</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="checkbox"
            style={{ color: "white" }}
            checked={checked.rt1}
            onChange={(e) => {
              console.log(e.target.checked);
              const newChecked = e.target.checked;
              updatePlacemarks(newChecked, "RT 01");
              setChecked({ ...checked, rt1: newChecked });
            }}
          />
          <h4>RT 1</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="checkbox"
            style={{ color: "white" }}
            checked={checked.rt1}
            onChange={(e) => {
              console.log(e.target.checked);
              const newChecked = e.target.checked;
              updatePlacemarks(newChecked, "RT 01");
              setChecked({ ...checked, rt1: newChecked });
            }}
          />
          <h4>RT 1</h4>
        </div>
      </div>
      <MapContainer
        style={{ height: "100vh", width: "100vw" }}
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
