import type { BikeModel } from "@/models/bike.model";
import { useAxios } from "@/utils";

export class BikeService {
    static async getBikes() {
        return await useAxios('/bikes')
    }

    static async getBikeById(id: string) {
        return await useAxios(`/bikes/${id}`)
    }

    static async getBikeBrands() {
        return await useAxios('/bikes/brands')
    }

    static async createBike(model: BikeModel) {
        return await useAxios('/bikes', 'post', model)
    }

    static async updateBike(id: number, model: BikeModel) {
        return await useAxios(`/bikes/edit/${id}`, 'put', model)
    }

    static async deleteBikeById(id: number) {
        return await useAxios(`/bikes/${id}`, 'delete')
    }
}