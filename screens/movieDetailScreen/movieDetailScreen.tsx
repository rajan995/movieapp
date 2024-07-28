import { Stack } from "expo-router";
import { View, StyleSheet, Image, Text, ActivityIndicator, ScrollView } from "react-native";
import { useGetMovieDetailData } from "./customHook/useGetMovieDetailData";
import { ApiService } from "../../utility/api.service";
import { Movie } from "../../interface/movie.interface";

const MovieDetailScreen = ({ id }: { id: String }) => {
    const { state } = useGetMovieDetailData({ id });

    const ShowMovieDetail = ({ movie }: { movie: Movie }) => {

        return <ScrollView>
            <View >
                <Image style={styles.image} source={{ uri: ApiService.imageBaseUrl + movie.poster_path }} />
                <View style={styles.contextPadding}>
                    {!!movie.title && <Text style={styles.title}> {movie.title}</Text>}
                    {!!movie.title && <Text style={styles.subTitle}> {movie.overview}</Text>}
                    {!!movie.title && <Text style={styles.date}> {movie.release_date}</Text>}
                </View>
            </View>
        </ScrollView>
    }
    
    return <>
        <Stack.Screen options={{ headerTitleAlign: 'center', title: state.data?.title || "Loading...", headerShown: true }} />
        <View style={styles.mainPadding}>

            {!!state.error && <Text style={styles.error}>{state.error}</Text>}
            {!!state.isLoading && <ActivityIndicator size='large' color="grey"></ActivityIndicator>}
            {!!state.data && <ShowMovieDetail movie={state.data!} />}
        </View>
    </>;
}
export default MovieDetailScreen;


const styles = StyleSheet.create({
    error: {
        color: "red",
        textAlign: 'center',

    },
    mainPadding: {
        flex: 1
    },
    loadingStyle: {
        marginVertical: 16,
        alignItems: 'center'
    },
    image: {
        width: "100%",
        height: 500,


    },
    contextPadding: {
        padding: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10
    },
    subTitle: {

        fontSize: 12,
        marginTop: 10
    },
    date: {
        fontSize: 10,
        marginTop: 5
    },
});

