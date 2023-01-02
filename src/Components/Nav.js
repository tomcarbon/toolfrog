/***************************************************************************
* Nav - navigation for the site.
*************************************************************************/
import React from "react";
import A1 from "../Screens/A1";     // HOME
import B1 from "../Screens/B1";     // PULL TRANSACTIONS
import C1 from "../Screens/C1";     // ABOUT
import D1 from "../Screens/D1";     // ABOUT

class Nav extends React.Component {

    render () {
        
        if (this.props.dest === 'A1') {
            return(<A1/>);
        } else if (this.props.dest === 'B1') {
            return(<B1 handleToUpdate={this.props.handleToUpdate}/>);
        } else if (this.props.dest === 'C1') {
            return(<C1/>);
        } else if (this.props.dest === 'D1') {
            return(<D1/>);
        } else {
            alert("Unexpected value of " + this.props.dest + ". Defaulting to A1.");
            return (<A1/>);
        }
    }

}

export default Nav;