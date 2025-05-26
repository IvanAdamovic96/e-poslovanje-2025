import { useAxios } from "@/utils";

export class BookmarkService {
    static async createBookmark(id: number) {
        return await useAxios(`/bookmark/bikes/${id}`, 'post')
    }

    static async deleteBookmark(id: number){
        return await useAxios(`/bookmark/${id}`, 'delete')
    }
}