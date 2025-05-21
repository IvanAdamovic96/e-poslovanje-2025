import type { BikeModel } from "./bike.model";

export interface BookmarkModel{
    bookmarkId: number,
    bikeId: number,
    bike: BikeModel,
    createdAt: string
    updatedAt: string
}