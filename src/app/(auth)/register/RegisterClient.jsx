"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoPath from "@/assets/colorful.svg";
import Loader from "@/components/loader/Loader";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import Divider from "@/components/divider/Divider";

import styles from "../login/Auth.module.scss";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push("/");
  };

  const registerUser = (e) => {
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

          <form className={styles.form} onSubmit={registerUser}>
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

            <Input
              password
              id="password"
              name="password"
              label="비밀번호 확인"
              className={styles.control}
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              icon="lock"
              placeholder="비밀번호 확인"
            />

            <div className={styles.buttonGroup}>
              <Button type="submit" label="회원가입" width="100%" />
              <Divider space={15} />
              <Button
                label="로그인"
                width="100%"
                secondary
                onClick={() => {
                  router.push("/login");
                }}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;