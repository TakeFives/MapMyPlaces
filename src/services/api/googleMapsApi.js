import { useJsApiLoader } from '@react-google-maps/api';

export function useGoogleMapsApi(){
    
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
    });

    return { isLoaded };
};
