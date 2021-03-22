import { Challenge } from "@/domain/challenge"
import { MarkerIcon } from "@/domain/marker"

import { MapService } from "./mapService"

import Map from "ol/Map"

export class ChallengeService {
	private mapService: MapService;
	constructor() {
		this.mapService = new MapService()
	}

	public load(id: string): Challenge {
		// TODO: AJAX

		const challenge: Challenge = {
			startPosition: { longitude: 12.3248, latitude: 58.3797 },
			endPosition: { longitude: 17.9409, latitude: 62.6323 },
			startDate: new Date(),
			players: [
				{
					name: "Mikael",
					avatar: "https://muratselek.com.tr/wp-content/uploads/2019/01/yorum-icon-avatar-men-50x50.png",
					lastMovement: new Date(),
					totalDistance: 219000 // 219km == Örebro
				},
				{
					name: "Andreas",
					avatar: "https://muratselek.com.tr/wp-content/uploads/2019/01/yorum-icon-avatar-50x50.png",
					lastMovement: new Date(),
					totalDistance: 313000 // 313km == Västerås
				}
			]
		}

		return challenge
	}

	public async render(challenge: Challenge, map: Map): Promise<void> {
		const routing = await this.mapService
			.getDirections(
				challenge.startPosition,
				challenge.endPosition
			)

		if (!routing) {
			console.log("no routing found")
			return
		}

		this.mapService.addDirections(map, routing)
		this.mapService.setCenter(map, routing)

		this.mapService.addMarker(map, {
			position: challenge.startPosition,
			icon: MarkerIcon.Start
		})

		this.mapService.addMarker(map, {
			position: challenge.endPosition,
			icon: MarkerIcon.Finish
		})

		for (const player of challenge.players) {
			const position = this.mapService.addDistanceOnRoute(routing, player.totalDistance)
			if (position) {
				this.mapService.addMarker(map, {
					position: position,
					tooltip: player.name,
					icon: player.avatar
				})
			}
		}
	}
}
