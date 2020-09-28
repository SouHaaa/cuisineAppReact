import React from 'react';
import { Card, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import RecetteCard from './RecetteCard';
import Loading from './Loading';
import { Container, Row, Col } from 'react-grid-system';
import ErrorBoundary from '../ErrorBoundary';

export default class Acceuil extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.click = this.click.bind(this);
        this.state = {
            data: [],
            isLoaded: false,
            cuisines:
                ["African",
                    "American",
                    "British",
                    "Cajun",
                    "Caribbean",
                    "Chinese",
                    "Eastern European",
                    "European",
                    "French",
                    "German",
                    "Greek",
                    "Indian",
                    "Irish",
                    "Italian",
                    "Japanese",
                    "Jewish",
                    "Korean",
                    "Latin American",
                    "Mediterranean",
                    "Mexican",
                    "Middle Eastern",
                    "Nordic",
                    "Southern",
                    "Spanish",
                    "Thai",
                    "Vietnamese"],
            listOfCuisine: [],
            isEmpty: true,
            nom: '',
        }
    }
    componentDidMount() {
        let listCuisine = [];
        this.state.cuisines.map((e, i) => {
            listCuisine.push({
                key: i,
                text: e,
                value: e
            });
        });
        this.setState({ listOfCuisine: listCuisine, isEmpty: false });
        console.log("apiKey=" + window.$key);
        axios.get('https://api.spoonacular.com/recipes/complexSearch?number=25&apiKey=' + window.$key)
            .then(res => {
                this.setState({ data: res.data.results, isLoaded: true });
            })
            .catch(err => {
                console.log("Erreur survenue : ", err);
            })
    }

    componentWillUnmount() {

    }
    handleChange = (e, { value }) => {
        this.setState({
            nom: value
        });
        if (value !== '') {
            this.click(value);
        }

        // console.log(">> Date fin " + this.state.dateFin);
    }

    click(nom) {
        const selectedOption = nom;
        if (selectedOption !== '') {
            console.log("Changé changé ", nom);
            this.setState({ isLoaded: false });
            axios.get('https://api.spoonacular.com/recipes/complexSearch?cuisine=' + selectedOption + '&apiKey=' + window.$key)
                .then(res => {
                    this.setState({ data: res.data.results, isLoaded: true });
                })
                .catch(err => {
                    console.log("Erreur survenue : ", err);
                });
        }


    }
    render() {
        return (
            <Container style={{
                backgroundColor: 'white', margin: '1%',
                // paddingTop: '9%'
            }}>
                <Container style={{ margin: '1%' }}>
                    <Row>
                        <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                            <h3 style={{ color: '#ff944d' }}> Filtrer par type de cuisine </h3>
                        </Col>
                        <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                            {
                                this.state.isEmpty
                                    ?
                                    <Loading />
                                    :
                                    <Dropdown style={{ borderColor: "#ff944d" }}
                                        placeholder='filtrer par ..'
                                        fluid
                                        search
                                        selection
                                        options={this.state.listOfCuisine}
                                        //value={this.state.nom}
                                        onChange={this.handleChange}
                                       // onClick={this.click}
                                    />
                            }
                        </Col>
                    </Row>
                </Container>
                <br></br>
                {
                    this.state.isLoaded ?
                        <RecetteCard data={this.state.data} row={4} />
                        :
                        <Loading />

                }
            </Container>
        )
    }

}