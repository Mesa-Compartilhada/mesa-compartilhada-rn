import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { LatLng, LeafletView } from 'react-native-leaflet-view';
import { Empresa } from '@/src/types/empresa';
import { getDoacaoByFilter } from '@/src/api/services/doacaoService';
import { StatusDoacao } from '@/src/constants/enums';
import { Doacao } from '@/src/types/doacao';
import { Endereco } from '@/src/types/endereco';

const DEFAULT_LOCATION = {
  latitude: -23.686,
  longitude: -46.627
}
const App: React.FC = () => {

    const [enderecos, setEnderecos] = useState<Endereco[]>([])
    const [mapMarkers, setMapMarkers] = useState<any[]>([])

    const defaultIcon = {
        iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    };
    const [webViewContent, setWebViewContent] = useState<string | null>(null);
    useEffect(() => {
        let isMounted = true;

        const loadHtml = async () => {
        try {
            const path = require("leaflet.html");
            const asset = Asset.fromModule(path);
            await asset.downloadAsync();
            const htmlContent = await FileSystem.readAsStringAsync(asset.localUri!);

            if (isMounted) {
                setWebViewContent(htmlContent);
            }
        } catch (error) {
            Alert.alert('Error loading HTML', JSON.stringify(error));
            console.error('Error loading HTML:', error);
        }
        };

        loadHtml();

        
        const getEnderecos = async () => {
            const doacoes: Doacao[] = await getDoacaoByFilter({status: [StatusDoacao.DISPONIVEL]});
            const empresas = doacoes.map(item => item.empresaDoadora);
            const enderecos = empresas.map(item => item.endereco);
            setEnderecos(enderecos);
        };

        getEnderecos()

        return () => {
        isMounted = false;
        };
    }, []);

    useEffect(() => {
        const getMapMarkers = () => {
            if(enderecos.length >= 1) {
                setMapMarkers(
                    enderecos.map((endereco: any, index: any) => ({
                        position: {
                            lat: endereco.latitude,
                            lng: endereco.longitude,
                        },
                        icon: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
                    })
                ));
            }
        }

        getMapMarkers()
    }, [enderecos])

    if (!webViewContent) {
        return <ActivityIndicator size="large" />
    }
    if(mapMarkers.length >= 1) {
        return (
            <LeafletView
                mapMarkers={mapMarkers}
                doDebug={false}
                source={{ html: webViewContent }}
                mapCenterPosition={{
                    lat: DEFAULT_LOCATION.latitude,
                    lng: DEFAULT_LOCATION.longitude,
                }}
            />
        );
    }
    
}

export default App;