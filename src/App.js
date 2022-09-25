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
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    result = await get_the_transactions(this.state.value);
    console.log(result);
    this.forceUpdate();
  }

  render () {
    return (
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <p>ToolFrog</p>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <label>
              Retrieve Unspent transactions from a Dogecoin Address:
              <input type="text" value={this.state.value} onChange={this.handleChange} style={{width: "300px"}} />
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
