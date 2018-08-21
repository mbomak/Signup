// import modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// import components
import Header from 'components/Header';
import DiceBoard from 'components/DiceBoard';

// import selectors and actions
import {
    selectors as dataSelectors,
    actions as dataActions,
} from 'modules/data';

// import styles
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        // take data from props container(reducer -> selectors,actions -> props)
        // const {
        //     balance,
        // } = this.props;

        return (
            <div className="app">
                <Header
                    title="Welcome to our game!"
                />
                <main className="app__content">
                    <div className="app__main">
                        <DiceBoard
                            className="mm"
                        />
                    </div>
                </main>
            </div>
        );
    }
}

App.propTypes = {
    // hash: PropTypes.string,
    // result: PropTypes.number,
    fetchData: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
    balance: dataSelectors.takeBalance
});

const mapDispatchToProps = {
    fetchData: dataActions.fetchData,
    fetchPhoto: dataActions.fetchPhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
