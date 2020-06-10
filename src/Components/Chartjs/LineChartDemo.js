import React, {Component} from 'react';
import {Line} from "react-chartjs-2";
import axios from 'axios'

class LineChartDemo extends Component {

    state = {
        data: {}
    };

    componentDidMount() {
        this.getApi()
    }

    componentDidUpdate() {
        this.getApi()
    }

    getApi = () => {
        axios.get(`https://api.covid19api.com/total/country/${this.props.selectedCountry}`).then((response, key) => {
            this.setState({
                // ${this.props.countrySlug}
                data: this.dataConvertion(response.data)
            });

        })
    };

    dataConvertion = (data) => {

        const convertedData = {
            labels: [],
            Deaths: [],
            Confirmed: [],
            Recovered: []
        };

        data.map((country) => {
            convertedData.labels.push(country.Date.slice(0, 10));
            convertedData.Deaths.push(country.Deaths);
            convertedData.Confirmed.push(country.Confirmed);
            convertedData.Recovered.push(country.Recovered);
        });

        const newData = {
            labels: [],
            Deaths: [],
            Confirmed: [],
            Recovered: []
        };
        const len = (convertedData.labels.length - 30);
        newData.labels = convertedData.labels.slice(len);
        newData.Deaths = convertedData.Deaths.slice(len);
        newData.Confirmed = convertedData.Confirmed.slice(len);
        newData.Recovered = convertedData.Recovered.slice(len);
        return newData;
    };

    render() {
        const data = {
            labels: this.state.data.labels,
            datasets: [
                {
                    label: 'Deaths',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgb(192,26,26)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgb(192,26,26)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgb(192,26,26)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.data.Deaths
                },
                {
                    label: 'Recovered',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgb(151,192,178)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.data.Recovered
                },
                {
                    label: 'Confirmed',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgb(192,190,20)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgb(192,190,20)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgb(192,190,20)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.data.Confirmed
                }
            ]
        };

        return (
            <article className="canvas-container">
                <h1 className="mx-auto w-25">{this.props.selectedCountry}</h1>
                <Line data={data}/>
            </article>
        );
    }
}

export default LineChartDemo;