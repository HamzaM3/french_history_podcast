import React from 'react'
import PodcastCover from './PodcastCover';
import Playlist from './Playlist';
import data from './data.js'
import Player from './Player';
import PodcastChange from './PodcastChange';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {podcast_idx: 1, idx: 0, data}

        this.state.episode = new Audio(this.row(this.podcast_idx, this.idx).audio_lnk)
        this.state.playing = false

        this.switchEpisode = this.switchEpisode.bind(this)
        this.toggle = this.toggle.bind(this)
        this.prev = this.prev.bind(this)
        this.suiv = this.suiv.bind(this)
        this.seek = this.seek.bind(this)
        this.duration = this.duration.bind(this)
        this.prevPodcast = this.prevPodcast.bind(this)
        this.nextPodcast = this.nextPodcast.bind(this)
    }

    row(podcast_idx, idx) {
        console.log(podcast_idx)
        return this.state.data[podcast_idx].data[idx]
    }

    get podcast_idx() {
        return this.state.podcast_idx
    }

    get idx () {
        return this.state.idx
    }

    get data () {
        return this.state.data
    }

    get episode () {
        return this.state.episode
    }

    get playing () {
        return this.state.playing
    }

    switchEpisode(podcast_idx, idx) {
        return () => {
            this.episode.pause()
            console.log(podcast_idx, idx)
            let episode = new Audio(this.row(podcast_idx, idx).audio_lnk)
            this.setState({episode, podcast_idx, idx, playing:false})
        }
    }

    play() {
        this.state.episode.play()
        this.setState({playing:true})
    }

    pause() {
        this.state.episode.pause()
        this.setState({playing:false})
    }

    toggle() {
        if (this.state.playing) {
            this.pause()
        } else {
            this.play() 
        }
    }

    prev() {
        if (this.idx > 0) {
            console.log(this.idx)
            this.switchEpisode(this.podcast_idx, this.idx - 1)()
        }
    }

    suiv() {
        if (this.idx + 1 < this.data[this.podcast_idx].data.length)
            this.switchEpisode(this.podcast_idx, this.idx + 1)()
    }

    seek() {
        // Big problem with seek in Howler (don't have time to figure it out)
        return this.episode.currentTime
    }

    duration () {
        return this.episode.duration
    }

    changeTiming(proportion) {
        // Howler broke here (maybe my fault but don't care (by the way what is the use of this library)) Yes it is (I had ?ref=download)
        let sec = this.duration() * (proportion / 100)
        if (!isNaN(sec)){
            this.episode.currentTime = sec;
        }
    }
    
    prevPodcast () {
        let podcast_idx = (this.podcast_idx - 1 + this.data.length) % this.data.length;
        let idx = 0;
        this.switchEpisode(podcast_idx, idx)();
    }

    nextPodcast () {
        let podcast_idx = (this.podcast_idx + 1 + this.data.length) % this.data.length;
        let idx = 0;
        this.switchEpisode(podcast_idx, idx)();
    }

    render () {
        let {img_lnk, title, nb} = this.row(this.podcast_idx, this.idx)
        console.log(title)

        return (<>
            <h1 className="bg-[#383838] text-[#fff] text-5xl text-center leading-relaxed py-5">My History Podcasts</h1>

            <PodcastChange prevPodcast={this.prevPodcast} name={this.data[this.podcast_idx].name} nextPodcast={this.nextPodcast}/>

            <Playlist data={data[this.podcast_idx].data} switchEpisode={this.switchEpisode} nb={nb} podcast_idx={this.podcast_idx}></Playlist>

            <PodcastCover img_path={img_lnk} title={`${nb} - ${title}`}></PodcastCover>

            <Player 
                toggle={this.toggle} 
                playing={this.state.playing} 
                prev={this.prev} 
                suiv={this.suiv} 
                seek={this.seek} 
                duration={this.duration}
                changeTiming={this.changeTiming.bind(this)}
            />
        </>)
    }
}

export default App;
