/* eslint camelcase: 0 */

declare module "openrouteservice" {
    export interface Geometry {
        coordinates: Array<number[]>;
        type: string;
    }

    export interface Step {
        distance: number;
        duration: number;
        type: number;
        instruction: string;
        name: string;
        way_points: number[];
    }

    export interface Summary {
        distance: number;
        duration: number;
    }

    export interface Engine {
        version: string;
        build_date: Date;
        graph_date: Date;
    }

    export interface Query {
        coordinates: Array<number[]>;
        profile: string;
        format: string;
    }

    export interface Metadata {
        attribution: string;
        service: string;
        timestamp: number;
        query: Query;
        engine: Engine;
    }

    export interface Segment {
        distance: number;
        duration: number;
        steps: Step[];
    }

    export interface Properties {
        segments: Segment[];
        summary: Summary;
        way_points: number[];
    }

    export interface Feature {
        bbox: number[];
        type: string;
        properties: Properties;
        geometry: Geometry;
    }

    export interface Routing {
        type: string;
        features: Feature[];
        bbox: number[];
        metadata: Metadata;
    }

}
