import { BiSearch } from "react-icons/bi";

import styles from "./Search.module.scss";
import { ChangeEvent } from "react";

interface ISearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: ISearchProps) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="찾고 싶은 상품을 검색하세요."
      />
    </div>
  );
};

export default Search;
