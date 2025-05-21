import type { BookmarkModel } from "./bookmark.model";

export interface UserModel {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    bookmarks: BookmarkModel[]
}