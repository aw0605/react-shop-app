"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "@/redux/slice/checkoutSlice";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";

import styles from "./CheckoutAddress.module.scss";

const initialAddressState = {
  name: "",
  line: "",
  city: "",
  postalCode: "",
};

const CheckoutAddressClient = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();

  const router = useRouter();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));

    console.log(shippingAddress, billingAddress);

    router.push("/checkout");
  };
  return (
    <section className={styles.checkout}>
      <Heading title="상세주문" />
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h3>배송 주소</h3>
          <label>받는 사람 이름</label>
          <input
            type="text"
            placeholder="받는 사람 이름"
            required
            name="name"
            value={shippingAddress.name}
            onChange={(e) => handleShipping(e)}
          />

          <label>우편번호</label>
          <input
            type="text"
            name="postalCode"
            value={shippingAddress.postalCode}
            required
            onChange={(e) => handleShipping(e)}
            placeholder="우편번호"
          />

          <label>도시</label>
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            required
            onChange={(e) => handleShipping(e)}
            placeholder="도시"
          />

          <label>상세주소</label>
          <input
            type="text"
            name="line"
            value={shippingAddress.line}
            required
            onChange={(e) => handleShipping(e)}
            placeholder="상세주소"
          />
        </div>

        <div className={styles.card}>
          <h3>청구지 주소</h3>
          <label>보내는 사람 이름</label>
          <input
            type="text"
            name="name"
            value={billingAddress.name}
            required
            onChange={(e) => handleBilling(e)}
            placeholder="보내는 사람 이름"
          />

          <label>우편번호</label>
          <input
            type="text"
            placeholder="우편번호"
            required
            name="postalCode"
            value={billingAddress.postalCode}
            onChange={(e) => handleBilling(e)}
          />

          <label>도시</label>
          <input
            type="text"
            placeholder="도시"
            required
            name="city"
            value={billingAddress.city}
            onChange={(e) => handleBilling(e)}
          />

          <label>상세주소</label>
          <input
            type="text"
            placeholder="상세주소"
            required
            name="line"
            value={billingAddress.line}
            onChange={(e) => handleBilling(e)}
          />

          <Button type="submit" label="주문하기" />
        </div>
      </form>
    </section>
  );
};

export default CheckoutAddressClient;
