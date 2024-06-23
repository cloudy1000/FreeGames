import React, { Component } from 'react';
import './GamesUrls.css';

class GamesUrls extends Component {
    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            // An array containing the URLs of all games
            urls: [],
            loading: false
        };
    }

    // Event handler for handling the event when the user presses the View URLs button
    handleClickViewUrls = () => {
        this.setState({
            loading: true
        });
        this.getGamesUrls(); // Calls function to fetch the array of URLs
    }


    // Fetch data from backend endpoint for displaying on browser
    getGamesUrls = async () => {
        try {
            const res = await fetch(`/urls`, {
                "method": "GET"
            });

            // Set the state of the urls array to the one retrieved from calling the endpoint
            if (res.status === 200) {
                const urls = await res.json();
                this.setState({
                    urls: urls,
                    loading: false
                });
            }

        }

        // Fetch failed to retrieve data from the endpoint, set the state urls to empty array
        catch (error) {
            console.error(error);
            this.setState({
                urls: [],
                loading: false
            });
        }
    }

    render() {
        const { urls, loading } = this.state;

        return (
            <div>
                <h1>URLs</h1>
                <div className="games-urls">
                    {/* Event handler for handling the event that the user clicks the View URLs button */}
                    <button onClick={this.handleClickViewUrls} className="url-btn" type='submit'>View URLs</button>

                    {/* Conditional rendering using short circuit operator */}
                    {loading && <div className='loading-div'>Loading...</div>}

                    {/* Conditional rendering using short circuit operator */}
                    {/* Display the urls as links using map */}
                    {!loading && urls && <div>
                        {urls.map(URL =>
                            <li key={URL}>
                                <a href={URL}>{URL}</a>
                            </li>
                        )}
                    </div>}
                </div>
            </div>
        );
    }
}

export default GamesUrls;
