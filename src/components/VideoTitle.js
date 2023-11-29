

const VideoTitle = ({title,overview}) => {
  return (
    <div className="pt-36 px-14">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/2">{overview}</p>
      <div className="">
        <button className="bg-gray-500 text-xl text-black px-10 p-4 rounded-lg bg-opacity-50">
          ▷Play
        </button>
        <button className="bg-gray-500 mx-4 text-xl text-white px-16 p-4 rounded-lg bg-opacity-60">
          More info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle
