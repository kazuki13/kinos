import React,{useState,useEffect} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import styles from '../css/Home.module.css'
import headers from "../css/header.module.css";
import { db } from './db';
import { addDoc, collection, onSnapshot, doc, deleteDoc} from 'firebase/firestore';
import { Button, TextField, Checkbox } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form';

// データーベースへの接続
type User = {
  memo: string;
};


 

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// 項目の切り替え
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function SimpleTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
   const [users, setUsers] = useState<User[]>([]);
  const { register,
          handleSubmit,
          watch,
          formState: { errors }
        } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log('onSubmit', data);
    const usersCollectionRef = collection(db, 'users');
    const documentRef = addDoc(usersCollectionRef, {
      memo: data.memo,
      admin: false,
    });
    console.log(documentRef);
  };
  // データの所得
  useEffect(() => {
    
    let userList: User[] = [];
    const usersCollectionRef = collection(db, 'users');
    const unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        const user: User= {
          memo: doc.data().memo,
        };
        userList.push(user);
      });
      setUsers(userList);
    });
    return unsub;
  });
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  const [deleteDocId, setDeleteDocId] = useState<string>('');
  // 削除
  const deleteUser = async(name:string) => {
    const userDocumentRef = doc(db, 'users', name);
    await deleteDoc(userDocumentRef);
  };
  return (
    <>
    <header className={headers.header}>
      <h1 className={headers.header_logo}><a href="/">kinos</a></h1>
    </header>
    <div className={styles.main}>
        <h1 className={styles.title}>会社名・チーム名など</h1>
        <div className={styles.modal_open}><a href="#modal">•••</a></div>
          <div className={styles.modal} id="modal">
            <a href="#!" className={styles.overlay}></a>
            <div className={styles.modal_wrapper}>
              <div className={styles.modal_contents}>
                <a href="#!" className={styles.modal_close}>✕</a>
                <div className={styles.modal_content}>
                  <a className={styles.model_title}>編集</a><br/>
                </div>
                <div className={styles.area_size}>
                  <textarea className={styles.area}></textarea>
                </div>
                  <button className={styles.model_button}>OK</button>

              </div>
            </div>
        </div>
        {users.map((user, index) => (
        <div className={styles.box_main}>
                  <div key={index.toString()} className={styles.box_name_top}>{user.memo}</div>
        </div>
        ))}
      <div className={styles.block}>
          <div className={styles.surround}>
            <h2>フロントエンド</h2>
            <p><NavLink to="/react">React</NavLink></p>
            <p><NavLink to="/vue">vue.js</NavLink></p>
          </div>
          <div className={styles.surround}>
            <h2>バックエンド</h2>
            <p><NavLink to="/django">django</NavLink></p>
            <p><NavLink to="/Flask">Flask</NavLink></p>
          </div>
        </div>
    </div>
    </>
  );
}
