import { UUID } from "crypto";

export interface INasaObject {
    dbId: string,
    id: number;
    name: string;
    nameType: string;
    recclass: string;
    mass: number;
    fall: string;
    year: Date;
    reclat: number;
    reclong: number;
    geolocation: Geolocation
}

interface Geolocation {
    type: string;
    coordinates: number[]
}