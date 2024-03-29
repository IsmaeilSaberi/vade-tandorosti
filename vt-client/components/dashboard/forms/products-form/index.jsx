"use client";
import { useState, useEffect } from "react";
import AllProducts from "./all-products";
import NewProduct from "./new-product";
import ProductDetails from "./product-details";

const ProductMain = () => {
  const [productDetailCtrl, setProductDetailCtrl] = useState("");
  const [randNumForProductClick, setRandNumForProductClick] = useState(1);
  const [details, setDetails] = useState(
    <AllProducts
      setRandNumForProductClick={setRandNumForProductClick}
      setProductDetailCtrl={setProductDetailCtrl}
    />
  );

  useEffect(() => {
    if (productDetailCtrl != "") {
      setDetails(<ProductDetails productId={productDetailCtrl} />);
    }
  }, [randNumForProductClick]);

  return (
    <div className="flex flex-col gap-10 relative pt-4 md:pt-8">
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg"> محصولات</h1>
        <div className="flex justify-between md:justify-end items-center gap-10 md:gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllProducts
                  setRandNumForProductClick={setRandNumForProductClick}
                  setProductDetailCtrl={setProductDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded bg-[#2357b1] text-white transition-all duration-200 hover:bg-[#b17d23]"
          >
            همه
          </button>
          <button
            onClick={() => setDetails(<NewProduct />)}
            className="flex justify-center items-center w-32 h-10 rounded bg-[#2357b1] text-white transition-all duration-200 hover:bg-[#b17d23]"
          >
            محصول جدید
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default ProductMain;
