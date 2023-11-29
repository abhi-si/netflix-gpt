import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
 return (
    <div>
     <Header />
     <MainContainer />
     <SecondaryContainer />
     {/* 
     main video container
     video bg
     video title
     secondary conatiner
     movies cards
      */}
      
    </div>
  );
}

export default Browse;
