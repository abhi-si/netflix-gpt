import { useSelector } from "react-redux";
import lang from "../utils/LanguageConstant";

const GptSearchBar = () => {
  
    const langKey = useSelector((store) => store.config.lang);
    
    
  return (
    <div className="pt-[10%] flex justify-center">
      <form className=" bg-black  w-1/2 grid grid-cols-12 rounded-lg">
        <input
          type="text"
          className="p-4 m-4 rounded-lg col-span-9"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
