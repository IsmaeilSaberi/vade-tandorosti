"use client";
import Image from "next/image";

const Box = ({ data, setMiddleBannerDetailCtrl, setRandNumForBannerClick }) => {
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={() => {
        goToTop();
        setMiddleBannerDetailCtrl(data._id);
        setRandNumForBannerClick(Math.random());
      }}
      className="relative flex justify-between items-center w-full cursor-pointer p-6 rounded-lg border-2 border-zinc-200 bg-[#9bf5d4] transition-all duration-200 hover:border-orange-500"
    >
      <div className="flex justify-start items-center">
        <Image
          className="rounded-lg"
          alt={data.imageAlt}
          src={data.image}
          title={data.imageAlt}
          width={400}
          height={200}
        />
      </div>
      <div className="flex items-center gap-2 absolute bottom-5 left-5">
        {data.situation == true ? (
          <div className="text-xs bg-green-500 text-white px-2 py-1 rounded">
            روشن
          </div>
        ) : (
          <div className="text-xs bg-rose-500 text-white px-2 py-1 rounded">
            خاموش
          </div>
        )}
        <div className="text-xs bg-[#b17d23] text-white px-2 py-1 rounded">
          {data.date}
        </div>
      </div>
    </div>
  );
};

export default Box;
