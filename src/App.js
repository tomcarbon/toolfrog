import React from 'react';
import logo from './Images/toolfrogLogo.png';
import './App.css';
import get_the_transactions from './Common/blockcypher_API';


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
      address: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getUTxs = this.getUTxs.bind(this);
  }

  handleChange(event) {
    this.setState({address: event.target.value});
  }

  /*
   get Unspent Transactions -- getUTxs()
  */
  getUTxs = async (event) => {
    event.preventDefault();
    // validation: the input address must be 34 bytes:
    if (this.state.address.length != 34) {
      alert("Not 34 chars in length.")
    }
    else {
      // validation: the input address must begin with D, A, or 9:
      if (this.state.address.slice(0,1) !== 'D' && this.state.address.slice(0,1) !== 'A' && this.state.address.slice(0,1) !== '9')
      {
          alert("Dogecoin Address must start with 'A', '9', or 'D'");
      } else {
        result = await get_the_transactions(this.state.address);
        console.log(result);
        this.forceUpdate();
      }
    }
  }

  render () {
    return (
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <p>ToolFrog</p>
          <hr />
          <form onSubmit={this.getUTxs}>
            <label>
              Retrieve Unspent transactions from a Dogecoin Address:
              <input type="text" value={this.state.address} onChange={this.handleChange} style={{width: "300px"}} />
            </label>
            <input type="submit" value="do it" />
          </form>
          <table>
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
