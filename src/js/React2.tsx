import React,{useState,useEffect,useRef} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import styles from "../css/tab.module.css"
import { db } from './db';
import { addDoc, collection, onSnapshot, doc, deleteDoc, getDocs, query, where, updateDoc, arrayRemove} from 'firebase/firestore';
import { Button, TextField, Checkbox } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form';


// データーベースへの接続
type User = {
  name: string;
  title:string;
  sub_title: string;
  code: string;
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
      name: data.name,
      title: data.title,
      subtitle: data.sub_title,
      code: data.code,
      admin: false,
    });
    console.log(documentRef);
  };

  
  useEffect(() => {
    
    let userList: User[] = [];
    const usersCollectionRef = collection(db, 'users');
    const unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        const user: User= {
          name: doc.data().name,
          title: doc.data().title,
          sub_title: doc.data().sub_title,
          code: doc.data().code,
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
  const deleteUser = async (name: string) => {
    const userCollectionRef = collection(db, 'users');
    const q = query(userCollectionRef, where('name', '==', name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const userDocumentRef = doc(db, 'users', document.id);
      await deleteDoc(userDocumentRef);
    });
  };
  // 編集
  // const { id, text, timestamp } = props.todo;

  return (
    
    <div className={styles.box1}>
      <AppBar position="static" >
        <Tabs value={value} indicatorColor="primary" onChange={handleChange} aria-label="simple tabs example" className={styles.box_title}>
          <Tab label="技術" {...a11yProps(0)} />
          <Tab label="エラー" {...a11yProps(1)} />
          <Tab label="+" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {users.map((user, index) => (
        <div className={styles.box_main}>
          <div key={user.name}>
                  {/* <div key={index.toString()} className={styles.box_name_top}>{user.name}</div> */}
                  <details>
                  <summary>
                    {user.name}
                    <button key={user.name} onClick={() => deleteUser(user.name)}>削除</button>
                  </summary>
                  <div>
                    <p>詳細</p>
                    <p>{user.sub_title}</p>
                    <p>プログラム</p>
                    <p>{user.code}</p>
                    {/* .replaceAll('\\n', '\n') */}
                  </div>
                </details>
                  {/* <div> */}
                {/* {users.map((user) => (
                  <div key={user.name}>
                    <span>{user.name}</span> */}
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <div>
                      <label>サブタイトル</label><br/>
                      <textarea className={styles.input_content}  {...register('name')} />
                    </div>                    */}
                    {/* <input value="更新" type="submit" /> */}
                    </form>

                  {/* </div>
                ))}
              </div> */}
                <hr className={styles.box_hr}/>
                </div>
        </div>
           ))}
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        {users.map((user, index) => (
        <div className={styles.box_main}>
                <NavLink to="/" className={styles.box_name_top}>
                  <div key={index.toString()} className={styles.box_name_top}>{user.name}</div>
                </NavLink>
                <hr className={styles.box_hr}/>
            </div>
           ))}
      </TabPanel>
             
      <TabPanel value={value} index={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>name</label><br/>
          <input className={styles.input_mame} defaultValue="test" {...register('name')} />
        </div>
        <div>
          <label>タイトル</label><br/>
          <textarea className={styles.input_title} defaultValue="test" {...register('title')} />
        </div>
        <div>
          <label>サブタイトル</label><br/>
          <textarea className={styles.input_content} defaultValue="test" {...register('sub_title')} />
        </div>
        <div>
          <label>プログラム</label><br/>
          <textarea className={styles.input_content} defaultValue="''''''" {...register('code')} />
        </div>
        {errors.name && (
          <span>Error!!!</span>
        )}
        <input value="登録" type="submit" />
      </form>
      </TabPanel>
    </div>
  );
}
