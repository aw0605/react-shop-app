"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import Image from "next/image";
import Link from "next/link";
import LogoPath from "@/assets/colorful.svg";
import Loader from "@/components/loader/Loader";
import Input from "@/components/input/Input";
import AutoSignInCheckBox from "@/components/autoSignInCheckbox/AutoSignInCheckBox";
import Button from "@/components/button/Button";
import Divider from "@/components/divider/Divider";

import styles from "./Auth.module.scss";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push("/");
  };

  const loginUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);
        toast.success("로그인에 성공했습니다.");
        redirectUser();
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(e.message);
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("구글 로그인에 성공했습니다.");
        redirectUser();
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image src={LogoPath} alt="logo" />
          </h1>

          <form className={styles.form} onSubmit={loginUser}>
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
              <AutoSignInCheckBox
                checked={isAutoLogin}
                onChange={(e) => setIsAutoLogin(e.target.checked)}
              />

              <Link href={"/reset"} className={styles.findLink}>
                비밀번호 수정하기
                <svg
                  width="11"
                  height="18"
                  viewBox="0 0 11 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.findLinkArrow}
                >
                  <path
                    d="M1.5 1L9.5 9L1.5 17"
                    stroke="#0074E9"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            </div>

            <div className={styles.buttonGroup}>
              <Button type="submit" label="로그인" width="100%" />
              <Divider space={15} />
              <Button
                label="회원가입"
                width="100%"
                secondary
                onClick={() => {
                  router.push("/register");
                }}
              />
              <Divider space={15} />
              <div>
                <Button label="구글 로그인" onClick={signInWithGoogle} />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
