import { useEffect, useReducer } from "react"
import { Movie } from "../../../interface/movie.interface"
import { ApiService } from "../../../utility/api.service"
import { MovieApiResponse, MoviesApiResponse } from "../../../interface/movieApiResponse.interface"

const initialState = {
    isLoading: true,
    data: undefined,
    error: undefined,
}
export type ReducerState={
    isLoading?: boolean,
    data?: Movie,
    error?: String,
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
            return {...state,data:action.payload.data!,isLoading: false };
        }
        case ActionType.ERROR: {
            return { ...state, isLoading: false, error: action.payload!.error };
        }
        default:
            return state
    }
}
export const useGetMovieDetailData=({id}:{id:String})=>{
    const api = new ApiService();
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
     
        dispatch({ type: ActionType.API_REQUEST, payload: {} });

        api.fetchMovie({id}).then((movie?:Movie) => {
            if (movie) {
                dispatch({ type: ActionType.FETCH_DATA, payload: { data: movie, isLoading: false } });
            }
        }).catch((error) => {
          
            dispatch({ type: ActionType.ERROR, payload: { isLoading: false, error: error.message } })
        })
    }, [])
   
    return {state};
}
