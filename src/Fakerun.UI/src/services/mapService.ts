import axios from "axios"

import bearing from "@turf/bearing"

import { Marker } from "@/domain/marker"
import { Position } from "@/domain/position"

import { Feature, Map, View } from "ol"
import { Extent } from "ol/extent"
import { GeoJSON } from "ol/format"
import { Geometry, Point } from "ol/geom"
import { Tile, Vector } from "ol/layer"
import { fromLonLat, transformExtent } from "ol/proj"
import { OSM, Vector as VectorSource } from "ol/source"
import { offset } from "ol/sphere"
import { Icon, Stroke, Style } from "ol/style"

import { Routing } from "openrouteservice"

const apiToken = "5b3ce3597851110001cf6248ca8b9fdac7d849b5a2234fce09f80794"
const apiUrl = "https://api.openrouteservice.org/v2/"
const padding = 60

export class MapService {
	public renderMap(id: string, center?: Position): Map {
		return new Map({
			target: id,
			layers: [
				new Tile({
					source: new OSM()
				})
			],
			view: center
				? new View({
					center: fromLonLat([center.longitude, center.latitude]),
					zoom: 4
				})
				: undefined
		})
	}

	public setCenter(map: Map, route: Routing): void {
		const view = map.getView()
		const extent = transformExtent(<Extent>route.bbox, "EPSG:4326", view.getProjection())

		view.fit(extent, {
			size: map.getSize(),
			padding: [padding, padding, padding, padding]
		})
	}

	public addMarker(map: Map, marker: Marker): Feature<Geometry> {
		const feature = new Feature({
			geometry: new Point(fromLonLat([marker.position.longitude, marker.position.latitude])),
			name: marker.tooltip
		})

		if (marker.icon) {
			const iconStyle = new Style({
				image: new Icon({
					src: marker.icon,
					scale: 0.75
				})
			})

			feature.setStyle(iconStyle)
		}

		map.addLayer(new Vector({
			source: new VectorSource({
				features: [
					feature
				]
			})
		}))

		return feature
	}

	public getDirections(from: Position, to: Position): Promise<Routing | null> {
		return axios.request<Routing>({
			url: apiUrl + "/directions/driving-car/geojson",
			method: "POST",
			headers: {
				Authorization: apiToken
			},
			data: {
				coordinates: [
					[from.longitude, from.latitude],
					[to.longitude, to.latitude]
				]
			}
		})
			.then(response => {
				return response.data
			})
			.catch((error: Error) => {
				console.error("An error occured", error)
				return null
			})
	}

	public addDirections(map: Map, routing: Routing): void {
		const style = new Style({
			stroke: new Stroke({
				width: 6,
				color: [237, 212, 0, 0.8]
			})
		})

		const layer = new Vector({
			source: new VectorSource({
				features: new GeoJSON({
					featureProjection: "EPSG:3857"

				}).readFeatures(routing)
			}),
			style: style
		})

		map.addLayer(layer)
	}

	public addDistanceOnRoute(routing: Routing, distance: number): Position | null {
		let totalDistance = 0
		for (const feature of routing.features) {
			for (const segment of feature.properties.segments) {
				for (const step of segment.steps) {
					totalDistance += step.distance
					if (totalDistance >= distance) {
						const remaining = distance - totalDistance
						const [startIndex, endIndex] = step.way_points
						const startCoordinate = feature.geometry.coordinates[startIndex]
						const endCoordinate = feature.geometry.coordinates[endIndex]

						if (remaining <= 0)
							return { longitude: endCoordinate[0], latitude: endCoordinate[1] };

						const degrees = bearing(startCoordinate, endCoordinate)

						const [newLongitude, newLatitude] = offset(startCoordinate, remaining, degrees)

						return { longitude: newLongitude, latitude: newLatitude }
					}
				}
			}
		}

		return null
	}
}
