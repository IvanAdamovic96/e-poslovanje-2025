import type { BikeModel } from "@/models/bike.model";

import { UserService } from "./user.service";

export class BikeService {
    static async getBikes() {
        return await UserService.useAxios<BikeModel[]>('/bikes')
    }

    static async getBikeById(id: string) {
        return await UserService.useAxios<BikeModel>(`/bikes/${id}`)
    }

    static async getBikeBrands() {
        return await UserService.useAxios<BikeModel[]>('/bikes/brands')
    }

    static async createBike(model: BikeModel) {
        return await UserService.useAxios('/bikes', 'post', model)
    }

    static async updateBike(id: number, model: BikeModel) {
        return await UserService.useAxios(`/bikes/edit/${id}`, 'put', model)
    }

    static async deleteBikeById(id: number) {
        return await UserService.useAxios(`/bikes/${id}`, 'delete')
    }
}