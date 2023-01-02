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

//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: false,
      address: '',
      destination_page: 'B1'
    };
  }

  // generic App.js-level catch-all for many things.
  generica(a) {
    // From Nav.js -- Navigation from the MenuBar:
    if (a.length === 2 && a.substring(1,2) === '1') {   // A1, B1, C1, etc
      this.setState({destination_page:a});
    } 
    else if (a === config.Load_Button_Pressed) {        // LOAD BUTTON from B2.js
      // function for performing the load transaction logic goes here
      alert(config.Load_Button_Pressed);
    }
    else {             // otherwise, just display the message.
      alert(a);   
    }
  }

  render () {
    var generica = this.generica;
    return (
      <Container className="App basic rounded">
          <Header></Header>
          <MenuBar generica={generica.bind(this)}></MenuBar>
          <br />
          <Nav generica={generica.bind(this)} destination_page={this.state.destination_page}></Nav>
        </Container>
      );
  }
}

export default App;
