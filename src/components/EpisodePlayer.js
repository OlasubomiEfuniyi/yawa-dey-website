import React from 'react';

class EpisodePlayer extends React.Component {
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