import React, {useState} from 'react';
import 'ui-neumorphism/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import {Card, Dialog} from 'ui-neumorphism';
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import MainMenu from "./layout/MainMenu";

function App() {
  const [dark] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const mainPageClasses = 'rounded-0 over-flow-off vw-100 vh-100 d-flex justify-content-center align-items-center flex-row';
  const toggleMainMenu = () => {
    setShowMainMenu(!showMainMenu);
  }
  return (
      <Card flat dark={dark} className={mainPageClasses}>
        <Card rounded className='main-page-container'>
          <Header toggleMainMenu={toggleMainMenu} dark={dark}/>
          <Footer dark={dark}/>
        </Card>
        <Dialog persistent={true} className='main-menu-dialog' minWidth={300} visible={showMainMenu} onClose={() => setShowMainMenu(false)}>
          <MainMenu toggleMainMenu={toggleMainMenu} dark={dark}/>
        </Dialog>
      </Card>
  );
}

export default App;
