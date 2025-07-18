import React, {useEffect } from 'react';
import { useInput } from 'react-admin';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import {YandexMapInputProps} from "./types"
import {mapRef,apiKey} from "./constants";

const YandexMapInput: React.FC<YandexMapInputProps> = ({
   latitudeSource,
   longitudeSource,
   label,
   defaultCenter = [55.76, 37.64],
   defaultZoom = 10,
}) => {
    const {
        field: latField,
        fieldState: { error: latError },
    } = useInput({ source: latitudeSource, type: 'number' });
    const {
        field: lngField,
        fieldState: { error: lngError },
    } = useInput({ source: longitudeSource, type: 'number' });

    const coords: [number, number] = [
        Number(latField.value) || defaultCenter[0],
        Number(lngField.value) || defaultCenter[1],
    ];

    const handleMapClick = (e: any) => {
        const [lat, lng] = e.get('coords') as [number, number];
        latField.onChange(lat);
        lngField.onChange(lng);
        mapRef.current?.setCenter([lat, lng]);
    };

    const handleDragEnd = (e: any) => {
        const [lat, lng] = e.target.geometry.getCoordinates() as [number, number];
        latField.onChange(lat);
        lngField.onChange(lng);
    };

    useEffect(() => {
        mapRef.current?.setCenter(coords);
    }, [coords]);

    return (
        <div style={{ margin: '1em 0' }}>
            {label && <label style={{ fontWeight: 500 }}>{label}</label>}
            <YMaps query={{ apikey: apiKey, lang: 'ru_RU' }}>
                <Map
                    defaultState={{ center: defaultCenter, zoom: defaultZoom }}
                    state={{ center: coords, zoom: defaultZoom }}
                    width="100%"
                    height="300px"
                    onClick={handleMapClick}
                    instanceRef={instance => { mapRef.current = instance; }}
                    style={{ border: '1px solid #ccc', marginTop: 8 }}
                >
                    <Placemark
                        geometry={coords}
                        options={{ draggable: true }}
                        onDragEnd={handleDragEnd}
                    />
                </Map>
            </YMaps>

            <div style={{ display: 'flex', gap: '1em', marginTop: 8 }}>
                <div>
                    <input
                        {...latField}
                        placeholder="Широта"
                        type="number"
                        step="any"
                        style={{ width: 120 }}
                    />
                    {latError && <div style={{ color: 'red' }}>{latError.message}</div>}
                </div>
                <div>
                    <input
                        {...lngField}
                        placeholder="Долгота"
                        type="number"
                        step="any"
                        style={{ width: 120 }}
                    />
                    {lngError && <div style={{ color: 'red' }}>{lngError.message}</div>}
                </div>
            </div>
        </div>
    );
};

export default YandexMapInput;