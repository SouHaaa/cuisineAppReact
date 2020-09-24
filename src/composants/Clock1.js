import React from 'react';

export default class Clock1 extends React.Component {
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        this.state = {
            age: 25,
            date: new Date(),
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date()
        });
        this.setState({}, () => { });
        this.setState([]);
        this.setState(() => { });

    }
    render() {
        return (
            <div>

                {this.props.name.length > 0 &&
                    <h2> JE m'appelle {this.props.name} et j'ai {this.state.age} , il est :
                  {this.state.date.toLocaleTimeString()}</h2>
                }
            </div>
        )
    }

}