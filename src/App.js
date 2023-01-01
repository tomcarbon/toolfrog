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
    this.setState({dest:a});
  }

  render () {
    var handleToUpdate = this.handleToUpdate;
    return (
      <Container className="App basic rounded">
          <Header></Header>
          <hr />
          <MenuBar handleToUpdate={handleToUpdate.bind(this)}></MenuBar>
          <hr />
          <Nav dest={this.state.dest}></Nav>
        </Container>
      );
  }
}

export default App;
