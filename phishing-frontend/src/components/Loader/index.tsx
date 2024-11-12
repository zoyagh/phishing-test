import { FC } from "react";
import classNames from "classnames";

import { TLoader } from "../../types/loader";

import styles from "./Loader.module.scss";

const Loader: FC<TLoader> = ({
  className = "",
  color = "#fff",
  size = "20px",
  count = 4,
}) => {
  const renderLoaderBlocks = Array.from({ length: count }).map((_, idx) => (
    <div
      key={idx}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
      className={styles.loaderBlock}
    />
  ));

  return (
    <div
      className={classNames(styles.wrapper, className)}
      style={{ width: size, height: size }}
    >
      {renderLoaderBlocks}
    </div>
  );
};

export default Loader;
