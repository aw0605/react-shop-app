"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_AMOUNT,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalAmount,
} from "@/redux/slice/cartSlice";
import { selectIsLoggedIn } from "@/redux/slice/authSlice";
import priceFormat from "@/utils/priceFormat";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { FaTrashAlt } from "react-icons/fa";

import styles from "./Cart.module.scss";

const CartClient = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const dispatch = useDispatch();

  const router = useRouter();

  const increaseCart = (item) => {
    dispatch(ADD_TO_CART(item));
  };

  const decreaseCart = (item) => {
    dispatch(DECREASE_CART(item));
  };

  const removeFromCart = (item) => {
    dispatch(REMOVE_FROM_CART(item));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  const checkout = () => {
    if (isLoggedIn) {
      router.push("/checkout-address");
    } else {
      dispatch(SAVE_URL(url));
      router.push("/login");
    }
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(CALCULATE_TOTAL_AMOUNT());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);

  return (
    <section className={styles.table}>
      <Heading title="장바구니" />
      {cartItems.length === 0 ? (
        <>
          <p className={styles.emptyText}>장바구니가 비어있습니다.</p>
          <div className={styles.emptyText}>
            <Link href={"/"}>계속 쇼핑하기</Link>
          </div>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>상품</th>
                <th>가격</th>
                <th>개수</th>
                <th>합계</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                const { id, name, price, imageURL, cartQuantity } = item;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <Image
                        src={imageURL}
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>{priceFormat(price)}원</td>
                    <td>
                      <div className={styles.count}>
                        <Button label="-" onClick={() => decreaseCart(item)} />

                        <p>
                          <b>{cartQuantity}</b>
                        </p>

                        <Button label="+" onClick={() => increaseCart(item)} />
                      </div>
                    </td>
                    <td>{priceFormat(price * cartQuantity)}원</td>
                    <td className={styles.icons}>
                      <FaTrashAlt
                        size={19}
                        color="red"
                        onClick={() => removeFromCart(item)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.summary}>
            <Button label="장바구니 비우기" onClick={clearCart} />
            <div className={styles.checkout}>
              <div className={styles.text}>
                <h4>총 상품 개수</h4>
                <p>{cartTotalQuantity}개</p>
              </div>
              <div className={styles.text}>
                <h4>합계</h4>
                <p>{priceFormat(cartTotalAmount)}원</p>
              </div>
              <Button label="주문하기" onClick={checkout} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartClient;
