import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import styles from "../css/tab.module.css"

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
        <div className={styles.box_main}>
                <NavLink to="/" className={styles.box_name_top}>
                    <div>
                                技術のタイトルの記入欄<br/>
                                … の確認
                    </div>
                </NavLink>
                <hr/>
                <NavLink to="/React" className={styles.box_name}>
                    <div>

                                技術のタイトルの記入欄<br/>
                                … の確認

                    </div>
                </NavLink>
            </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={styles.box_main}>
                <NavLink to="/" className={styles.box_name_top}>
                    <div>

                                エラー文のタイトルの記入欄<br/>
                                … の確認
                    </div>
                </NavLink>
                <hr className={styles.box_hr}/>
                <NavLink to="/React" className={styles.box_name}>
                    <div>
                            
                                エラー文のタイトルの記入欄<br/>
                                … の確認
                            
                    </div>
                </NavLink>
            </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <form className={styles.input_name}>
        <label className={styles.input_name}>
          Name<br/>
          <input className={styles.input_mame}type="text" name="name" />
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
      <label>
        title<br/>
      <textarea className={styles.input_title}>
        Hello there, this is some text in a text area
      </textarea>
      </label><br/>

      <label>
        content<br/>
      <textarea className={styles.input_content}>
        Hello there, this is some text in a text area
      </textarea>
      </label><br/>

      <label>
        code<br/>
        <code>
            print(tame)
        </code>
      </label><br/>
      <button>
        登録
      </button>
      </TabPanel>
    </div>
  );
}
