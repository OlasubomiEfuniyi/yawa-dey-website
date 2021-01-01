import React from 'react';


class EpisodePlayer extends React.Component {

    async getEpisodes() {
        const response = await fetch("http://localhost:8080/episodes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                seasonNumber: 1
            })
        });

        const result = await response.json();
        return result;
    }

    componentDidMount() {
        const episodes = this.getEpisodes();
        console.log(episodes);
    }

    render() {
        return (
            <table className = "EpisodePlayerTable">
                <tr className = "EpisodePlayerHeader">
                    <th>
                        <select name = "season" className = "SeasonSelector">
                            <option value = "Season 1" selected>Season 1</option>
                        </select>
                    </th>
                    <th></th>
                </tr>

                <tr>
                    <td className = "ButtonInfoGroup">
                        <i className="PlayButton fa fa-play-circle" aria-hidden="true"></i>
                        <div className = "EpisodeInfo">
                            <h1 className = "EpisodeTitle">Title</h1>
                            <h3 className = "EpisodeReleaseDate">Release Date</h3>
                        </div>
                    </td>

                    <td>Episode Art</td>
                </tr>
            </table>
        );
    }
}

export default EpisodePlayer;