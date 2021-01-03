import React from 'react';

class EpisodePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {episodes: []};
    }

    async getEpisodes() {
        const response = await fetch("http://localhost:8080/episodes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                seasonNumber: "1"
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
        })
    }

    handlePlay(id) {
        this.setState({playing: id});
    }

    render() {
        return (
            <table className = "EpisodePlayerTable">
                <thead>
                    <tr className = "EpisodePlayerHeader">
                        <th>
                            <select name = "season" className = "SeasonSelector">
                                <option value = "Season 1" selected>Season 1</option>
                            </select>
                        </th>
                        <th></th>
                    </tr>
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
        );
    }
}

export default EpisodePlayer;