"use client";

import { useRouter } from "next/navigation";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "@/redux/slice/authSlice";
import {
  selectCartItems,
  selectCartTotalAmount,
  CLEAR_CART,
} from "@/redux/slice/cartSlice";
import { selectShippingAddress } from "@/redux/slice/checkoutSlice";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";

import styles from "./Checkout.module.scss";

const CheckoutClient = () => {
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tossPayment = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
    );

    tossPayment
      .requestPayment("카드", {
        amount: cartTotalAmount,
        orderId: Math.random().toString(36).slice(2),
        orderName: "주문",
      })
      .then(async function (data) {
        const { amount, orderId, paymentKey } = data;

        const url = `https://api.tosspayments.com/v1/payments/confirm`;
        const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;
        const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString(
          "base64"
        );

        const confirmResponse = fetch(url, {
          method: "post",
          body: JSON.stringify({
            amount,
            orderId,
            paymentKey,
          }),
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());

        const date = new Date().toDateString();
        const time = new Date().toLocaleDateString();

        const orderData = {
          userID,
          userEmail,
          orderDate: date,
          orderTime: time,
          orderAmount: amount,
          orderStatus: "주문수락",
          cartItems,
          shippingAddress,
          createdAt: Timestamp.now().toDate(),
        };

        await addDoc(collection(db, "orders"), orderData);
        dispatch(CLEAR_CART());

        router.push(`/checkout-success?orderId=${orderId}`);
      })
      .catch((e) => {
        if (e.code === "USER_CANCEL") {
          toast.error("결제가 중단되었습니다.");
        }
      });
  };

  return (
    <section>
      <div className={styles.checkout}>
        <Heading title="주문하기" />
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <CheckoutForm />
          </div>
          <div>
            <Button type="submit" label="toss 결제" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutClient;
