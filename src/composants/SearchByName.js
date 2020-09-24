import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import axios from 'axios';
import RecetteCard from './RecetteCard';
import { Dropdown } from 'semantic-ui-react';
import Loading from './Loading';


export default class SearchByName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: '',
            isLoaded: false,
        }
    }
    componentDidMount() {
        const nom = this.props.match.params.nom;
        console.log("nom=" + nom);
        this.setState({ name: nom });
        const url = 'https://api.spoonacular.com/recipes/complexSearch?query=' + nom + '&apiKey=' + window.$key;
        axios.get(url)
            .then(res => {
                this.setState({ data: res.data.results, isLoaded: true });
            })
            .catch(err => {
                console.log("Erreur survenue : ", err);
            })
    }

    componentWillUnmount() {
    }


    render() {
        return (
            <div style={{
                backgroundColor: 'white',
                // paddingTop: '9%'
            }}>
                <h1 style={{color:'orange'}}> Les recettes de {this.state.name}</h1>
                <br></br>
                {
                    this.state.isLoaded ? <RecetteCard data={this.state.data} row={4} />
                        : <Loading />

                }
            </div>
        )
    }

}