import {useGetMovies} from '../screens/movieListScreen/customHook/useGetMoviesData';
import { renderHook ,waitFor} from "@testing-library/react";
describe("dispatch use effect hook",()=>{
  
 test("Test initial loading",async()  => {
   global.fetch = jest.fn();
  const  data = renderHook(()=> useGetMovies({page:1,category:"now_playing"}));
  expect(data.result.current.state.isLoading).toBeTruthy();
 
});
  test("Test loading status after resolve promise",async()  => {
   global.fetch = jest.fn();
  const  data = renderHook(()=> useGetMovies({page:1,category:"now_playing"}));
  await waitFor(() => {
   expect(data.result.current.state.isLoading).toBeFalsy();

  })

})
 
})