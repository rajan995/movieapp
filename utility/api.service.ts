import { Movie } from "../interface/movie.interface";
import { MoviesApiResponse } from "../interface/movieApiResponse.interface";
export class ApiService {
    token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2I4MjI0NWMzZTk5YTgxZjkwZjAzMGM5Nzg0OGJkYiIsIm5iZiI6MTcyMjAwNDI2Ny41OTczODEsInN1YiI6IjY2YTNiMjc1MWFiMTk5NDZlNDI2ODcxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ISrhsfjPI38wiVXMQGDXoSWJ8mdl_CthbOas6MUR2Y"
   
    static imageBaseUrl = "https://image.tmdb.org/t/p/original"
    baseUrl = "https://api.themoviedb.org/3/movie"
    fetchMovies = async ({page,category}:{page:number,category:string}) => {
        try {
            const response = await fetch(
                `${this.baseUrl}/${category}?language=en-US&page=${page}`,
                {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': this.token,
                        'Content-Type': "application/json"
                    })
                }

            );
            if(response.status == 200){
            const json = (await response.json()) as MoviesApiResponse;

            return json;
            }else{
                const json =await response.json();
                 throw new Error(json.status_message);
            }
        }  catch ( { name, message }:any ) {
                 
            throw new Error(message);
            
        }
    }

    fetchMovie = async ({id}:{id:String}) => {
        try {
            const response = await fetch(
                `${this.baseUrl}/${id}`,
                {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': this.token,
                        'Content-Type': "application/json"
                    })
                }

            );
        
            if(response.status == 200){
            const json = (await response.json()) as Movie;
            return json;
            }else{
                const json =await response.json();
                 throw new Error(json.status_message);
            }
        } catch ( { name, message }:any ) {
                 
            throw new Error(message);
            
        }
    }
}

