import { FC } from "react";
import React from 'react';
import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import styles from '../css/Home.module.css';
import header from '../css/heder.module.css'

type Props = {
  visible: boolean;
};

export const Message: FC<Props> = ({ visible }) => {
    return (
        <>
        <div style={{ visibility: visible ? "visible" : "hidden" }}> 
        <div className={styles.box_main}>
                <NavLink to="/" className={styles.box_name}>
                    <div className={styles.box_name}>
                                項目<br/>
                                … の確認
                    </div>
                </NavLink>
                <hr/>
                <NavLink to="/React" className={styles.box_name}>
                    <div className={styles.box_name}>

                                項目<br/>
                                … の確認

                    </div>
                </NavLink>
            </div>
        </div>
        </>
    );
  };