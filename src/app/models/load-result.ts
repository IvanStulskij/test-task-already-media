import { INasaObject } from "./nasa-object";

export interface LoadResult {
    data: INasaObject[],
    totalCount: number
}