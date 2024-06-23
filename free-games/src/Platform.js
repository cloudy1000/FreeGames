import React, { Component } from 'react';
import './Platform.css';

class Platform extends Component {
    // Initialize states
    constructor(props) {
        super(props);
        this.state = {
            // Array containing the titles of all games on PC
            pc_games: [],
            // Array containing the titles of all games on Browswer
            browser_games: [],
            // Boolean for whether to display the loading message for PC games or not
            loaded_pc: false,
            // Boolean for whether to display the loading message for Browser games or not
            loaded_browser: false
        };
    }

    // Fetch data from backend endpoint for display and sets the state of loaded to false once data is returned from fetch
    getGamesOnBrowser = async () => {
        try {
            // Fetches an array containing titles of all games on available on Browser
            const res = await fetch(`/Browser`, {
                "method": "GET"
            });

            // Set the state of the array to contain games on Browser
            if (res.status === 200) {
                const browser_games = await res.json();
                this.setState({
                    browser_games: browser_games,
                    loaded_browser: false
                });
            }

            // Fetch returned an empty array (something went wrong)
            else {
                this.setState({
                    browser_games: [],
                    loaded_browser: false
                });
            }

        }

        // Failed to fetch data from endpoint (something went wrong)
        catch (error) {
            console.error(error);
            this.setState({
                browser_games: [],
                loaded_browser: false
            });
        }
    }

    // Fetch data from backend endpoint for display, and sets the state of loaded to false once data is returned from fetch
    getGamesOnPc = async () => {
        try {
            // Fetches an array containing titles of all games that runs on PC
            const res = await fetch(`/PC`, {
                "method": "GET"
            });

            // Set the state of the array to contain games on PC
            if (res.status === 200) {
                const pc_games = await res.json();
                this.setState({
                    pc_games: pc_games,
                    loaded_pc: false
                });
            }

            // Fetch returned an empty array (something went wrong)
            else {
                this.setState({
                    pc_games: [],
                    loaded_pc: false
                });
            }

        }

        // Failed to fetch data from endpoint (something went wrong)
        catch (error) {
            console.error(error);
            this.setState({
                pc_games: [],
                loaded_pc: false
            });
        }
    }


    // Event handler to handle the user's click on the "PC" button
    handleClickPc = (event) => {
        // Sets the state of loading to true so the user is notified that the list is loading
        this.setState({
            loaded_pc: true
        });
        // Prevents the states from remaining default and ensures any changes made persist
        event.preventDefault();

        // Calls function to fetch games on PC
        this.getGamesOnPc();
    }


    // Event handler to handle the user's click on the "Browser" button
    handleClickBrowser = (event) => {
        // Sets the state of loading to true so the user is notified that the list is loading
        this.setState({
            loaded_browser: true
        });
        // Prevents the states from remaining default and ensures any changes made persist
        event.preventDefault();

        // Calls function to fetch games on Browser
        this.getGamesOnBrowser();
    }

    render() {
        const { pc_games, browser_games, loaded_browser, loaded_pc } = this.state;

        return (
            <div className='games'>
                <h1>Click To See Games On Platforms</h1>
                {/* Event handler for handling the event that the user clicks the PC button */}
                <button onClick={this.handleClickPc} className='pc-btn' type='submit'>PC</button>

                {/* Conditional rendering using short circuit operator */}
                {loaded_pc && <div className='loading-div'>Loading...</div>}

                {/* Conditional rendering using short circuit operator */}
                {/* Displays the titles of all games on PC */}
                {!loaded_pc && pc_games && <div>
                    {pc_games.map(game =>
                        <div key={game}>
                            <div>{game}</div>
                        </div>
                    )}
                </div>}

                {/* Event handler for handling the event that the user clicks the Browser button */}
                <button onClick={this.handleClickBrowser} className='browser-btn' type='submit'>Browser</button>

                {/* Conditional rendering using short circuit operator */}
                {loaded_browser && <div className='loading-div'>Loading...</div>}

                {/* Conditional rendering using short circuit operator */}
                {/* Displays the titles of all games on Browser */}
                {!loaded_browser && browser_games && <div>
                    {browser_games.map(game =>
                        <div key={game}>
                            <div>{game}</div>
                        </div>
                    )}
                </div>}
            </div>
        );
    }
}

export default Platform;
