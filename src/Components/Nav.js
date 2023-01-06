/***************************************************************************
* Nav - navigation for the site.
*************************************************************************/
import React from "react";
import A1 from "../Screens/A1";     // HOME
import B1 from "../Screens/B1";     // TRANSACTIONS
import C1 from "../Screens/C1";     // ABOUT
import D1 from "../Screens/D1";     // DBS
import E1 from "../Screens/E1";     // WITHDRAW

class Nav extends React.Component {

    render () {
        
        if (this.props.destination_page === 'A1') {
            return(<A1/>);
        } else if (this.props.destination_page === 'B1') {
            return(<B1 generica={this.props.generica} selectedAPI={this.props.selectedAPI} />);
        } else if (this.props.destination_page === 'C1') {
            return(<C1/>);
        } else if (this.props.destination_page === 'D1') {
            return(<D1/>);
        } else if (this.props.destination_page === 'E1') {
            return(<E1/>);
        } else {
            alert("Unexpected value of " + this.props.destination_page + ". Defaulting to A1.");
            return (<A1/>);
        }
    }

}

export default Nav;