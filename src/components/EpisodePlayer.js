import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { CSSTransitionGroup } from 'react-transition-group';

const backend = "https://yawa-dey-backend.herokuapp.com"; //"http://localhost:8080"; 

class EpisodePlayer extends React.Component {
    constructor(props) {
        super(props);
        //the seasons and series arrays will always have "All" as their first value
        this.state = {seasonNumber: null, series: null, episodes: [], 
            seasonsList: ["All"], seriesList: ["All"], searchTerm:"", 
            filtered: true, err:false, errObject: null, loadingTable:false,
            displayFilters: true};
    }

    postRequestWithBody(endpoint, body, successCallback, errCallback) {
        fetch(`${backend}/${endpoint}`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => { //404 errors from the server still constitute a response
            response.json().then((result) => {
                if(response.ok) {
                    successCallback(result);
                } else {
                    errCallback(result);
                }
            }, (err) => {
                errCallback(err);
            });
        }, (err) => {
            errCallback(err);
        });
    }

    getRequestNoBody(endpoint, successCallback, errCallback) {
        fetch(`${backend}/${endpoint}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            response.json().then((result) => {
                if(response.ok) {
                    successCallback(result);
                } else {
                    errCallback(result);
                }
            }, (err) => {
                errCallback(err);
            });
        }, (err) => {
            errCallback(err);
        });
    }

    componentDidMount() {
        this.populateFilter();
        this.populateTable();
    }

    populateFilter() {
        this.getRequestNoBody("seasons", (result) => {
            console.log(result.seasons);
            this.setState({err: false, seasonsList: this.state.seasonsList.concat(result.seasons)});
        }, (err) => this.errorHandler(err));

        this.getRequestNoBody("series", (result) => {
            console.log(result.series);
            this.setState({err: false, seriesList: this.state.seriesList.concat(result.series)});
        }, (err) => this.errorHandler(err));
    }

    populateTable() {
        let body = {};

        //If search is being used, ignore filters, otherwise use filters
        if(this.state.filtered) {
            body = {
                filtered: true,
                seasonNumber: this.state.seasonNumber,
                series: this.state.series
            };
        } else {
            body = {
                filtered: false,
                searchTerm: this.state.searchTerm
            };
        }

        this.setState({loadingTable:true}, this.postRequestWithBody("episodes", body, (result) => {
            console.log(result.episodes);
            this.setState({loadingTable: false, err: false, episodes: result.episodes});
        }, (err) => this.errorHandler(err)));
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

    errorHandler(err) {
        this.setState({err: true, errObject: err});
    }

    toggleFilters(e) {
       this.setState({displayFilters: !this.state.displayFilters});
    }

    render() {
            if(!this.state.err) {
                return (
                    <div className  = "EpisodePlayerContainer">
                        <div className="EpisodePlayerFilterSmall">
                            {
                                this.state.displayFilters ? 
                                    <div onClick = {(e) => {this.toggleFilters(e)}}><i className="fa fa-times" aria-hidden="true"></i></div> :
                                    <div onClick = {(e) => {this.toggleFilters(e)}}><i className="fa fa-plus" aria-hidden="true"></i></div>
                            }
                            
                        </div>
                        {this.state.displayFilters ?

                            <div key = {1} className = "EpisodePlayerFilter">
                                <div className = "LeftFilters TopFilters">
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

                                    <div className="FilterButtonContainer"><button className = "FilterButton" id="applyFilter" onClick={(e) => {this.handleFilter(e)}}>Filter</button></div>
                                </div>

                                <div className = "RightFilters BottomFilters">
                                    <div>
                                        <input id = "title" name = "title" id = "searchInput" placeholder = "Search episodes by title" onInput = {(e) => {this.handleSearchInput(e)}} />
                                        <button className = "FilterButton" id = "searchButton" onClick = {(e) => {this.handleSearch(e)}}>Search</button>
                                    </div>
                                </div>
                            </div>
                        :
                            <div></div>
                        }

                        <ScaleLoader loading={this.state.loadingTable} height={250} margin = {10} width = {10}/>


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

                                        <td className="EpisodeDescription">{episode.description}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>);
                } else {
                    let typ = this.state.errObject.type;
                    switch(typ) {
                        case "CONN": 
                            return <p>The server encountered connection errors. Please try again.</p>;
                        case "PROC":
                            return <p>The server encountered errors while processing data related to your request. Please try again.</p>
                        case "IN":
                            return <p>The server encountered errors because of invalid input. Please check your input and try agian.</p>
                        default:
                            return <p>An unknown server error occured. Please try again</p>
                    }
                }
    }
}

export default EpisodePlayer;