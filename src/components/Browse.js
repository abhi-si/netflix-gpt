import Header from "./Header";
// Import custom hooks for fetching movie data from the respective files
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies"
import useTopRatedMovies from "../hooks/useTopRatedMovies";

import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";


const Browse = () => {
// Call the custom hook to fetch and handle "Now Playing" movies and so on....
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();

 
 return (
   <div>
     <Header />
     <MainContainer />
     <SecondaryContainer />
    </div>
  );
}

export default Browse;
