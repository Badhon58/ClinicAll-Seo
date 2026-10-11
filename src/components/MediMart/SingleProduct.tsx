"use client";
import React, { useEffect, useState } from "react";
import { Item, NewProduct, ProductPack } from "./Interface";
import Image from "next/image";
import Link from "next/link";
import MediCart from "./MediCart";
import "./Style.css";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { addToCart, removeSingleCount } from "@/redux/Slices/CartSlicer";
import MediHeadTag from "@/components/MediMart/MediHeadTag";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import { useTranslation } from "react-i18next";
import {
  singleaddToCart,
  singleclearCart,
  singleremoveSingleCount,
} from "@/redux/Slices/SingleCartSlicer";
import { toast } from "react-toastify";
// import ShopMoreButton from "@/lib/ShopMoreButton";
type SingleProductProps = {
  productType: string;
  productId: string;
};
const SingleProduct = ({ productType, productId }: SingleProductProps) => {
  // State
  // console.log("single Product");
  // console.log("");

  const [singleproduct, setSingleproduct] = useState<NewProduct>();
  const [relatedProduct, setRelatedProduct] = useState<NewProduct[]>();
  const [NewProductvalue, setNewProduct] = useState<NewProduct | undefined>();
  const [loading, setLoading] = useState(true);
  const [selectvariationIndex, setSelectvariationIndex] = useState(1);
  const [singleProductCount, setSingleProductCount] = useState(1);
  const [total_price, setTotal_price] = useState<number>(0);
  // Hooks
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Selectors
  const productItem = useAppSelector((state) => state.CartSlicer.cartitems);
  const added = productItem.some(
    (product) => product._id == singleproduct?._id
  );
  const producttotalCost = useAppSelector(
    (state) => state.singleCartSlice.cartTotalAmount
  );
  const Cartqunatity = useAppSelector(
    (state) =>
      state.CartSlicer.cartitems.find((item) => item._id === productId)
        ?.quantity ?? 0
  );

  // Constants
  const MIN_ORDER_AMOUNT = 300;
  const DISCOUNT_THRESHOLD = 8;
  const DISCOUNT_MULTIPLIER = 0.95;
  const pathname = usePathname();

  const init = async () => {
    try {
      setLoading(true);
      dispatch(singleclearCart());
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.MEDICINE_GET_SINGLE_SLUG}/${productId}`
      );
      if (response.success) {
        setSingleproduct(response.data);
        setNewProduct(response.data);
        setRelatedProduct(response.data.relatedProduct);
        if (Number(response.data.discount_percentage) >= 8) {
          let price = Number(response.data.price) * 0.95;
          setTotal_price(price);
        } else {
          setTotal_price(Number(response.data.price));
        }
      } else {
        const segments = pathname.split("/");
        const newPath = `/${segments[1]}/${segments[2]}`;
        router.push(newPath);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    if (!singleproduct) return;
    dispatch(singleclearCart());
    const price =
      singleproduct.discount_percentage! >= 8
        ? Number(Number(singleproduct.price) * (1 - 0.05)).toFixed(2)
        : Number(singleproduct.price);
    const productItem: NewProduct = {
      ...singleproduct,
      price: price.toString(),
      mrp: singleproduct.price,
    };
    // toast.success("Success")
    console.log("Total Cost : " + total_price);
    // console.log("Cart Total Cost : " + producttotalCost);

    if (total_price <= 300) {
      toast.dismiss("min-order-toast");
      toast.warning(
        "Minimum order amount is ৳300. Add more items to proceed.",
        {
          toastId: "min-order-toast",
        }
      );
      return;
    }
    for (let i = 0; i < singleProductCount; i++) {
      if (selectvariationIndex == 1) {
        dispatch(singleaddToCart(productItem));
      } else {
        dispatch(singleaddToCart(NewProductvalue!));
      }
    }
    // return;
    router.push(`/checkout/${productType}/${singleproduct.product_name}`);
  };

  const handleselectVariation = (
    e: React.MouseEvent<HTMLDivElement>,
    num: number,
    variation: any
  ) => {
    e.preventDefault();
    if (added) return;
    setSelectvariationIndex(num);
    if (!singleproduct) return;
    // setup the Product Name
    const formattedName = variation.pack_type
      ? `${singleproduct.product_name} (${variation.pack_type})`
      : singleproduct.product_name;

    // calculate with discount
    let basePrice: number = 0,
      price: number = 0;
    let discount: number = Number(singleproduct?.discount_percentage);
    if (num === 1) {
      basePrice = variation.price;
    } else {
      basePrice = variation.pack_price;
    }
    if (discount >= 8) {
      price = basePrice * 0.95;
    }
    // set the total Price
    setTotal_price(price * singleProductCount);

    // formatting a new Product

    const productItem: NewProduct = {
      ...singleproduct,
      _id: singleproduct._id,
      product_name: formattedName,
      price: price.toString(),
      otc: singleproduct.otc || singleproduct.type,
      discount_percentage:
        singleproduct.discount_percentage ?? singleproduct.discount_percentage,
      medicineVariation: variation._id,
    };
    setNewProduct(productItem);
  };

  const handlePlus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSingleProductCount((prev) => prev + 1);
    if (!singleproduct) return;
    const price =
      singleproduct.discount_percentage! >= 8
        ? Number(Number(singleproduct.price) * (1 - 0.05)).toFixed(2)
        : Number(singleproduct.price);
    const secoundprice =
      NewProductvalue?.discount_percentage! >= 8
        ? Number(Number(NewProductvalue?.price) * (1 - 0.05)).toFixed(2)
        : Number(NewProductvalue?.price);
    if (total_price >= 0) {
      if (selectvariationIndex === 1) {
        setTotal_price((prev) => prev + Number(price));
      } else {
        setTotal_price((prev) => prev + Number(secoundprice));
      }
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!singleproduct) return;
    setSingleProductCount((prev) => prev - 1);
    const price =
      singleproduct.discount_percentage! >= 8
        ? Number(Number(singleproduct.price) * (1 - 0.05)).toFixed(2)
        : Number(singleproduct.price);
    const secoundprice =
      NewProductvalue?.discount_percentage! > 8
        ? Number(Number(NewProductvalue?.price) * (1 - 0.05)).toFixed(2)
        : Number(NewProductvalue?.price);
    if (total_price >= 0) {
      if (selectvariationIndex === 1) {
        setTotal_price((prev) => prev - Number(price));
      } else {
        setTotal_price((prev) => prev - Number(secoundprice));
      }
    }
  };

  const handleAddedToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!singleproduct) return;
    const price =
      singleproduct.discount_percentage! >= 8
        ? Number(Number(singleproduct.price) * (1 - 0.05)).toFixed(2)
        : Number(singleproduct.price).toFixed(2);
    const productItem: NewProduct = {
      ...singleproduct,
      price: price.toString(),
    };

    if (singleProductCount > Cartqunatity) {
      for (let i = Cartqunatity; i < singleProductCount; i++) {
        if (selectvariationIndex == 1) {
          dispatch(addToCart(productItem));
        } else {
          dispatch(addToCart(NewProductvalue!));
        }
      }
      // console.log("Adding Value in RTK sing>cart");
    } else if (singleProductCount < Cartqunatity) {
      for (let i = Cartqunatity; i > singleProductCount; i--) {
        if (selectvariationIndex == 1) {
          dispatch(addToCart(productItem));
        } else {
          dispatch(addToCart(NewProductvalue!));
        }
      }
      // console.log("Adding Value in RTK sing<cart");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <PageLoading />
  ) : (
    <section className="xl:container xl:mx-auto">
      <div className="xl:my-5 lg:my-2.5 grid lg:grid-cols-2 px-3 lg:px-0 mt-2 gap-8 2xl:gap-16 lg:mx-3 xl:mx-6 2xl:px-0 ">
        <aside className="relative lg:w-full  xl:w-[80%] 2xl:w-11/12 mx-auto ">
          <Image
            alt={singleproduct?.product_name || "This is an Image"}
            width={412}
            height={263}
            src={
              singleproduct?.images
                ? singleproduct.images
                : "/homeLogo/MediMart.svg"
            }
            className="2xl:w-[702px] xl:w-[500px] lg:w-full lg:h-[300px] h-[260px] xl:h-[300px] w-[340px] delay-300 duration-700 2xl:h-[383px] px-6 py-3 lg:px-40 lg:py-14 bg-[#FFF4F4] rounded-lg "
          />

          <div className="grid grid-cols-3 gap-3 mt-2 lg:grid-cols-4 2xl:grid-cols-5">
            <Image
              alt={singleproduct?.product_name || ""}
              width={120}
              height={100}
              src={
                singleproduct?.images
                  ? singleproduct.images
                  : "/homeLogo/MediMart.svg"
              }
              className="w-[90px] h-20  border rounded-md bg-[#FFF4F4] p-3"
            />
          </div>
        </aside>
        <aside className=" lg:w-[80%]">
          <p className="text-[#EB148C] text-xl  lg:text-2xl font-medium leading-[1.3]">
            {singleproduct?.product_name}
          </p>
          <p className="text-sm lg:text-base font-medium">
            {singleproduct?.company_name || "N/A"}
          </p>{" "}
          <p className="text-sm lg:text-base font-medium">
            {" "}
            Generic : {singleproduct?.generic_name || "N/A"}
          </p>
          <p className="text-sm lg:text-base font-medium text-[#3A3A3C]">
            Type: {singleproduct?.type || "N/A"}
          </p>
          <hr className="my-2 border bg-[#8F90A6]" />
          {/* product variation  */}
          <div className="flex space-x-3">
            <div
              className={`${selectvariationIndex == 1
                  ? "productvariationselect"
                  : "productvariation"
                }`}
              onClick={(e) => handleselectVariation(e, 1, singleproduct)}
            >
              <span className="text-sm font-medium">{singleproduct?.type}</span>
              <p className="flex space-x-1 items-center text-[11px] xl:text-[13px]">
                <span
                  className={
                    singleproduct?.discount_percentage! >= 8
                      ? "line-through"
                      : ""
                  }
                >
                  {t("moneyCount", {
                    count: Number(singleproduct?.price ?? 0),
                  })}
                </span>
                <span>
                  {singleproduct?.discount_percentage! >= 8
                    ? `( ${t("numberconvert", { count: 5 })} % ${t("off")})`
                    : ""}
                </span>
                <span>
                  {singleproduct?.discount_percentage! >= 8
                    ? t("moneyCount", {
                      count: Number(
                        (Number(singleproduct?.price ?? 0) * 0.95).toFixed(2)
                      ),
                    })
                    : ""}
                </span>
              </p>
            </div>
            {singleproduct?.product_variations &&
              singleproduct?.product_variations?.map((item, index) => {
                return (
                  <div
                    className={`${index + 2 == selectvariationIndex
                        ? "productvariationselect"
                        : "productvariation"
                      }`}
                    key={index}
                    onClick={(e) => handleselectVariation(e, index + 2, item)}
                  >
                    <span className="text-sm font-medium">
                      {singleproduct?.type} ({item.pack_type})
                    </span>
                    <p className="flex space-x-1 items-center text-[11px] xl:text-[13px]">
                      <span
                        className={`${singleproduct?.discount_percentage! >= 8
                            ? "line-through"
                            : ""
                          }`}
                      >
                        {t("moneyCount", {
                          count: Number(item.pack_price ?? 0),
                        })}
                      </span>
                      <span>
                        {singleproduct?.discount_percentage! >= 8
                          ? `( ${t("numberconvert", { count: 5 })} % ${t(
                            "off"
                          )})`
                          : ""}
                      </span>
                      <span className="">
                        {singleproduct.discount_percentage! >= 8
                          ? t("moneyCount", {
                            count: Number(
                              (Number(item?.pack_price ?? 0) * 0.95).toFixed(
                                2
                              )
                            ),
                          })
                          : ""}
                      </span>
                    </p>
                  </div>
                );
              })}
          </div>
          <hr className="my-2 border bg-[#8F90A6]" />
          <div className="flex lg:flex-col justify-between lg:justify-start">
            <div className="flex justify-evenly mt-1 h-[39px] w-[150px] items-center border rounded-[7px] border-[#E2136E] ">
              <button
                className={`text-5xl font-normal text-[#EB148C] ${singleProductCount <= 1 ? "cursor-not-allowed" : ""
                  }`}
                onClick={handleRemove}
                disabled={singleProductCount <= 1}
              >
                -
              </button>
              <span className="text-xl font-normal text-black">
                {t("numberconvert", {
                  count: Number(singleProductCount),
                })}
              </span>
              <button
                className="text-5xl font-normal text-[#EB148C]"
                onClick={handlePlus}
              >
                +
              </button>
            </div>
            <p className="my-2">
              {t("total_price")} -{" "}
              {t("moneyCount", {
                count: parseFloat(total_price.toFixed(2)),
              })}
            </p>
          </div>
          <hr className="my-2 border bg-[#8F90A6]" />
          <div className="grid grid-cols-2 gap-4 lg:w-[80%] mt-2">
            <button
              onClick={(e) => handleCheckOut(e, productId)}
              className="hover:border-[#E2136E] hover:bg-[#E2136E] hover:text-white border border-[#E2136E]  font-medium rounded-md text-sm px-1 lg:px-2 xl:px-3 2xl:px-5 2xl:py-[12px] py-2  "
            >
              {t("Buy Now")}
            </button>

            <button
              onClick={handleAddedToCart}
              className={`flex justify-center items-center  border-[#E2136E] cursor-pointer hover:border-[#E2136E] hover:bg-[#E2136E] hover:text-white border  font-medium rounded-md text-sm px-1 lg:px-2 xl:px-3 2xl:px-5 2xl:py-[12px] py-2 ${added && "bg-[#EB148C] text-white"
                }`}
            >
              {" "}
              {added ? t("added") : t("add_to_cart")}
            </button>
          </div>
        </aside>
      </div>

      {relatedProduct && relatedProduct.length > 0 && (
        <div className="px-3 2xl:px-0 pt-8">
          <div className="flex items-center justify-between">
            <MediHeadTag>{t("relatedProduct")}</MediHeadTag>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 xl:mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-3 xl:gap-5 2xl:gap-6 ">
            {relatedProduct?.slice(0, 6)?.map((data, index) => (
              <Link
                key={index}
                href={`/mediMart/medicine/${data.product_slug}`}
              >
                <MediCart product={data} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleProduct;
