import React from 'react';
import { Grid, Card, Feed, List } from 'semantic-ui-react';
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system';
import Loading from './Loading';
import ErrorBoundary from '../ErrorBoundary';
function ListItem(props) {

    const step = props.step
    return (
        <List.Item as='li' style={{ textAlign: 'left' }}> {step}</List.Item>
    );
}
function BigList(props) {
    const steps = props.steps;
    const listItems = steps.map((ele) =>

        <ListItem key={String(ele.id) + ele.step} step={ele.step} />
    );
    return (
        <List as='ol' ordered>
            {listItems}
        </List>
    );
}
export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instruction: [],
            isLoaded: false,
            ingredients: [],
            page: [],
            problem: false,
            emptyStep: false
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        const url1 = 'https://api.spoonacular.com/recipes/' + this.props.match.params.id + '/ingredientWidget.json?apiKey=' + window.$key;
        const url2 = 'https://api.spoonacular.com/recipes/' + this.props.match.params.id + '/analyzedInstructions?apiKey=' + window.$key;
        const url3 = 'https://api.spoonacular.com/recipes/' + this.props.match.params.id + '/ingredientWidget?apiKey=' + window.$key + '&defaultCss=true';
        const requestOne = axios.get(url1);
        const requestTwo = axios.get(url2);
        const requestThree = axios.get(url3);
        axios.all([requestOne, requestTwo, requestThree])
            .then(res => {
                console.log(res[1]);
                // console.log(res[2].data);

                if (res[1].data.length === 0 || res[0].data.length === 0) {
                    this.setState({ problem: true });
                }
                else {
                    this.setState({
                        ingredients: res[0].data.ingredients,
                        instruction: res[1].data[0].steps,
                        page: String(res[2].data),
                        isLoaded: true
                    });
                }
            })
            .catch(err => {
                console.log("Erreur survenue : ", err);
            })
    }

    componentWillUnmount() {
    }


    render() {
        if (this.state.problem) {
            return (<p> Une Erreur est survenue !! Nous allons régler le problème ! Veuillez nous excusez.</p>)
        } else
            return (
                <Container style={{
                    backgroundColor: 'white',
                }}>
                    <ErrorBoundary>
                        {
                            this.state.isLoaded ?
                                (
                                    <Row>
                                        <Col xs={10} sm={10} md={8} lg={8} xl={8}>
                                            <div style={{
                                                margin: '1%'
                                            }}>
                                                <h2 style={{ color: 'orange' }}>Les ingrédients</h2>
                                                <br></br>

                                                <div dangerouslySetInnerHTML={{ __html: this.state.page }} />

                                            </div>
                                        </Col>

                                        <Col xs={10} sm={10} md={4} lg={4} xl={4}>
                                            <div style={{
                                                margin: '1%'
                                            }}>
                                                <h2 style={{ color: 'orange' }}>Les étapes de prépatation</h2>
                                                <br></br>
                                                <BigList steps={this.state.instruction} />
                                            </div>
                                        </Col>
                                    </Row>

                                )
                                :
                                <Loading />
                        }

                    </ErrorBoundary>

                </Container>
            )
    }

}