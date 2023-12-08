

const VideoTitle = ({ title, overview }) => {
  console.log("yes ");
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/2">{overview}</p>
      <div className="my-4 md:m-0">
        <button className="bg-white text-xl text-black py-1 md:py-4 px-3 rounded-lg font-bold hover:bg-opacity-80">
          ▷Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 mx-4 text-xl text-white px-16 p-4 rounded-lg bg-opacity-60 hover:bg-opacity-80">
          More info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;
