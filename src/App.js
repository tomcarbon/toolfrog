/*********************************
 * 
 * see ./Components/Nav.js to get your bearings for this project.
 * 
 *********************************/
import React from 'react';
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import MenuBar from "./Components/MenuBar";
import './App.css';
import Container from 'react-bootstrap/Container';
import config from './Config/config';
import commonUtils from './Common/commonUtils';
import coinUtilsLegacy from './Common/coinUtilsLegacy';

//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: false,
      address: '',
      destination_page: 'B1',
      selectedAPI: config.API_BlockCypher
    };
  }

  // generic App.js-level catch-all for many things.
  generica(a) {
    commonUtils.mathProc("typ", "value");   // temporary, sample remove this
    coinUtilsLegacy.coinProc("typ", "value");     // temporary, sample remove this
    // From Nav.js -- Navigation from the MenuBar:
    if (a.length === 2 && a.substring(1,2) === '1') {   // A1, B1, C1, etc
      this.setState({destination_page:a});
    } 
    else if (a === config.Load_Button_Pressed) {        // LOAD BUTTON from B1.js
      // function for performing the load transaction logic goes here
      alert(config.Load_Button_Pressed);
    }
    else if (a === config.API_BlockCypher || a === config.API_TBD) {        // Selected API to use from B1->APISelector
      this.setState({selectedAPI:a})
    }
    else {             // otherwise, just display the message.
      console.log(a);
    }
  }

  render () {
    var generica = this.generica;
    return (
      <Container className="App basic rounded">
          <Header></Header>
          <MenuBar generica={generica.bind(this)}></MenuBar>
          <br />
          <Nav generica={generica.bind(this)} destination_page={this.state.destination_page} selectedAPI={this.state.selectedAPI}></Nav>
        </Container>
      );
  }
}

export default App;
