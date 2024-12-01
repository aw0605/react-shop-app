"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { db, storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "@/components/loader/Loader";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";

import styles from "./AddProduct.module.scss";

export const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
  { id: 5, name: "Movies & Television" },
  { id: 6, name: "Home & Kitchen" },
  { id: 7, name: "Automotive" },
  { id: 8, name: "Software" },
  { id: 9, name: "Video Games" },
  { id: 10, name: "Sports & Outdoor" },
  { id: 11, name: "Toys & Games" },
  { id: 12, name: "Industrial & Scientific" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProductClient = () => {
  const [product, setProduct] = useState({ ...initialState });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    console.log(product);
  };

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (e) => {
        toast.error(e.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("이미지를 성공적으로 업로드했습니다.");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("상품을 성공적으로 등록했습니다.");
      router.push("/admin/all-products");
    } catch (e) {
      setIsLoading(false);
      toast.error(e.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <Heading title="상품 등록하기" />
        <form onSubmit={addProduct}>
          <label>상품 이름:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            required
            onChange={(e) => handleInputChange(e)}
            placeholder="상품 이름"
          />

          <div>
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `Uploading... ${uploadProgress}`
                    : `Upload Complete ${uploadProgress}%`}
                </div>
              </div>
            )}
            <label>상품 이미지:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={(e) => handleImageChange(e)}
              placeholder="상품 이미지"
            />
            {product.imageURL === "" ? null : (
              <input
                type="text"
                name="imageURL"
                value={product.imageURL}
                disabled
                required
                placeholder="이미지 URL"
              />
            )}
          </div>

          <label>상품 가격:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            required
            onChange={(e) => handleInputChange(e)}
            placeholder="상품 가격"
          />

          <label>상품 카테고리:</label>
          <select
            name="category"
            value={product.category}
            required
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- 상품 카테고리 선택
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <label>상품 브랜드/회사:</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
            placeholder="상품 브랜드/회사"
          />

          <label>상품 설명:</label>
          <textarea
            name="desc"
            value={product.desc}
            cols={10}
            rows={10}
            required
            onChange={(e) => handleInputChange(e)}
            placeholder="상품 설명을 입력하세요."
          />

          <Button type="submit" label="상품 등록" />
        </form>
      </div>
    </>
  );
};

export default AddProductClient;
