import { useEffect, useReducer } from "react";
import { Movie } from "../../../interface/movie.interface";
import { ApiService } from "../../../utility/api.service";
import { MoviesApiResponse } from "../../../interface/movieApiResponse.interface";

const initialState: ReducerState = {
    isLoading: true,
    data: [],
    error: undefined,
    page: 1,
    total_pages: undefined,

}

export type ReducerState = {
    isLoading?: boolean,
    data?: Movie[],
    error?: String,
    page?: number,
    total_pages?: number,
    
}
enum ActionType {
    API_REQUEST,
    FETCH_DATA,
    ERROR
}

type ReducerAction = {
    type: ActionType,
    payload: ReducerState
}
function reducer(state: ReducerState, action: ReducerAction) {
    switch (action.type) {
        case ActionType.API_REQUEST: {
            return { ...state, isLoading: true };
        }
        
        case ActionType.FETCH_DATA: {
            return {...state,data:[...state.data!,...action.payload.data!],isLoading: false,total_pages:action.payload.total_pages,page:action.payload.page };
        }
        case ActionType.ERROR: {
            return { ...state, isLoading: false, error: action.payload!.error };
        }
        default:
            return state
    }
}

export const useGetMovies =  ({page,category}:{page:number,category:string}) => {
    
    const api = new ApiService();
    
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
     
        dispatch({ type: ActionType.API_REQUEST, payload: {} });

        api.fetchMovies({page,category}).then((data?: MoviesApiResponse) => {
            if (data) {
             
                dispatch({ type: ActionType.FETCH_DATA, payload: { data: data.results, isLoading: false, page: data.page, total_pages: data.total_pages } });
            }
        }).catch((error) => {
            dispatch({ type: ActionType.ERROR, payload: { isLoading: false, error: error.message } })
        })
    }, [page])

    return {state};
}
