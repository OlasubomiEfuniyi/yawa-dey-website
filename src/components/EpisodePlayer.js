import React from 'react';

class EpisodePlayer extends React.Component {
    constructor(props) {
        super(props);
        //the seasons and series arrays will always have "All" as their first value
        this.state = {seasonNumber: null, series: null, episodes: [], seasonsList: ["All"], seriesList: ["All"], searchTerm:"", filtered: true};
    }

    async getEpisodes() {
        let response = null;

        //If search is being used, ignore filters, otherwise use filters
        if(this.state.filtered) {
            response = await fetch("http://localhost:8080/episodes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filtered: true,
                    seasonNumber: this.state.seasonNumber,
                    series: this.state.series
                })
            });
        } else {
            response = await fetch("http://localhost:8080/episodes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filtered: false,
                    searchTerm: this.state.searchTerm
                })
            });
            
        }

        const result = await response.json();
        return result;
    }

    async getSeasons() {
        const response = await fetch("http://localhost:8080/seasons", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        return result;
    }

    async getSeries() {
        const response = await fetch("http://localhost:8080/series", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }   
        });

        const result = await response.json();
        return result;
    }

    componentDidMount() {
        this.populateFilter();
        this.populateTable();
    }

    populateFilter() {
        const seasonsPromise = this.getSeasons();
        const seriesPromise = this.getSeries();

        seasonsPromise.then((result) => {
            console.log(result.seasons);
            this.setState({seasonsList: this.state.seasonsList.concat(result.seasons)});
        }, (err) => {
            console.log(err);
        });

        seriesPromise.then((result) => {
            console.log(result.series);
            this.setState({seriesList: this.state.seriesList.concat(result.series)});
        }, (err) => {
            console.log(err);
        });
    }

    populateTable() {
        const episodesPromise = this.getEpisodes();

        episodesPromise.then((result) => {
            console.log(result.episodes);
            this.setState({episodes: result.episodes});
        }, (err) => {
            console.log(err);
        });
    }

    handleSeasonSelection(e) {
        this.setState({seasonNumber: e.target.value.toLowerCase() === "all" ? null : e.target.value});
    }

    handleSeriesSelection(e) {
        this.setState({series: e.target.value.toLowerCase() === "all" ? null : e.target.value });
    }

    handleFilter(e) {
        this.setState({filtered: true}, this.populateTable);
    }

    handleSearchInput(e) {
        this.setState({searchTerm: e.target.value});
    }

    handleSearch(e) {
        console.log(this.state);
        this.setState({filtered: false}, this.populateTable);
    }

    render() {
        return (
            <div className  = "EpisodePlayerContainer">
                <div className = "EpisodePlayerFilter">
                    <div className = "LeftFilters">
                        <div>
                            <label htmlFor = "season" className = "FilterLabel">Season</label>
                            <select id = "season" name = "season" className = "FilterSelector" onChange={(e) => {this.handleSeasonSelection(e)}}>
                                {this.state.seasonsList.map((value, index, array) => {
                                    if(index === 0) {
                                        return <option value = {value} key={index}>{value}</option>;
                                    } else {
                                        return <option value = {value} key = {index}>Season {value}</option>;
                                    }
                                })} 
                                
                            </select>

                            <label htmlFor = "series" className = "FilterLabel">Series</label>
                            <select id = "series" name = "series" className = "FilterSelector" onChange={(e) => {this.handleSeriesSelection(e)}}>
                                {this.state.seriesList.map((value, index, array) => {
                                    return <option value={value} key = {index}>{value}</option>
                                })}
                            </select>

                            <button className = "FilterButton" id="applyFilter" onClick={(e) => {this.handleFilter(e)}}>Filter</button>
                        </div>
                    </div>

                    <div className = "RightFilters">
                        <div>
                            <input id = "title" name = "title" id = "searchInput" placeholder = "Search episodes by title" onInput = {(e) => {this.handleSearchInput(e)}} />
                            <button className = "FilterButton" id = "searchButton" onClick = {(e) => {this.handleSearch(e)}}>Search</button>
                        </div>
                    </div>
                </div>
                <table className = "EpisodePlayerTable">
                    <thead>
                        
                    </thead>

                    <tbody>
                        {this.state.episodes.map((episode, index, array) => 
                            <tr key = {index}>
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