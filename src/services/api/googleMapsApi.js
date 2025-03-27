import { useJsApiLoader } from '@react-google-maps/api';

export function useGoogleMapsApi(){
    
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const libraries = import.meta.env.VITE_GOOGLE_MAPS_LIBS.split(',');

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: libraries,
    });

    return { isLoaded };
};
