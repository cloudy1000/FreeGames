import React, { Component } from 'react';
import './TopBar.css';
class TopBar extends Component {
    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            // Array containing all games, returned from fetch
            games: [],
            // Index to access a game in the games array
            index: 0
        };
    }

    // Called automatically by React as soon as the component is mounted
    componentDidMount = async () => {
        try {
            // Fetch returns an array of all the games
            const res = await fetch(`/description`, {
                "method": "GET"
            });

            // Set the state of the games array to the one retrieved from calling the endpoint
            if (res.status === 200) {
                const games = await res.json();
                this.setState({
                    games: games
                });
            }

        }

        // Fetch failed to retrieve data from the endpoint, set the state of games to an empty array
        catch (error) {
            console.error(error);
            this.setState({
                games: []
            });
        }

        // Use setInterval to increment the state of index every every 50 seconds to access a different game every 50 seconds
        // Resource: https://sebhastian.com/setinterval-react-class/ */
        this.interval_id = setInterval(() => {
            this.setState(prevIndex => ({ index: prevIndex.index + 1 }));
        }, 50000);
    }

    // Clear interval
    componentWillUnmount() {
        clearInterval(this.interval_id);
    }


    // Event handler for handling the event when the user clicks "Click Me" to view information about another game
    // handleClick = () => {
    //     // Increment the state of index
    //     this.setState(prevIndex => ({ index: prevIndex.index + 1 }));
    // }

    render() {
        const { games, index } = this.state;

        // If the length of the games array is less than index, then reset the state of index to 0
        if (games.length < index) {
            this.setState({
                index: 0
            });
        }

        return (
            <nav className='quote-container'>
                {/* Event handler for handling the event that the user clicks the Click Me button */}
                {/* <button onClick={this.handleClick} className="click-me" type='submit'>Click Me</button> */}

                {/* Resource: https://www.html.am/html-codes/marquees/html-scrolling-text.cfm */}
                {/* Displays games[index].title and games[index].short_description */}
                {/* Note index will automatically be incremented every 50 seconds by using setInterval, so that information from a different game can be displayed every 50 seconds */}
                <marquee behavior="scroll" direction="left">{games.length > index && games[index].title.toUpperCase()} {games.length > index && games[index].short_description.toUpperCase()}</marquee>
            </nav>
        );
    }
}

export default TopBar;