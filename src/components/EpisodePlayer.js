import React from 'react';

class EpisodePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {seasonNumber: null, series: null, episodes: []};
    }

    async getEpisodes() {
        const response = await fetch("http://localhost:8080/episodes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                seasonNumber: this.state.seasonNumber,
                series: this.state.series
            })
        });

        const result = await response.json();
        return result;
    }

    componentDidMount() {
        const promise = this.getEpisodes();
        promise.then((result) => {
            console.log(result.episodes);
            this.setState({episodes: result.episodes});
        }, (err) => {
            console.log(err);
        });
    }

    handleSeasonSelection(e) {
        this.setState({seasonNumber: e.target.value});
    }

    handleSeriesSelection(e) {
        this.setState({series: e.target.value});
    }

    handleFilter(e) {
        const promise = this.getEpisodes();

        promise.then((result) => {
            console.log(`filter results: ${result.episodes}`);
            this.setState({episodes: result.episodes});
        }, (err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className  = "EpisodePlayerContainer">
                <div className = "EpisodePlayerFilter">
                    <div className = "LeftFilters">
                        <div>
                            <label for = "season" className = "FilterLabel">Season</label>
                            <select id = "season" name = "season" className = "FilterSelector" onChange={(e) => {this.handleSeasonSelection(e)}}>
                                <option value = "All" selected>All</option>
                                <option value = "1">Season 1</option>
                            </select>

                            <label for = "series" className = "FilterLabel">Series</label>
                            <select id = "series" name = "series" className = "FilterSelector" onChange={(e) => {this.handleSeriesSelection(e)}}>
                                <option value = "All" selected >All</option>
                                <option value = "Relationships">Relationships</option>
                            </select>

                            <button className = "FilterButton" id="applyFilter" onClick={(e) => {this.handleFilter(e)}}>Filter</button>
                        </div>
                    </div>

                    <div className = "RightFilters">
                        <div>
                            <input id = "title" name = "title" id = "searchInput" />
                            <button className = "FilterButton" id = "searchButton">Search</button>
                        </div>
                    </div>
                </div>
                <table className = "EpisodePlayerTable">
                    <thead>
                        
                    </thead>

                    <tbody>
                        {this.state.episodes.map((episode) => 
                            <tr>
                            <td className = "ButtonInfoGroup">
                                <a href = {episode.rssFeed}><i className="PlayButton fa fa-play-circle" aria-hidden="true"></i></a>
                                <div className = "EpisodeInfo">
                                    <h1 className = "EpisodeTitle">{episode.title}</h1>
                                    <h3 className = "EpisodeReleaseDate">{episode.releaseDate}</h3>
                                </div>
                            </td>

                            <td>{episode.description}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EpisodePlayer;