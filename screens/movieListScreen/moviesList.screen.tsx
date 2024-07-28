import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator, Pressable } from "react-native";
import { useGetMovies } from "./customHook/useGetMoviesData";
import { Movie } from "../../interface/movie.interface";
import { ApiService } from "../../utility/api.service";
import { useState } from "react";
import { router } from "expo-router";

const MoviesListScreen = ({ category }: { category: string }) => {

    const [page, setPage] = useState(1);
    const { state } = useGetMovies({ page: page, category: category });

    const getMore = () => {

        if (state.page && state.total_pages && state.isLoading == false) {
            if (state.page < state.total_pages) {

                setPage(state.page + 1);
            }
        }

    }
    const renderFooter = () => {
        return state.isLoading ? <View style={styles.loadingStyle}>

            <ActivityIndicator size='large' color="grey"></ActivityIndicator>
        </View> : null;
    }
    const renderItem = ({ item }: { item: Movie }) => {

        return <Pressable onPress={() => { router.push({ pathname: 'movie-detail/[id]', params: { id: item.id } }) }} >
            <View style={styles.cardView}>
                <View style={styles.imageView}>
                    <Image style={styles.image} source={{ uri: ApiService.imageBaseUrl + item.poster_path }} />
                </View>
                <View>
                    {!!item.title && <Text style={styles.title}>{item.title}</Text>}
                    {!!item.overview && <Text style={styles.subTitle}>{item.overview}</Text>}
                    {!!item.release_date && <Text style={styles.date}>{item.release_date}</Text>}
                </View>
            </View>
        </Pressable>
    };
    return <>
        <View style={styles.mainPadding}>
            {!!state.error  && <Text style={styles.error}>{state.error}</Text>}
            {!!state.data && <FlatList onEndReachedThreshold={0} ListFooterComponent={renderFooter} onEndReached={getMore} keyExtractor={(item) => item.id.toString()} data={state.data} renderItem={renderItem}></FlatList>}
        </View>

    </>
}
export default MoviesListScreen;

const styles = StyleSheet.create({
    error: {

        color: "red",
        textAlign: 'center',
    },
    mainPadding: {
        padding: 10,
        flex: 1
    },
    cardView: {
        flexDirection: 'row',
        margin: 5

    },
    imageView: {
        marginRight: 10
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10
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
    loadingStyle: {
        marginVertical: 16,
        alignItems: 'center'
    }
})