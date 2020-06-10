import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import axios from 'axios'
import LineChartDemo from "../../Components/Chartjs/LineChartDemo";
import {Row} from "reactstrap";
import Col from "reactstrap/es/Col";
import Refresh from "../../Components/Refresh/Refresh";
import Loader from '../../Components/loader/Loader'

const classes = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
    },
    selectStyle: {
        nimWith: 80,
    }
}));

class Detailed extends Component {

    state = {
        countries: null,
        selectedCountry: 'uzbekistan',
        loadingForm: true,
        hasData: false
    };

    getSelectValue = (e) => {
        this.setState({
            selectedCountry: e.target.value
        })
    };

    render() {
        const countries = this.state.countries;

        return this.state.loadingForm ? (
            <Loader/>
        ) : countries ? (
            <>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel
                        htmlFor="filled-age-native-simple"
                        data-shrink="true"
                    >
                        Country
                    </InputLabel>
                    <Select
                        native
                        onChange={this.getSelectValue}
                        inputProps={{
                            name: 'country',
                            id: 'filled-age-native-simple',
                        }}
                        className={classes.selectStyle}
                    >
                        {countries.map((country, key) => {
                            return (
                                <option
                                    value={countries[key].Slug}
                                    key={key}
                                >
                                    {countries[key].Country}
                                </option>
                            )
                        })}
                    </Select>
                </FormControl>
                <LineChartDemo selectedCountry={this.state.selectedCountry}/>
            </>
        ) : (<Row>
            <Col md={{size: 4, offset: 4}}>
                <Refresh/>
            </Col>
        </Row>)
    }

    componentDidMount() {
        const url = this.props.match.url.split("/");
        if (url.length > 2) {
            this.setState({
                selectedCountry: url[2]
            })
        }
        this.setState({
            loadingFrom:true
        });
        axios.get("https://api.covid19api.com/summary").then(res => {
            this.setState({
                countries: res.data.Countries
            });
            this.setState({
                hasData: true,
                loadingForm: false
            })
        }).catch(error=>{
            this.setState({
                loadingForm:false
            })
        })
    }
}

export default Detailed;

// Country: "Afghanistan"
// CountryCode: "AF"
// Date: "2020-06-08T18:00:04Z"
// NewConfirmed: 791
// NewDeaths: 30
// NewRecovered: 45
// Slug: "afghanistan"
// TotalConfirmed: 20342
// TotalDeaths: 357
// TotalRecovered: 1875