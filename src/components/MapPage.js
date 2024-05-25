import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, InfoWindow } from '@react-google-maps/api';
import "../css/css.css"

const center = {
  lat: 37.7749,
  lng: -122.4194
};

const libraries = ["places"];

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
  }, []);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (!places || places.length === 0) {
      alert("Please select an option from the dropdown.");
      return;
    }
    if (!map) {
      console.error("Map not loaded");
      alert("Map is not loaded yet. Please wait and try again.");
      return;
    }
    const bounds = new window.google.maps.LatLngBounds();
    let searchLocation;
    places.forEach(place => {
      if (!place.geometry || !place.geometry.location) {
        console.error("Place has no location data.");
        return;
      }
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      searchLocation = place.geometry.location;
    });
    map.fitBounds(bounds);
    if (searchLocation) {
      searchNearby(searchLocation);
    }
  };

  const searchNearby = (location) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: location,
      radius: '5000',
      type: ['veterinary_care']
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const newMarkers = results.map(place => ({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name
        }));
        setMarkers(newMarkers);
      } else {
        alert("No pet hospitals found near this location.");
      }
    });
  };

  return (
    <>
      <h2 className="mapTitle">Google API Map for Searching Available Pet Clinics Near You</h2>
      <p className="mapDescription">
        Enter your <strong><u>zip code or address</u></strong> in <strong><u>the search box below</u></strong> to find pet clinics near you.
      </p>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerClassName="mapContainer"
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <StandaloneSearchBox
            onLoad={ref => searchBoxRef.current = ref}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              className="mapInput"
              type="text"
              placeholder="Enter zip code or address"
            />
          </StandaloneSearchBox>
          {markers.map(marker => (
            <Marker key={marker.name} position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelected(marker)}
            >
              {selected === marker ? (
                <InfoWindow onCloseClick={() => setSelected(null)}>
                  <div>{marker.name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default MapPage;
