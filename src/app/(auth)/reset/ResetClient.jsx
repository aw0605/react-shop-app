"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import Heading from "@/components/heading/Heading";
import Input from "@/components/input/Input";
import Divider from "@/components/divider/Divider";
import Button from "@/components/button/Button";

import styles from "./Reset.module.scss";

const ResetClient = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const resetPassword = (e) => {
    e.preventDefatult();
    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.form}>
            <Heading
              title="비밀번호 업데이트"
              subtitle="이메일 주소를 입력해주세요."
            />

            <form onSubmit={resetPassword}>
              <Input
                id="reset"
                label="reset"
                type="text"
                placeholder="Email"
                required
                value={email}
                className={styles.control}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <Button type="submit" label="업데이트" width="100%" />
              </div>
              <Divider />

              <div className={styles.links}>
                <Button
                  width="100%"
                  label="로그인"
                  onClick={() => {
                    router.push("/login");
                  }}
                />
                <Button
                  width="100%"
                  secondary
                  label="회원가입"
                  onClick={() => {
                    router.push("/register");
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetClient;
