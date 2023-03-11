/* TRANSACTIONS - B1 */
import React from 'react';
import APISelector from '../Components/APISelector';
import commonUtils  from '../Common/commonUtils';
import get_the_Blockcypher_transactions from '../Common/blockcypher_API';
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import config from "../Config/config";
import '../App.css';
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

let result = config.result_init;

const HoverButton = styled.button`
    :hover {
        background-color: lightgreen;
        cursor: pointer;
        position: relative;
        top: 1px;
        left: 1px;
    }`;


class B1 extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            checked: false,
            address: '',
            destAddress: '',
            SaveButtonDisabled: true,
            SingleTransactionDisabled: true,
            transactionCount: 69,
            amountForBatch: 0,           // the cumulative total of dogecoin in this selection of transactions
            selectedIndex: config.Out_Of_Range,
            oneTransaction: {},
            sendAmount: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTogChange = this.handleTogChange.bind(this);
        this.handleDestAddressChange = this.handleDestAddressChange.bind(this);
        this.handleSendAmountChange = this.handleSendAmountChange.bind(this);
        this.createSpendOne = this.createSpendOne.bind(this);
        this.getUTxs = this.getUTxs.bind(this);
    }

    handleChange(event) {
        this.setState({address: event.target.value});
    }

    handleDestAddressChange(event) {
        this.setState({destAddress: event.target.value});
    }

    handleSendAmountChange(event) {
        this.setState({sendAmount: event.target.value});
    }

    handleTogChange(checked) {
        this.setState({ checked });
    }

    createSpendOne = (event) =>  {
        event.preventDefault();
        if (this.state.sendAmount <= 0 || parseFloat(this.state.sendAmount) > parseFloat(this.state.oneTransaction.value)) {
            alert(`ERROR: Monetary Send value of ${this.state.sendAmount} is out of range for the selected transaction (${this.state.oneTransaction.value}).`);
            return;
        } else if (this.state.destAddress.length !== 34) {
            alert("ERROR: The destination address is not 34 bytes in length.");
        } else if (this.state.destAddress.slice(0,1) !== 'D' && this.state.destAddress.slice(0,1) !== 'A' && this.state.destAddress.slice(0,1) !== '9') {
                alert("Destination Dogecoin Address must start with an A, 9, or D.");
        } else {
            alert("TBD: criteria met for send amount.");
        }
    }

    displayAndForceUpdate(file) {
        if (file) {
            this.setState({address: file.name.slice(0,34)})
        }
        this.setState({SaveButtonDisabled: false})
        this.setState({transactionCount: result.length});
        const cumTotal = result.reduce((a,b) => {return parseFloat(a)+parseFloat(b.value)},0).toFixed(8);
        this.setState({amountForBatch:cumTotal});
        this.forceUpdate();

    }
    clearTransactions() {
        result = config.result_init;
        this.setState({SaveButtonDisabled: true})
        this.setState({address: ''})
        this.setState({transactionCount: 0});
        this.setState({amountForBatch: 0});
        this.forceUpdate();
    }

    // User updates the 'select one transaction' input box
    selectOneIndex(evt) {
        if (isNaN(evt.target.value) || evt.target.value > result.length-1 || evt.target.value < 0) {
            this.setState({selectedIndex: config.Out_Of_Range});
        } else {
            this.setState({selectedIndex: parseInt(evt.target.value)});       // TBD: do something with this index
        }
    }

    // processing one transaction
    submitOneIndex() {
        if (this.state.selectedIndex === config.Out_Of_Range) {
            alert("The selected index is out of range! Please try again.");
        }   else {
            const output = {
                id:             config.Individual_Transaction_01,
                transaction:    result[this.state.selectedIndex]
            }
            this.props.generica(output); // send this one selected transaction back to App.js
            this.setState({oneTransaction: result[this.state.selectedIndex]})
            this.setState({SingleTransactionDisabled: false})
        }
    }


    async loadTransactionsFromFile(a) {
        try {
            let input = document.createElement('input');
            input.type = 'file';
            input.onchange = e => {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = readerEvent => {
                    result = JSON.parse(readerEvent.target.result)
                    if (result && result.length > 0) {
                        this.displayAndForceUpdate(file);
                    } else {
                        this.clearTransactions();
                        alert("Empty Transaction dataset.")
                    }
                }
            }
            input.click();
        } catch (err) {
            alert(err);
        }

    }

    saveTransactions(a) {
        if (result[0].txid !== 'none') {
            const fname = this.state.address.trim() + "_transactions.json";
            commonUtils.saveFile(JSON.stringify(result),fname);
        } else {
            alert("There is nothing to save!");
        }
    }

    // getUTxs(): Get Unspent Transactions 
    getUTxs = async (event) => {
        event.preventDefault();
        const working_address = this.state.address.trim();
        // validation: the input address must be 34 bytes:
        if (working_address.length !== 34) {
            alert("Not 34 chars in length.")
        }
        else {
            // validation: the input address must begin with D, A, or 9:
            if (working_address.slice(0,1) !== 'D' && working_address.slice(0,1) !== 'A' && working_address.slice(0,1) !== '9') {
                alert("Dogecoin Address must start with an A, 9, or D.");
            } else {
                switch (this.props.selectedAPI) {
                    case config.API_BlockCypher:
                        result = await get_the_Blockcypher_transactions(working_address);
                        break;
                    case config.API_TBD:
                        result = config.No_Work_To_Do;
                        alert("Sorry, this is a placeholder for a new API implementation.")
                        break;
                    default: 
                        alert(`Unexpected value of ${this.props.selectedAPI} for API in B1.js.`)
                        break;
                }
                console.log(result);
                if (result === config.No_Unspent_Transactions || result === config.No_Work_To_Do) {
                    if (result === config.No_Unspent_Transactions) {
                        alert(config.No_Unspent_Transactions);
                    }
                    this.clearTransactions();
                } else {
                    // happy path
                    this.displayAndForceUpdate(null);
                }
            }
        }
    }

    render () {
        return (
            <Container>
                <h1>Transactions Manager</h1>
                <br />
                <h2>Pull Transactions</h2>

                <APISelector generica={this.props.generica} selectedAPI={this.props.selectedAPI} />
                <div>Currently Selected API: <strong>{this.props.selectedAPI}</strong></div>
                <br />
                <form onSubmit={this.getUTxs}>
                    <label>
                        Retrieve Unspent transactions from a Dogecoin Address: <input type="text" value={this.state.address} onChange={this.handleChange} style={{width: "350px"}} />
                    </label>
                    <input disabled={!this.state.SaveButtonDisabled} className="official-general-buttonstyle" style={{margin:"1%"}} type="submit" value="Retrieve" />
                </form>

                <HoverButton className='official-general-buttonstyle' disabled={this.state.SaveButtonDisabled} onClick={() => this.saveTransactions()}>Save</HoverButton>
                <HoverButton className='official-general-buttonstyle' disabled={false} onClick={() => this.loadTransactionsFromFile()}>Load</HoverButton>
                <HoverButton className='official-general-buttonstyle' disabled={false} onClick={() => this.clearTransactions()}>Clear</HoverButton>

                <br />
                <table className='basic-container rounded'>
                    <thead>
                    <tr>
                    <th>Idx</th>
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
                            <td>{key}</td>
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

                <Container hidden={this.state.SaveButtonDisabled}>
                    <div>Transaction Count: <strong>{this.state.transactionCount}</strong></div>
                    <div>Address: <strong>{this.state.address.trim()}</strong></div>
                    <div>Total (for selected transactions): <strong> Ð {this.state.amountForBatch}</strong></div>
                    <br />

                    <p>WIP v </p>
                    <div>Enter one Index from above: </div>
                    <input type="text" pattern="[0-9]" onInput={this.selectOneIndex.bind(this)}/>
                    <div>Selected Index = {this.state.selectedIndex}</div>
                    <HoverButton className='official-general-buttonstyle' onClick={() => this.submitOneIndex()}>Go</HoverButton>
                </Container>
                <Container hidden={this.state.SingleTransactionDisabled}>
                    <hr />
                    <p>Single Transaction logic here:</p>
                    <p>txid: <strong>{this.state.oneTransaction.txid}</strong></p>
                    <p>value: <strong>{this.state.oneTransaction.value}</strong></p>
                    <p>tbd</p>
                    <form onSubmit={this.createSpendOne}>
                        <label>
                            Destination Dogecoin Address: <input type="text" value={this.state.destAddress} onChange={this.handleDestAddressChange} style={{width: "350px"}} />
                        </label>
                        <label>
                            Amount To Send: <input type="text" value={this.state.sendAmount} onChange={this.handleSendAmountChange} style={{width: "150px"}} />
                        </label>
                        <input className="official-general-buttonstyle" style={{margin:"1%"}} type="submit" value="Next" />
                    </form>
                </Container>
            </Container>
        );
    }
}

export default B1;