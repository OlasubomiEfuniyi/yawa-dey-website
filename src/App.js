import './App.css';
import podcast_art from './podcast_art.png';
import EpisodePlayer from './components/EpisodePlayer';
import ListenButton from './components/ListenButton';

function App() {
  return (
    <div className="App">
      <div className = "Page">
        <div className = "Background">
          <div className = "Podcast-Art">
            <img src = {podcast_art} />
          </div>
        </div>

        <div className = "Summary">
          <h1 className = "Title">Yawa Dey</h1>
          <h3 className = "Host">By Olasubomi Efuniyi</h3>
          <p className = "Description">Tune in to listen to conversations on just about anything. 
          Yawa Dey will spotlight topics that have come up in various conversations I have had with people in recent times. 
          We will get different takes on these topics and have a laugh or two in the process (hopefully!).</p>
          <div className = "Listen-Buttons">
            <ListenButton iconClasses="Spotify-Icon fa fa-spotify" textClasses = "Listen" text = "Listen on Spotify" linkTo = "https://open.spotify.com/show/79dcEWCwJa1mnoszEUsjBo"/>
            {/*<ListenButton iconClasses="Apple-Podcast-Icon fa fa-podcast" textClasses = "Listen" text = "Listen on Apple Podcast" linkTo = "https://open.spotify.com/show/79dcEWCwJa1mnoszEUsjBo"/>*/}
          </div>
        </div>
        <div className = "EpisodePlayerContainer"><EpisodePlayer /></div>

        <div className = "Footer"><h5 className = "FooterText"><i className="fa fa-copyright" aria-hidden="true"></i>Yawa Dey 2021</h5></div>

      </div>
    </div>
  );
}

export default App;
