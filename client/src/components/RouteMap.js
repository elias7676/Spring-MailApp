import React from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
    paddingTop:'20px',
  width: '60%',
  height: '400px'
};

const center = {
  lat: 86.45961,
  lng: 100.06898
};

const BusRoute = () => {
  const directionsCallback = (response) => {
    if (response.status === 'OK') {
      // Display route on the map
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCaZHR9T4a-NG5nYzPwS1wrel7O6iy5n-g">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        {/* Add markers or other map elements here */}
        {/* For directions */}
        <DirectionsService
          options={{
            destination: '86.45961',
            origin: '100.06898',
            travelMode: 'DRIVING'
          }}
          callback={directionsCallback}
        />
        <DirectionsRenderer />
      </GoogleMap>
    </LoadScript>
  );
};

export default BusRoute;
