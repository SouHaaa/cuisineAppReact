import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './NavigationBar.css'
import img from './images/chef.png';
import history from './history';


class NavigationBar extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            nom: '',
            redirect: false,

        }
    }
    componentDidMount() {
        this._isMounted = true;
       
        if (this._isMounted) {

        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    search() {
        this.setState({ redirect: true });
        window.location.href = "http://localhost:3000/search/" + this.state.nom;
        /* const nom = this.state.nom;
         console.log("onClick : ", this.state.nom);
         const { history } = this.props;
         if (history) history.push(`/search/${nom}`);*/

    }
    handleChange(event) {
        this.setState({ nom: event.target.value });
        console.log('change', event.target.value);
    }

    render() {

        return (
            <div style={{
                paddingBottom: '8%',
                // margin: '2%'
            }}>

                {<Navbar style={{
                    color: 'black',

                }}
                    bg="light"
                    expand="lg"
                    fixed="top">

                    <Navbar.Brand href="/">
                        <img
                            src={img}
                            width="50"
                            height="40"
                            className="rounded-circle"
                        />

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-5">
                            <Nav.Link href="/" active style={{color:"orangered", fontWeight:"bold"}}>MaCuisine</Nav.Link>

                        </Nav>
                        <Form inline //style={{width:"50%"}}
                        >
                            <FormControl type="text" placeholder="Cherchez une recette ou un ingrédient"
                                style={{ width: '350px',borderColor:"orangered"}} onChange={this.handleChange} className="mr-md-2" />
                            <Button variant="outline-danger" onClick={this.search}
                            //onClick={() => history.push(`/search/${this.state.nom}`)}

                            >chercher</Button>
                        </Form>
                    </Navbar.Collapse>


                </Navbar>
                }
                {
                    //   this.state.redirect &&
                    //     <Redirect push to={`/search/${this.state.nom}`} />
                }
            </div>
        );
    }
}

export default NavigationBar;
