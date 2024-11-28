"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoPath from "@/assets/colorful.svg";

import styles from "./Auth.module.scss";
import Loader from "@/components/loader/Loader";
import Input from "@/components/input/Input";
import AutoSignInCheckBox from "@/components/autoSignInCheckbox/AutoSignInCheckBox";
import Button from "./../../../components/button/Button";
import Divider from "@/components/divider/Divider";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  const signInWithGoogle = () => {};

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image src={LogoPath} alt="logo" />
          </h1>

          <form className={styles.form} onSubmit={loginUser}>
            {/* input */}
            <Input
              email
              id="email"
              name="email"
              label="이메일"
              className={styles.control}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="letter"
              placeholder="아이디(이메일)"
            />

            <Input
              password
              id="password"
              name="password"
              label="비밀번호"
              className={styles.control}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="lock"
              placeholder="비밀번호"
            />
            <div className={styles.group}>
              {/* 자동 로그인, 비밀번호 수정 */}
              <AutoSignInCheckBox
                checked={isAutoLogin}
                onChange={(e) => setIsAutoLogin(e.target.checked)}
              />
            </div>

            <div className={styles.buttonGroup}>
              {/* button */}
              Button
              <Divider />
              Button
              <div>{/* button */}</div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
