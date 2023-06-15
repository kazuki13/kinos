import { useState, FC } from "react";
import { Message } from "./Home2";
import styles from "../css/Home.module.css"

export const Form: FC = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
    <div className={styles.box1} >
      <button className={styles.box_title} onClick={() => setVisible(!visible)} >
        {"Data"}
      </button>
      <Message visible={visible} />
      </div>
    </>
  );
};

export default Form;
