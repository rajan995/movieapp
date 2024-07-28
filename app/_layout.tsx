import { Stack } from "expo-router";
export default function RootLayout (){
     return <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" options={{headerTitle:'Home'}}/>
        <Stack.Screen name="movie-detail/[id]" />
     </Stack>
}
