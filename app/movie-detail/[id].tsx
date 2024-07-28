import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native"
import MovieDetailScreen from "../../screens/movieDetailScreen/movieDetailScreen";

const MovieDetail = ()=>{
    const { id } = useLocalSearchParams();
  return<>   
  <MovieDetailScreen id={id!.toString()}/>
  </>
}

export default MovieDetail;