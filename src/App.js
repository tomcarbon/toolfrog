import React from 'react';
import Switch from "react-switch";
import logo from './Images/toolfrogLogo.png';
import './App.css';
import './themes/light.css';
import get_the_Blockcypher_transactions from './Common/blockcypher_API';
//import Container from 'react-bootstrap/Container';
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import APIDropdown from './Components/APIDropdown';

let result = 
[
  {
  txid: "none",
  output_no: "none",
  value: "none",
  script_hex: "none"
  }
]

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: false,
      address: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTogChange = this.handleTogChange.bind(this);
    this.getUTxs = this.getUTxs.bind(this);
  }

  handleTogChange(checked) {
    this.setState({ checked });
  }

  handleChange(event) {
    this.setState({address: event.target.value});
  }

  /*
   getUTxs(): Get Unspent Transactions 
  */
  getUTxs = async (event) => {
    event.preventDefault();
    // validation: the input address must be 34 bytes:
    if (this.state.address.length !== 34) {
      alert("Not 34 chars in length.")
    }
    else {
      // validation: the input address must begin with D, A, or 9:
      if (this.state.address.slice(0,1) !== 'D' && this.state.address.slice(0,1) !== 'A' && this.state.address.slice(0,1) !== '9') {
          alert("Dogecoin Address must start with an A, 9, or D.");
      } else {
        result = await get_the_Blockcypher_transactions(this.state.address);
        console.log(result);
        this.forceUpdate();
      }
    }
  }

  render () {
    return (
      <div className="App basic rounded">
          <img src={logo} className="App-logo " alt="logo" />
          <h5>ToolFrog</h5>
          <hr />
          <hr />
          <APIDropdown />
          <form onSubmit={this.getUTxs}>
            <label>
              Retrieve Unspent transactions from a Dogecoin Address:
              <input type="text" value={this.state.address} onChange={this.handleChange} style={{width: "300px"}} />
            </label>
            <input type="submit" value="do it" />
          </form>
          <hr />
          <table className='basic-container rounded'>
            <thead>
            <tr>
              <th>Hash</th>
              <th>Output_No</th>
              <th>Value</th>
              <th>Script Hex</th>
            </tr>
            </thead>
            <tbody>
                {
                result.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{value.txid}</td>
                      <td>{value.output_no}</td>
                      <td>{value.value}</td>
                      <td>{value.script_hex}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      );
  }
}

export default App;
