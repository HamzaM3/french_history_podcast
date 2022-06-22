import React from 'react'
import PodcastCover from './PodcastCover';
import Playlist from './Playlist';
import data from './data.js'
import Player from './Player';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {idx: 0, data}
        this.state.episode = new Audio(data[0].audio_lnk)
        this.state.playing = false

        this.switchEpisode = this.switchEpisode.bind(this)
        this.toggle = this.toggle.bind(this)
        this.prev = this.prev.bind(this)
        this.suiv = this.suiv.bind(this)
        this.seek = this.seek.bind(this)
        this.duration = this.duration.bind(this)
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

    switchEpisode(idx) {
        return () => {
            this.episode.pause()
            // let episode = new Howl ({
            //     src: data[idx].audio_lnk,
            //     html5: true
            // })
            let episode = new Audio(data[idx].audio_lnk)
            this.setState({episode, idx, playing:false})
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
        if (this.idx > 0)
            this.switchEpisode(this.idx - 1)()
    }

    suiv() {
        if (this.idx + 1 < this.data.length)
            this.switchEpisode(this.idx + 1)()
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
        console.log(proportion)
        let sec = this.duration() * (proportion / 100)
        if (!isNaN(sec)){
            this.episode.currentTime = sec;
        }
        console.log(this.seek())
    }

    render () {
        let {img_lnk, title, nb} = this.data[this.state.idx]


        return (<>
            <h1 className="bg-blue-200 text-blue-700 text-5xl text-center leading-relaxed py-10">The French History Podcast</h1>

            <Playlist data={data} switchEpisode={this.switchEpisode} idx={this.idx}></Playlist>

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
