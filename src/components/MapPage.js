import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 37.7749, // Default to San Francisco
  lng: -122.4194
};

const libraries = ["places"];

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const searchBoxRef = useRef(null);

  const onLoad = useCallback(map => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();

    if (!places || places.length === 0) {
      alert("Please select an option from the dropdown.");
      return; // Exit if no places found or not selected from dropdown
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
      radius: '5000', // Search within 5000 meters
      type: ['veterinary_care'] // Search for veterinary care locations
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
    <LoadScript
      googleMapsApiKey="AIzaSyDqwuHkEqBr5LnJiKrmd_ATYmXnph-LeX0" // Replace with your actual Google Maps API key
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
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
            type="text"
            placeholder="Enter zip code or address"
            style={{ boxSizing: 'border-box', border: '1px solid transparent', width: '240px', height: '32px', padding: '0 12px', borderRadius: '3px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', fontSize: '14px', outline: 'none', textOverflow: 'ellipses', position: 'absolute', left: '50%', marginLeft: '-120px' }}
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
  );
}

export default MapPage;
