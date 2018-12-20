import React, { Component } from 'react';
import './App.css';

// I only take the data json file since it already contain the information of the correspondign label json file.
import confidentialityJson from './data/confidentiality_data.json';
import docTypeJson from './data/doctype_data';
import languageJson from './data/language_data';

// Only for retrieving data from API server
// import { API } from './API_EndPoint';

import DataTable from './components/DataTable';
import PieChart from './components/PieChart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confidentiality: confidentialityJson,
      docType: docTypeJson,
      language: languageJson,
      viewConfidentiality: false,
      viewDoctype: false,
      viewLanguage: false,

    };
    this.getTotalConfidentiality = this.getTotalConfidentiality.bind(this);
    this.getTotalDocType = this.getTotalDocType.bind(this);
    this.getTotalLanguage = this.getTotalLanguage.bind(this);
  }

  componentDidMount() {
    // Since the current code is to retrive the data directly from the local file, I use import statement above to do it
    // However, in a real app, the data usually come from an API server. If that is the case, we need to fetch it like
    // below and wrap it in the componentDidMount.
    // fetch('').then(result => result.json()).then(result => console.log(result));
  }

  // Get the sum of docs for each category, this will be display in the top panels
  getTotalConfidentiality() {
    const { confidentiality } = this.state;
    return confidentiality.map(data => data.total_docs).reduce((sum, data) => sum + data);
  }

  getTotalDocType() {
    const { docType } = this.state;
    return docType.map(data => data.total_docs).reduce((sum, data) => sum + data);
  }

  getTotalLanguage() {
    const { language } = this.state;
    return language.map(data => data.total_docs).reduce((sum, data) => sum + data);
  }

  render() {
    const {
      confidentiality, docType, language, viewConfidentiality, viewDoctype, viewLanguage,
    } = this.state;
    return (
      <div className="App">
        <div className="row Header">
          <div className="col-lg-12">
            <h1>Dashboard</h1>
          </div>
        </div>

        <div className="row mt-4 mb-lg-5 justify-content-around Navigation">
          <div className="col-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body text-center">
                <h2>Confidentiality</h2>
                <div>
                    Total:
                  {this.getTotalConfidentiality()}
                </div>
              </div>
              <div
                className="card-footer text-white clearfix small z-1 pointer"
                onClick={() => this.setState({ viewConfidentiality: true, viewDoctype: false, viewLanguage: false })}
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card text-white bg-warning o-hidden h-100">
              <div className="card-body text-center">
                <h2>Doc Type</h2>
                <div>
                    Total:
                  {this.getTotalDocType()}
                </div>
              </div>
              <div
                className="card-footer text-white clearfix small z-1 pointer"
                onClick={() => this.setState({ viewConfidentiality: false, viewDoctype: true, viewLanguage: false })}
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card text-white bg-success o-hidden h-100">
              <div className="card-body text-center">
                <h2>Language</h2>
                <div>
                    Total:
                  {this.getTotalLanguage()}
                </div>
              </div>
              <div
                className="card-footer text-white clearfix small z-1 pointer"
                onClick={() => this.setState({ viewConfidentiality: false, viewDoctype: false, viewLanguage: true })}
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right" />
                </span>
              </div>
            </div>
          </div>

        </div>

        {(viewConfidentiality) ? (
          <div className="row justify-content-around">
            <div className="col-5">
              <DataTable data={confidentiality} />
            </div>
            <div className="col-5">
              <PieChart data={confidentiality} />
            </div>
          </div>
        ) : ''}

        {(viewDoctype) ? (
          <div className="row justify-content-around">
            <div className="col-5">
              <DataTable data={docType} />
            </div>
            <div className="col-5">
                <PieChart data={docType} />
            </div>
          </div>
        ) : ''}

        {(viewLanguage) ? (
          <div className="row justify-content-around">
            <div className="col-5">
              <DataTable data={language} />
            </div>
            <div className="col-5">
                <PieChart data={language} />
            </div>
          </div>
        ) : ''}
      </div>

    );
  }
}

export default App;
