import React, { Component } from "react";

import Document from "../Components/Document";
import Title from "../Components/Title";
import NewDocument from "../Components/NewDocument";

class CitizenDocuments extends Component {

    constructor(props) {
        super(props);
        this.state = { 'citizenDocuments': [] };
    }

    componentDidMount() {
        this.getDocuments()
    }

    getTypeFiltered = async (type, filter) => {
        const query = encodeURIComponent(JSON.stringify(filter))
        const response = await fetch(`/api/com.biz.${type}?filter=${query}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    getDocuments() {
        const email = this.props.curCitizen.email
        this.getTypeFiltered('TrackerRequest', { "where": { "owner": `resource:com.biz.Citizen#${email}` } })
            .then(res => { this.setState({ citizenDocuments: res }); })
            .catch(err => console.log(err));
    };

    getProps(inx, array) {
        if (inx === array.length - 1)
            return { clear: 'right' }
        else
            return { float: 'left' }
    }

    newDocumentSaved() {
        this.getDocuments()
    }

    render() {
        const rows = []
        var citizenDocuments = this.state.citizenDocuments
        rows.push(<Title title="Here you may create a new document" key="title_1" />)
        rows.push(<NewDocument curCitizen={this.props.curCitizen} onSubmit={this.newDocumentSaved.bind(this)} key="new_doc" />)
        rows.push(<Title title="Or find existing ones" key="title_2" />)
        rows.push(<div className="container" key="cnt">{citizenDocuments.map(function (d, key) {
            const props = this.getProps(key, citizenDocuments)
            return <Document key={key} qrCode={d.qrCode} type={d.type} description={d.description} state={d.state} {...props} />
        }, this)}</div>)
        return rows
    }
}

export default CitizenDocuments;
