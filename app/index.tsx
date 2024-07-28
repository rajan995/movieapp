import { Stack } from 'expo-router';
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MoviesListScreen from '../screens/movieListScreen/moviesList.screen';


const renderScene = SceneMap({
  now_playing:()=> MoviesListScreen({category:"now_playing"}),
  popular:()=> MoviesListScreen({category:"popular"}),
  top_rated:()=> MoviesListScreen({category:"top_rated"}),
  upcoming:()=> MoviesListScreen({category:"upcoming"}),

});

export default function Home() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'now_playing', title: 'Now Playing' },
    { key: 'popular', title: 'Popular' },
    { key: 'top_rated', title: 'Top Rated' },
    { key:"upcoming",title:"Upcoming"}
  ]);

  return (
    <>
    <Stack.Screen options={{ title:"Home",headerShown:true,headerTitleAlign:'center'}}/>
    <TabView
    lazy={true}
    
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <TabBar {...props} labelStyle={{fontSize:12}} style={{backgroundColor: 'blue'}}/>}
    />
  </>
  );
}

