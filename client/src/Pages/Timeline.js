import React, { Component } from "react";

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = { 'regulatorDocumentEvents': []};
    }

    componentDidMount() {
        this.getEvents()
    }

    getTypeFiltered = async (type, filter) => {
        const query = encodeURIComponent(JSON.stringify(filter))
        const response = await fetch(`/api/com.biz.${type}?filter=${query}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    comparator(a, b) {
        return a.timestamp > b.timestamp;
    }

    getEvents() {
        const query = encodeURIComponent(this.props.curDocument.qrCode)
        this.getTypeFiltered('PlaceRequest', { "where": { "qrCode": this.props.curDocument.qrCode } })
            .then(res1 => {
                this.getTypeFiltered('StartProcessingRequest', { "where": { "request": `resource:com.biz.TrackerRequest#${query}` } })
                    .then(res2 => {
                        this.getTypeFiltered('EndProcessingRequest', { "where": { "request": `resource:com.biz.TrackerRequest#${query}` } })
                            .then(res3 => {
                                this.setState({ regulatorDocumentEvents: res1.concat(res2).concat(res3).sort(this.comparator) });
                            });
                    })
            })
    }

    render() {
        var rows = []
        var prev = null
        var timeDiff = null
        var event = null
        var text = null

        this.state.regulatorDocumentEvents.map(function (d, i) {

            if (prev != null) {
                timeDiff = Date.parse(d.timestamp) - Date.parse(prev.timestamp)
                text = Math.ceil(timeDiff / 60000) + ' min'
            }

            var cls = d['$class']
            if (cls === 'com.biz.PlaceRequest') {
                event =
                    <li key={i} className={i % 2 === 0 ? 'timeline-inverted' : null}>
                        <div className="timeline-badge primary" ><div className="timeline-time-outer"><div className="timeline-time-inner"><b>NEW</b></div></div></div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{d.owner.split('#')[1]}</h4>
                                <h4 className="timeline-title">{d.type}</h4>
                                <h4 className="timeline-title">{d.qrCode}</h4>
                                <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i>{new Date(d.timestamp).toISOString()}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p></p>
                            </div>
                        </div>
                    </li>
            } else if (cls === 'com.biz.StartProcessingRequest') {
                event =
                    <li key={i} className={i % 2 === 0 ? 'timeline-inverted' : null}>
                        <div className="timeline-badge success" ><div className="timeline-time-outer"><div className="timeline-time-inner"><b>{text}</b></div></div></div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{d.official.split('#')[1]}</h4>
                                <h4 className="timeline-title">StartProcessingRequest</h4>
                                <h4 className="timeline-title">{d.qrCode}</h4>
                                <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i>{new Date(d.timestamp).toISOString()}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p></p>
                            </div>
                        </div>
                    </li>
            } else if (cls === 'com.biz.EndProcessingRequest') {
                event =
                    <li key={i} className={i % 2 === 0 ? 'timeline-inverted' : null}>
                        <div className="timeline-badge danger" ><div className="timeline-time-outer"><div className="timeline-time-inner"><b>{text}</b></div></div></div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{d.official.split('#')[1]}</h4>
                                <h4 className="timeline-title">EndProcessingRequest</h4>
                                <h4 className="timeline-title">{d.qrCode}</h4>
                                <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i>{new Date(d.timestamp).toISOString()}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p></p>
                            </div>
                        </div>
                    </li>
            }
            rows.push(event)
            prev = d
            return event
        })
        return (
            <ul className="timeline">{rows}</ul>
        );
    }
}

export default Timeline;
