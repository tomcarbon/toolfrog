/* HOME - A1 */
import React from 'react';
import Container from 'react-bootstrap/Container';
import '../App.css';

//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

class A1 extends React.Component {


    render () {
        return (
            <Container className="official-standard-formatting">
                <h1>HOME</h1>
                <br />
                <p>Watch this site for added decentralized dogecoin functionality!</p>
                <p>Currently this website only allows unspent transactions for a dogecoin address to be queried and displayed.</p>
            </Container>
        );
    }
}

export default A1;