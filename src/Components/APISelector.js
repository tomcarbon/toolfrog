/* ChatGPT Ref: ./src/Components/APISelector.js */
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import config from "../Config/config";
//import '../App.css';
/*
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
*/

class APISelector extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
          foo:1
        }
    }

    DropdownProc = (a) => {
      this.props.generica(a);
    }

    render () {
         return (
            <DropdownButton title={this.props.selectedAPI} onSelect={this.DropdownProc}>
              <Dropdown.Item eventKey={config.API_BlockCypher}>{config.API_BlockCypher}</Dropdown.Item>
              <Dropdown.Item eventKey={config.API_TBD}>{config.API_TBD}</Dropdown.Item>
            </DropdownButton>
         );
    }
}

export default APISelector;
