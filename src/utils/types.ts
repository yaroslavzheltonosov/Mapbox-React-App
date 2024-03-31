import { Dispatch, SetStateAction } from "react";

export type MapValues = {
    longitude: number;
    latitude: number;
}

type Polygon = {
    coords: number[][];
    readonly id: string;
};

type SavedPolygon = {
    name: string;
} & Pick<Polygon, 'coords' | 'id'>

export type PolygonStorage = Polygon | SavedPolygon;

export type PolygonContextT = {
    stateContext: PolygonStorage[];
    setStateContext: setStateContextT;
}
export type setStateContextT = Dispatch<SetStateAction<Array<PolygonStorage>>>;