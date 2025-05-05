export interface GanreModel{
    movieGanreId: number,
    movieId: number,
    ganreId: number,
    ganre: {
        ganreId: number,
        name: string,
        createdAt: string
    }

}