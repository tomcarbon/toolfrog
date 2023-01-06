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
            SaveButtonDisabled: true,
            transactionCount: 69
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTogChange = this.handleTogChange.bind(this);
        this.getUTxs = this.getUTxs.bind(this);
    }

    handleChange(event) {
        this.setState({address: event.target.value});
    }

    handleTogChange(checked) {
        this.setState({ checked });
    }

    clearTransactions() {
        result = config.result_init;
        this.setState({SaveButtonDisabled: true})
        this.setState({address: ''})
        this.setState({transactionCount: 0});
        this.forceUpdate();
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
                        this.setState({SaveButtonDisabled: false})
                        this.setState({address: file.name.slice(0,34)});
                        this.setState({transactionCount: result.length});
                        this.forceUpdate();
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
                    this.setState({SaveButtonDisabled: false})
                    this.setState({transactionCount: result.length});
                    this.forceUpdate();
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

                <div hidden={this.state.SaveButtonDisabled}>Address: <strong>{this.state.address.trim()}</strong></div>
                <div hidden={this.state.SaveButtonDisabled}>Transaction Count: <strong>{this.state.transactionCount}</strong></div>
                <br />
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
            </Container>
        );
    }
}

export default B1;