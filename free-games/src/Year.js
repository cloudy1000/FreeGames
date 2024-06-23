import React, { Component } from 'react';
import './Year.css';

// Updates the state year when the input year changes, making this a Controlled Component
class Year extends Component {
    // Initialize states
    constructor(props) {
        super(props);
        this.state = {
            /* Year based on user input */
            year: "",
            /* Array containing all games that was released in the specified year */
            gamesByYear: [],
            /* Boolean to indicate whether to display the loading message to the user or not */
            loading: false
        };
    }


    // Fetch data from backend endpoint for displaying, pass in year inputted by user
    getGamesByYear = async (year) => {
        try {
            const res = await fetch(`/year/${year}`, {
                "method": "GET"
            });

            // Set the state of the games array to the data returned from fetch
            if (res.status === 200) {
                const gamesByYear = await res.json();
                this.setState({
                    gamesByYear: gamesByYear,
                    loading: false
                });
            }

            // Fetch returned an empty array (no data based on user input)
            else {
                this.setState({
                    gamesByYear: [],
                    loading: false
                });
            }
        }

        // Fetch failed to retrieve data from endpoint, set the state of the games array to empty array
        catch (error) {
            console.error(error);
            this.setState({
                gamesByYear: [],
                loading: false
            });
        }
    }

    // Event handler for handling the event when the user enters a year in the input field
    handleChange = (event) => {
        this.setState({
            year: event.target.value
        });
    }


    // Event handler for handling the form submission event when the user presses submit/enter
    handleSubmit = (event) => {
        // Sets the state of loading to true once the user presses submit/enter
        this.setState({
            loading: true
        });
        // Prevents the states from remaining default and ensures any changes made to the form state persists
        event.preventDefault();

        // Calls function to fetch the games based on year inputted by the user
        this.getGamesByYear(this.state.year);
    }


    render() {
        const { year, gamesByYear, loading } = this.state;

        return (
            <div className="Year">
                {/* Render the list of games by year */}
                <div>
                    <h1>Find Games By Year</h1>
                    {/* Event handler to handle the event when the user presses submit/enter */}
                    {/* Passes an event object automatically by the browser upon submission of the form */}
                    {/* Resource: https://legacy.reactjs.org/docs/forms.html */}
                    <form onSubmit={(event) => this.handleSubmit(event)}>

                        {/* Event handler to handle the event when the user enters a year in the input field */}
                        {/* Updates the state year when the input year changes, making this a controlled component */}
                        <input
                            className="search-year"
                            type="number"
                            value={year}
                            onChange={this.handleChange}
                            placeholder='Enter a year...'
                        />

                        {/* Submit button */}
                        <input className="submit-btn" type="submit" value="Submit" />
                    </form>

                    {/* Conditional rendering using short circuit operator */}
                    {loading && <div className='loading-div'>Loading...</div>}

                    {/* Conditional rendering using short circuit operator */}
                    {/* Displays the titles of all games based on the user inputted year, once the data has been fetched */}
                    {!loading && gamesByYear && <div className="games-year">
                        {/* Creates a list of child elements or components with unique keys */}
                        {gamesByYear.map((game, index) =>
                            <div key={`game-title-${index}`}>
                                {game.title}
                            </div>
                        )}
                    </div>}

                </div>
            </div>
        );
    }
}

export default Year;
