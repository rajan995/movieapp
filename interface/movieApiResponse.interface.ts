import { Movie } from "./movie.interface";

export interface MoviesApiResponse{
    page: number,
    total_pages:number,
    total_results:number,
    results:Movie[]
}
export interface MovieApiResponse{
    
    results:Movie
}