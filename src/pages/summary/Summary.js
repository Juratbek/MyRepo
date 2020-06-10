import React, {Component} from 'react';
import Col from "reactstrap/es/Col";
import axios from "axios";
import {Row, Table} from "reactstrap";
import Paper from "@material-ui/core/Paper";
import Refresh from "../../Components/Refresh/Refresh";
import './Summary.scss'
import Loader from "../../Components/loader/Loader";

class Summary extends Component {

    state = {
        summary: null,
        loading: true,
        hasData: false,
    };

    GetContent = () => {
        if (this.state.loading) {
            return (
                <Row>
                    <Col md={{size: 4, offset: 4}}>
                        <Loader/>
                    </Col>
                </Row>
            )
        } else if (this.state.hasData) {
            const data = this.state.summary;
            return (
                <>
                    <Col md="12" className="justify-content-center">
                        <h3 className="mx-auto w-25">Global</h3>
                        <Table>
                            <thead>
                            <tr>
                                <th>NewConfirmed: {data.Global.NewConfirmed}</th>
                                <th>TotalConfirmed: {data.Global.TotalConfirmed}</th>
                                <th>NewDeaths: {data.Global.NewDeaths}</th>
                            </tr>
                            <tr>
                                <th>TotalDeaths: {data.Global.TotalDeaths}</th>
                                <th>NewRecovered: {data.Global.NewRecovered}</th>
                                <th>TotalRecovered: {data.Global.TotalRecovered}</th>
                            </tr>
                            </thead>
                        </Table>

                    </Col>
                    <Row className="mx-1">
                        {data.Countries.map((country, key) => {
                            return (
                                <Col md="4" key={key} className="p-2 h-100">
                                    <Paper
                                        elevation={3}
                                        className="p-3 paper"
                                        onClick={() => this.goDetailedHandler(country.Slug)}
                                    >
                                        <h6><strong>Country name:</strong> {country.Country}</h6>
                                        <p><strong>NewConfirmed:</strong> {country.NewConfirmed}</p>
                                        <p><strong>NewDeaths:</strong> {country.NewDeaths}</p>
                                        <p><strong>NewRecovered:</strong> {country.NewRecovered}</p>
                                        <p><strong>TotalConfirmed:</strong> {country.TotalConfirmed}</p>
                                        <p><strong>TotalDeaths:</strong> {country.TotalDeaths}</p>
                                        <p><strong>TotalRecovered:</strong> {country.TotalRecovered}</p>
                                    </Paper>
                                </Col>
                            )
                        })}
                    </Row>
                </>
            )
        }
        return (
            <Row>
                <Col md={{size: 4, offset: 4}}>
                    <Refresh/>
                </Col>
            </Row>
        )
    };

    goDetailedHandler = (slug) => {
        this.props.history.push(`/detailed/${slug}`);
    };

    render() {
        return (
            <>
                {this.GetContent()}
            </>
        )
    }

    async componentDidMount() {
        try {
            axios.get("https://api.covid19api.com/summary").then(res => {
                this.setState({
                    summary: res.data,
                    loading: false,
                    hasData: true
                })
            })
        } catch (e) {
            this.setState({
                loading: false
            })
        }

    }
}

export default Summary;
