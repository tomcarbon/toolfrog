/* ChatGPT Ref: ./src/Components/MenuBar.js */
import React from 'react';
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

import '../App.css';

const HoverButton = styled.button`
    :hover {
        background-color: orange;
        cursor: pointer;
        position: relative;
        top: 1px;
        left: 1px;
    }`;

class MenuBar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            foo: true
        }
    }

    render () {
        var generica = this.props.generica;
         return (
             <Container>
                <br />
                     <HoverButton className="official-menu-buttonstyle" onClick={() => generica('A1')}>
                        Home
                     </HoverButton>
                     <HoverButton className="official-menu-buttonstyle" onClick={() => generica('B1')}>
                        Transactions
                     </HoverButton>
                     <HoverButton className="official-menu-buttonstyle" onClick={() => generica('E1')}>
                        Withdraw
                     </HoverButton>
                     <HoverButton className="official-menu-buttonstyle" onClick={() => generica('C1')}>
                       About
                     </HoverButton>
                     <HoverButton className="official-menu-buttonstyle" onClick={() => generica('D1')}>
                        DBS 
                     </HoverButton>
                <br />
             </Container>
         );
    }
}

export default MenuBar;
