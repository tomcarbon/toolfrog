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
        var handleToUpdate = this.props.handleToUpdate;
         return (
             <Container>
                <hr />
                     <HoverButton className="official-menu-buttonstyle" onClick={() => handleToUpdate('A1')}>
                        Home
                     </HoverButton>
                     <HoverButton className="official-menu-buttonstyle" onClick={() => handleToUpdate('B1')}>
                        Pull Transactions 
                     </HoverButton>
                     <HoverButton className="official-menu-buttonstyle" onClick={() => handleToUpdate('C1')}>
                       About
                     </HoverButton>
                <hr />
             </Container>
         );
    }
}

export default MenuBar;