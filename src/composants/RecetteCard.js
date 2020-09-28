import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ErrorBoundary from '../ErrorBoundary';
export default class RecetteCard extends React.Component {
    constructor(props) {
        super(props);
        this.toDetail = this.toDetail.bind(this);
        this.state = {
            data: [],
            isLoaded: false,
            redirect: false,
            id: 0,
        }
    }
    componentDidMount() {

    }

    componentWillUnmount() {
    }
    toDetail(id) {
        console.log("cliquer sur bouton", id);
        /*  let path = '/detail/4632';
          let history = useHistory();
          history.push(path);*/
        // window.location.assign("localhost:3000/detail/:4632");
        this.setState({ id: id, redirect: true })

    }
    render() {
        if (this.state.redirect === true) {
            return <Redirect to={`/detail/${this.state.id}`} />
        }
        return (
            <div style={{ margin: '1%' }}>
                <ErrorBoundary>
                    <Card.Group itemsPerRow={this.props.row} >
                        {this.props.data.map((r, i) => (
                            <Card fluid key={String(r.id)} >
                                <Image key={String(r.id)} src={r.image} wrapped />
                                <Card.Content>
                                    <Card.Header>{r.title}</Card.Header>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button className="btn-sm" basic color='blue' onClick={() => this.toDetail(r.id)}>Détails</Button>
                                </Card.Content>
                            </Card>
                        ))}

                    </Card.Group>
                </ErrorBoundary>
            </div>
        );
    }
}
