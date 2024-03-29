"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const UserDetails = ({ userId }) => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  // the part for prevent for submitting with enter key
  const formKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  /// go to top or scroll up smoothly function
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewedRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const displaynameRef = useRef();
  const activateCodeRef = useRef();
  const userIsActiveRef = useRef();
  const emailSendRef = useRef();
  const activateCodeSendingNumberRef = useRef();

  // this part used for getting one user details for using in default values
  const [fullData, setFullData] = useState([-1]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-user/${userId}`, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        setFullData(d.data);
        goToTop();
      })
      .catch((err) =>
        toast.error("خطا در لود اطلاعات!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  }, [userId]);

  // here we update a user details
  const updater = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
    e.preventDefault();
    // CART, COMMENTS, PAYMENTS AND FILES SHOULD BE ADDED
    const formData = {
      updatedAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      email: emailRef.current.value,
      viewed: viewedRef.current.value,
      username: usernameRef.current.value,
      displayname: displaynameRef.current.value,
      activateCode: activateCodeRef.current.value,
      userIsActive: userIsActiveRef.current.value,
      emailSend: emailSendRef.current.value,
      activateCodeSendingNumber: activateCodeSendingNumberRef.current.value,
    };
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/update-user/${userId}`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        toast.success("کاربر با موفقیت آپدیت شد.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        let message = "خطایی در آپدیت و ذخیره کاربر رخ داد.";
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

  // this part is used to delete a user
  const remover = (e) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/remove-user/${userId}`;
    axios
      .post(
        url,
        { item: 1 },
        {
          headers: { auth_cookie: auth_cookie },
        }
      )
      .then((d) =>
        toast.success("کاربر با موفقیت حذف شد.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((err) =>
        toast.error("حذف موفقیت آمیز نبود!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  // this part is used to uncheck a payment
  const paymentUnchecker = (goalId) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/uncheck-payment/${goalId}`;
    axios
      .get(url, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) =>
        toast.success("به بخش سفارش های جدید افزوده شد.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((err) => {
        toast.error("متاسفانه ناموفق بود!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // this part is used to uncheck a comment
  const commentUnchecker = (goalId) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/uncheck-comment/${goalId}`;
    axios
      .get(url, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) =>
        toast.success("به بخش دیدگا ههای افزوده شد.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((err) => {
        toast.error("متاسفانه ناموفق بود!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  //// MAKE PRICE NUMBER BEAUTIFUL
  function priceChanger(num) {
    // Convert the number to a string
    num = num.toString();
    // Split the string into an array of three-digit chunks
    let chunks = [];
    while (num.length > 0) {
      chunks.push(num.slice(-3));
      num = num.slice(0, -3);
    }
    // Reverse the order of the chunks and join them with commas
    return chunks.reverse().join(",");
  }

  return (
    <div className="flex flex-col gap-6">
      {fullData[0] == -1 ? (
        <div className="flex justify-center items-center p-12">
          <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-orange-500 text-lg">جزئیات کاربر</h2>
            <div className="flex justify-end items-center gap-2">
              <button
                onClick={() => remover()}
                className="bg-rose-500 text-white px-3 py-1 rounded text-xs transition-all duration-200 hover:bg-rose-600"
              >
                حذف
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
            <div className="bg-[#e5fcde] rounded px-3 py-1 text-sm flex justify-center items-center gap-2">
              {fullData._id ? fullData._id : ""}
            </div>
            <div className="bg-[#e5fcde] rounded px-3 py-1 text-sm flex justify-center items-center gap-2">
              <div>تاریخ ایجاد :</div>
              <div>{fullData.createdAt ? fullData.createdAt : ""}</div>
            </div>
            <div className="bg-[#e5fcde] rounded px-3 py-1 text-sm flex justify-center items-center gap-2">
              <div> به روز رسانی :</div>
              <div>{fullData.updatedAt ? fullData.updatedAt : ""}</div>
            </div>
          </div>
          <form
            onKeyDown={formKeyNotSuber}
            onSubmit={updater}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <div>دیده شده</div>
              <select
                ref={viewedRef}
                className="p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              >
                {fullData.viewed && fullData.viewed == true ? (
                  <>
                    <option value="true">دیده شده</option>
                    <option value="false">دیده نشده</option>
                  </>
                ) : (
                  <>
                    <option value="false">دیده نشده</option>
                    <option value="true">دیده شده</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>ایمیل کاربر</div>
              <input
                defaultValue={fullData.email ? fullData.email : ""}
                required={true}
                type="text"
                ref={emailRef}
                className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>محصولات مورد علاقه</div>
              {fullData.favoriteProducts.length < 1 ? (
                <div>بدون محصول مورد علاقه!</div>
              ) : (
                <div className="flex justify-start items-center gap-4 text-xs flex-wrap">
                  {fullData.favoriteProducts.map((da, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-4 bg-[#e5fcde] rounded p-4"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div>آیدی :</div>
                        <div>{da._id}</div>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <div>عنوان :</div>
                        <div>{da.title}</div>
                      </div>
                      <div className="flex justify-end">
                        <Link
                          href={`/shop/${da.slug}`}
                          target={"_blank"}
                          className="flex justify-center items-center rounded w-12 h-6 text-xs text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                        >
                          لینک
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>سبد خرید</div>
              {fullData.cart.length < 1 ? (
                <div>محصولی در سبد خرید وجود ندارد!</div>
              ) : (
                <div className="flex justify-start items-center gap-4 text-xs flex-wrap">
                  {fullData.cart.map((da, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-4 bg-[#e5fcde] rounded p-4"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div>آیدی :</div>
                        <div>{da._id}</div>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <div>عنوان :</div>
                        <div>{da.title}</div>
                      </div>
                      <div className="flex justify-end">
                        <Link
                          href={`/shop/${da.slug}`}
                          target={"_blank"}
                          className="flex justify-center items-center rounded w-12 h-6 text-xs text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                        >
                          لینک
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>محصولات خریداری شده</div>
              {fullData.userProducts.length < 1 ? (
                <div>محصولی در محصولات خریداری شده وجود ندارد!</div>
              ) : (
                <div className="flex justify-start items-center gap-4 text-xs flex-wrap">
                  {fullData.userProducts.map((da, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-4 bg-[#e5fcde] rounded p-4"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div>آیدی :</div>
                        <div>{da._id}</div>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <div>عنوان :</div>
                        <div>{da.title}</div>
                      </div>
                      <div className="flex justify-end">
                        <Link
                          href={`/shop/${da.slug}`}
                          target={"_blank"}
                          className="flex justify-center items-center rounded w-12 h-6 text-xs text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                        >
                          لینک
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>سفارش ها</div>
              {fullData.payments.length < 1 ? (
                <div>سفارشی وجود ندارد!</div>
              ) : (
                <div className="flex justify-start items-center gap-4 text-xs flex-wrap">
                  {fullData.payments.map((da, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-4 bg-[#e5fcde] rounded p-4"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div>مبلغ :</div>
                        <div>{priceChanger(da.amount)} تومان</div>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <div>وضعیت :</div>
                        <div>
                          {da.payed == true ? (
                            <div className="text-green-500">پرداخت شده</div>
                          ) : (
                            <div className="text-red-500">پرداخت نشده</div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <div>تاریخ :</div>
                        <div>{da.createdAt}</div>
                      </div>
                      <div
                        onClick={() => paymentUnchecker(da._id)}
                        className="bg-blue-500 text-white rounded p-1 text-sm cursor-pointer hover:bg-blue-600 transition-all duration-200"
                      >
                        نمایش در بخش سفارش های جدید
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>دیدگاهها</div>
              {fullData.comments.length < 1 ? (
                <div>دیدگاهی وجود ندارد!</div>
              ) : (
                <div className="flex justify-center items-center gap-4 text-xs flex-wrap">
                  {fullData.comments.map((da, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-between gap-4 bg-[#e5fcde] rounded p-4 w-full md:w-[48%] min-h-[13rem]"
                    >
                      <div className="flex justify-start items-center gap-2">
                        <div>مرجع :</div>
                        <div>
                          {da.typeOfModel == "post" ? "مقاله" : "محصول"}
                        </div>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <div>تاریخ :</div>
                        <div>{da.createdAt}</div>
                      </div>
                      <div className="flex justify-start items-start gap-2">
                        <div className="min-w-8 w-8">متن :</div>
                        <div className="text-justify w-full leading-6">
                          {da.message}
                        </div>
                      </div>
                      <div
                        onClick={() => commentUnchecker(da._id)}
                        className="bg-blue-500 text-white text-center rounded p-1 text-sm cursor-pointer hover:bg-blue-600 transition-all duration-200"
                      >
                        نمایش در بخش دیدگاههای جدید
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>نام کاربری (username)</div>
              <input
                defaultValue={fullData.username ? fullData.username : ""}
                required={true}
                type="text"
                ref={usernameRef}
                className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>نام نمایشی (displayname)</div>
              <input
                defaultValue={fullData.displayname ? fullData.displayname : ""}
                required={true}
                type="text"
                ref={displaynameRef}
                className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>کد فعال سازی</div>
              <input
                defaultValue={
                  fullData.activateCode ? fullData.activateCode : ""
                }
                required={true}
                type="text"
                ref={activateCodeRef}
                className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>تعداد باقی مانده ارسال کد فعال سازی به کاربر</div>
              <input
                defaultValue={
                  fullData.activateCodeSendingNumber
                    ? fullData.activateCodeSendingNumber
                    : 0
                }
                required={true}
                type="number"
                ref={activateCodeSendingNumberRef}
                className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>کاربر فعال</div>
              <select
                ref={userIsActiveRef}
                className="p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              >
                {fullData.userIsActive && fullData.userIsActive == true ? (
                  <>
                    <option value="true">فعال</option>
                    <option value="false">غیرفعال</option>
                  </>
                ) : (
                  <>
                    <option value="false">غیر فعال</option>
                    <option value="true">فعال</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>وضعیت ارسال ایمیل تبلیغاتی</div>
              <select
                ref={emailSendRef}
                className="p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              >
                {fullData.emailSend && fullData.emailSend == true ? (
                  <>
                    <option value="true">ارسال می شود</option>
                    <option value="false">ارسال نمی شود</option>
                  </>
                ) : (
                  <>
                    <option value="false">ارسال نمی شود</option>
                    <option value="true">ارسال می شود</option>
                  </>
                )}
              </select>
            </div>
            <button
              type="submit"
              className="bg-[#2357b1] p-2 w-full rounded text-white transition-all duration-200 hover:bg-[#b17d23]"
            >
              بروز رسانی
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
