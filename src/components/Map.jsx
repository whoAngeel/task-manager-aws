import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

// const layer = FeatureLayer({
// 	portalItem: {
// 		id: "f2e9b762a2284b6fbf3205c81dfbff48",
// 		ouFields: ["NAME", "STATE_NAME", "VACANT", "HSE_UNITS"],
// 		title: "U.S. Counties",
// 		opacity: 0.8,
// 	},
// });

// const view = MapView({
// 	container: "",
// });
function MapComponent() {
	const mapRef = useRef(null);

	useEffect(() => {
		// Crear la capa de características
		const layer = new FeatureLayer({
			portalItem: {
				id: "f2e9b762a2284b6fbf3205c81dfbff48",
				outFields: ["NAME", "STATE_NAME", "VACANT", "HSE_UNITS"],
				title: "U.S. Counties",
				opacity: 0.8,
			},
		});

		// Crear el mapa
		const map = new Map({
			basemap: "streets-navigation-vector", // Basemap de ejemplo, puedes cambiarlo según lo necesites
			layers: [layer], // Añadir la capa al mapa
		});

		// Función para inicializar la vista del mapa
		const initializeMapView = (latitude, longitude) => {
			const view = new MapView({
				container: mapRef.current, // Referencia al div que contendrá el mapa
				map: map,
				center: [longitude, latitude], // Usar las coordenadas del usuario
				zoom: 10, // Nivel de zoom inicial
			});

			// Cleanup function para destruir la vista cuando el componente se desmonta
			return () => {
				if (view) {
					view.destroy();
				}
			};
		};

		// Obtener la ubicación del usuario
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					initializeMapView(latitude, longitude);
				},
				(error) => {
					console.error("Error al obtener la ubicación: ", error);
					// En caso de error, centrar en una ubicación por defecto
					initializeMapView(43.69, -100.33); // Coordenadas de ejemplo
				}
			);
		} else {
			console.error("Geolocalización no está disponible en este navegador.");
			// Si la geolocalización no está disponible, centrar en una ubicación por defecto
			initializeMapView(43.69, -100.33); // Coordenadas de ejemplo
		}
	}, []);

	return <div style={{ height: "100vh", width: "100%" }} ref={mapRef}></div>;
}
export default MapComponent;
