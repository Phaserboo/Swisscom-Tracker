import React, { Component } from "react";

import Citizen from "../Components/Citizen";
import Regulator from "../Components/Regulator";
import Official from "../Components/Official";
import WelcomingJumbotron from "../Components/WelcomingJumbotron";
import Title from "../Components/Title";


class FrontPage extends Component {

    constructor(props) {
        super(props);
        this.state = { "citizens": [], 'officials': [], 'regulators': [] };
    }

    componentDidMount() {
        this.reload();
    }

    reload() {
        this.getPeople('Citizen')
            .then(res => { this.setState({ citizens: res }); })
            .catch(err => console.log(err));
        this.getPeople('Official')
            .then(res => { this.setState({ officials: res }); })
            .catch(err => console.log(err));
        this.getPeople('Regulator')
            .then(res => { this.setState({ regulators: res }); })
            .catch(err => console.log(err));
    }

    getPeople = async (type) => {
        type = encodeURIComponent(type)
        const response = await fetch('/api/com.biz.' + type);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    getProps(inx, array) {
    if(inx === array.length - 1)
        return {clear: 'right'}
    else
        return {float: 'left'}
    }

    getOrg(org) {
        return org.split('#')[1]
    }
    
    render() {
        const rows = []
        const citizens = this.state.citizens
        const officials = this.state.officials
        const regulators = this.state.regulators

        rows.push(<WelcomingJumbotron key="welcome" title="Welcome to the tracking app!" text="Who are you?"/>)
        rows.push(<Title title="Citizen" key="title_1"/>)
        rows.push(<div className="container" key="cont_1">{citizens.map(function(c, key) {
            const props = this.getProps(key, citizens)
            return <Citizen key={key} firstName={c.firstName} lastName={c.lastName} email={c.email} phoneNumber={c.phoneNumber} {...props} onClick={this.props.citizenClick.bind(this, c)} />;
        }, this)}</div>)
        rows.push(<Title style={{'margin-bottom': '2rem'}} title="Official" key="title_2"/>)
        rows.push(<div className="container" key="cont_2">{officials.map(function(c, key) {
            const props = this.getProps(key, citizens)
            return <Official key={key} firstName={c.firstName} lastName={c.lastName} eid={c.eid} organization={this.getOrg(c.organization)} {...props} onClick={this.props.officialClick.bind(this, c)} />;
        }, this)}</div>)
        rows.push(<Title style={{'margin-bottom': '2rem'}} title="Regulator" key="title_3"/>)
        rows.push(<div className="container" key="cont_3">{regulators.map(function(c, key) {
            const props = this.getProps(key, citizens)
            return <Regulator key={key} firstName={c.firstName} lastName={c.lastName} email={c.email} {...props} onClick={this.props.regulatorClick.bind(this, c)} />;
        }, this)}</div>)
        return rows
    }
}

export default FrontPage;
