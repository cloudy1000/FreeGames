import React, { Component } from 'react';
import './Genre.css';

// Updates the state genre when the input genre changes, making this a Controlled Component
class Genre extends Component {
    // Initialize states
    constructor(props) {
        super(props);
        this.state = {
            /* Genre based on user input */
            genre: "",
            /* Array containing all games of the genre */
            gamesByGenre: [],
            /* Boolean to indicate whether to display the loading message to the user or not */
            loading: false
        };
    }


    // Fetch data from backend endpoint for display, pass in genre inputted by the user
    getGamesByGenre = async (genre) => {
        try {
            const res = await fetch(`/genre/${genre}`, {
                "method": "GET"
            });

            // Set the state of the array of games based on genre specified by user input
            if (res.status === 200) {
                const gamesByGenre = await res.json();
                this.setState({
                    gamesByGenre: gamesByGenre,
                    loading: false
                });
            }

            // Fetch returned an empty array (no data based on user input)
            else {
                this.setState({
                    gamesByGenre: [],
                    loading: false
                });
            }

        }

        // Failed to fetch data from endpoint, set state of games array to empty
        catch (error) {
            console.error(error);
            this.setState({
                gamesByGenre: [],
                loading: false
            });
        }
    }

    // Event handler to handle the form submission event that the user presses submit/enter
    handleSubmit = (event) => {
        // Sets the state of loading to true so the user is notified that the list of games is loading
        this.setState({
            loading: true
        });
        // Prevents the states from remaining default and ensures any changes made to the form persist
        event.preventDefault();

        // Calls function to fetch games by genre based on user input of genre
        this.getGamesByGenre(this.state.genre);
    }


    // Event handler to handle the change event of the input field which the user enters a genre
    handleChange = (event) => {
        // Changes state of genre to the genre the user inputted
        this.setState({
            genre: event.target.value
        });
    }


    render() {
        const { gamesByGenre, loading } = this.state;

        return (
            <div className="Genre">
                {/* Render the list of games by genre */}
                <div>
                    <h1>Find Games By Genre</h1>
                    {/* handleSubmit event handler to handle the event that the user presses submit/enter */}
                    {/* Passes an event object automatically by the browser when the form is submitted */}
                    {/* Resource: https://legacy.reactjs.org/docs/forms.html */}
                    <form onSubmit={this.handleSubmit}>
                        {/* handleChange event handler to handle the event that the user enter a genre in the input field */}
                        {/* Updates the state genre when the input genre changes, making this a controlled component */}
                        <input
                            className="search-genre"
                            type="text"
                            value={this.state.genre}
                            onChange={this.handleChange}
                            placeholder="Enter a genre..."
                        />
                        {/* Submit button */}
                        <input className="submit-btn" type="submit" value="Submit" />
                    </form>

                    {/* Conditional rendering using short circuit operator */}
                    {loading && <div className='loading-div'>Loading...</div>}

                    {/* Conditional rendering using short circuit operator */}
                    {/* Displays the titles of all games based on genre inputted by the user, once the data has been fetched */}
                    {!loading && gamesByGenre && <div className="games-genre">
                        {/* Creates a list of child elements or components with unique keys */}
                        {gamesByGenre.map((game, index) =>
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

export default Genre;
