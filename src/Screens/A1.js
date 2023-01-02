/* HOME - A1 */
import React from 'react';
import Container from 'react-bootstrap/Container';
import '../App.css';

//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

class A1 extends React.Component {


    render () {
        return (
            <Container>
                <h1>HOME</h1>
                <br />
                <p>Watch this site for added decentralized dogecoin functionality!</p>
                <h5>Current Functionality:</h5>
                <ul>
                    <li>Retrieve Unspent Transactions</li>
                    <li>Save Transactions to local text file (JSON)</li>
                </ul>
            </Container>
        );
    }
}

export default A1;