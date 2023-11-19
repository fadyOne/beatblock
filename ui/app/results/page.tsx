import { Button } from "../components/button/Button";
import Candidates from "../app/_components/candidates/candidates";

import styles from "./page.module.scss";


export default function Results() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Candidates showResults={true} />
        <Button className={styles.button} href="/" text="Go back" />
      </div>
    </div>
  );
}
