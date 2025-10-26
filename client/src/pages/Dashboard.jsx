import React, { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const locations = [
  { id: 1, name: "Location A", latitude: 18.74844700996815, longitude: 73.66067641098535 },
  { id: 2, name: "Location B", latitude: 18.73, longitude: 73.68 },
  { id: 3, name: "Location C", latitude: 18.725, longitude: 73.67 },
];

const Dashboard = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div style={{ height: "100vh" }} className="font-uber-medium">
      Hello
      <Map
        initialViewState={{
          longitude: 73.675,
          latitude: 18.727,
          zoom: 13,
        }}
        style={{ width: "100%", height: "80vh", borderRadius: "1rem" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <NavigationControl position="top-right" />
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            longitude={loc.longitude}
            latitude={loc.latitude}
            anchor="bottom"
            onClick={e => {
              // Prevent map click event
              e.originalEvent.stopPropagation();
              setSelectedId(loc.id);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block", cursor: "pointer" }}
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
            </svg>
          </Marker>
        ))}
        {locations.map(
          (loc) =>
            selectedId === loc.id && (
              <modal
              key={loc.id}
                longitude={loc.longitude}
                latitude={loc.latitude}
                anchor="top"
              >
              </modal>
            )
        )}
      </Map>
    </div>
  );
};

export default Dashboard;
