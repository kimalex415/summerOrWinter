import React from 'react';
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    
    state = {lat:null, error: '', time: ''};
    
    // DATA LOADING GOES HERE...
    componentDidMount() {
        console.log('MOUNT')

        window.navigator.geolocation.getCurrentPosition(
            position => 
                this.setState({ lat:position.coords.latitude })
            ,
            error => this.setState({error: error.message})
        )
        
    }

    renderContent() {
        if(this.state.error && !this.state.lat) {
            return <div>Error: {this.state.error}</div>
        }

        if(!this.state.error && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <div><Spinner message="Please accept location request"/></div>
    }


    render() {
        console.log('render')
        return (
        <div className="border red">
            {this.renderContent()}
            {this.state.time}
        </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));
