/*********************************
 * 
 * visit ./Components/Nav.js to get your bearings for this site.
 * 
 *********************************/
import React from 'react';
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import MenuBar from "./Components/MenuBar";
import './App.css';
import Container from 'react-bootstrap/Container';
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: false,
      address: '',
      dest: 'A1'
    };
  }

  handleToUpdate(a) {
    // From Nav.js -- Navigation from the MenuBar:
    if (a.length === 2 && a.substring(1,2) === '1') {   // A1, B1, C1, etc
      this.setState({dest:a});
    } else {
      alert(a);   
    }
  }

  render () {
    var handleToUpdate = this.handleToUpdate;
    return (
      <Container className="App basic rounded">
          <Header></Header>
          <br />
          <MenuBar handleToUpdate={handleToUpdate.bind(this)}></MenuBar>
          <br />
          <Nav handleToUpdate={handleToUpdate.bind(this)} dest={this.state.dest}></Nav>
        </Container>
      );
  }
}

export default App;
