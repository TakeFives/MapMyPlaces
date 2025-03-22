import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import gdata from '../../data/gdata.json';
import {useGoogleMapsApi} from '../../services/api/googleMapsApi.js'

function MainMap() {
    const data = gdata.locations;  
    
    const containerStyle = {
        width: '100%',
        height: '400px',
    };

    const [map, setMap] = useState(null);

    // Load Google Maps API
    const { isLoaded } = useGoogleMapsApi();

    const calculateBounds = () => {
        const bounds = new window.google.maps.LatLngBounds();
        data.forEach(place => {
            bounds.extend(new window.google.maps.LatLng(place.lat, place.lng));
        });
        return bounds;
    };

    useEffect(() => {
        if (map && data.length > 0) { 
            const bounds = calculateBounds();
            map.fitBounds(bounds); 
        }
    }, [map, data]);

    const handleLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    return (
        isLoaded && (
            <GoogleMap
                mapContainerStyle={containerStyle}
                onLoad={handleLoad}
            >
                {/* Add markers */}
                {data.map((place) => (
                    <Marker
                        key={place.id}
                        position={{ lat: place.lat, lng: place.lng }}
                        title={place.name}
                    />
                ))}
            </GoogleMap>
        )
    );
}

export default MainMap;
