/* ChatGPT Ref: ./src/Screens/C1.js */
import React from 'react';
import Container from 'react-bootstrap/Container';
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";


class C1 extends React.Component {

    render () {
        return (
            <Container>
                <h1>ABOUT</h1>
                <hr />
                <h3 style={{color: "red"}}>#DECENTRALIZATION</h3>
                <hr />
                <p>This site is planned to be a nodeJS refactoring of dogecoinmultisig.org</p>
                <p>This is open source code which is available at: <a href="https://github.com/tomcarbon/toolfrog">github location</a></p>
            </Container>
        );
    }
}

export default C1;
