"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const NewSlider = () => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  const imageUrlRef = useRef();
  const imageAltRef = useRef();
  const imageLinkRef = useRef();
  const imageSituationRef = useRef();
  const sorterRef = useRef();

  const formKeyNotSuber = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const submitter = (e) => {
    e.preventDefault();
    const formData = {
      image: imageUrlRef.current.value,
      imageAlt: imageAltRef.current.value,
      situation: imageSituationRef.current.value,
      sorter: sorterRef.current.value,
      link: imageLinkRef.current.value,
      date: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/new-slider`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        formData.situation == "true"
          ? toast.success("اسلایدر با موفقیت ذخیره و منتشر شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success("اسلایدر با موفقیت به صورت خاموش ذخیره شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
      })
      .catch((err) => {
        let message = "خطایی در ذخیره و ایجاد اسلایدر رخ داد.";
        if (err.response.data.msg) {
          message = err.response.data.msg;
        }
        toast.error(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-orange-500 text-lg">اسلایدر جدید</h2>
      <form
        onSubmit={submitter}
        onKeyDown={formKeyNotSuber}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <div>آدرس عکس</div>
          <input
            required={true}
            type="text"
            ref={imageUrlRef}
            className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>آلت عکس</div>
          <input
            type="text"
            required={true}
            ref={imageAltRef}
            className="p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>لینک عکس</div>
          <input
            type="text"
            required={true}
            ref={imageLinkRef}
            className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>سورتر اسلایدر</div>
          <input
            type="number"
            required={true}
            ref={sorterRef}
            className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>روشن یا خاموش</div>
          <select
            ref={imageSituationRef}
            className="p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
          >
            <option value="true">روشن</option>
            <option value="false">خاموش</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#2357b1] p-2 w-full rounded text-white transition-all duration-200 hover:bg-[#b17d23]"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default NewSlider;
