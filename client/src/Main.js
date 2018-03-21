import React, { Component } from "react";

import FrontPage from "./Pages/FrontPage";
import CitizenDocuments from "./Pages/CitizenDocuments";
import OfficialDocuments from "./Pages/OfficialDocuments";
import RegulatorDocuments from "./Pages/RegulatorDocuments";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = { "page": "frontPage", 'curCitizen': null, 'curOfficial': null, 'curRegulator': null, "citizens": [], 'officials': [], 'regulators': [], 'citizenDocuments': [], 'officialDocuments': [], 'regulatorDocuments': [], "regulatorDocumentEvents": [] };
    }

    citizenClick(obj, sender) {
        this.setState({ curCitizen: obj, page: 'citizenDocuments' })
    }

    officialClick(obj, sender) {
        this.setState({ curOfficial: obj, page: 'officialDocuments'  })
    }

    regulatorClick(obj, sender) {
        this.setState({ curRegulator: obj, page: 'regulatorDocuments' })
    }


    render() {
        var page = this.state.page;
        if (page === "frontPage") {
            return <FrontPage citizenClick={this.citizenClick.bind(this)} officialClick={this.officialClick.bind(this)} regulatorClick={this.regulatorClick.bind(this)} />
        } else if (page === 'citizenDocuments') {
            return <CitizenDocuments curCitizen={this.state.curCitizen} />
        } else if (page === 'officialDocuments') {
            return <OfficialDocuments curOfficial={this.state.curOfficial} />
        } else if (page === 'regulatorDocuments') {
            return <RegulatorDocuments />
        }
        return <span>Unknown page!</span>
    }
}

export default Main;
