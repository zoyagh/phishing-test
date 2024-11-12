import { FC } from "react";

import styles from "./PhishingCard.module.scss";
import { TPhishingCardProps } from "types/";

const PhishingCard: FC<TPhishingCardProps> = ({
  id,
  email,
  status,
  content,
}) => (
  <div className={styles.emailCard}>
    <div className={styles.header}>
      <span className={styles.id}>ID: {id}</span>
      <p className={styles.status}>{status.charAt(0).toUpperCase() + status.slice(1)}</p>
    </div>
    <p className={styles.email}>Email: {email}</p>
    <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

export default PhishingCard;
