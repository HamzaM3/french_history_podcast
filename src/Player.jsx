import React from "react";

function PlayButton(props) {
    let {toggle, playing} = props
    let button
    if (playing) {
        button = <i className="fa-solid fa-pause"></i>
    } else {
        button = <i className="fa-solid fa-play"></i>
    }
    return <div onClick={toggle} className='bg-white rounded-full text-4xl text-center w-[70px] h-[70px] flex items-center justify-center'>
        {button}
    </div>
    
}

function Buttons(props) {
    let {toggle, playing, prev, suiv} =props
    return <div className="text-red-500 flex justify-center items-center gap-5 pt-8 pb-6">
        <div onClick={prev} className='bg-white rounded-full text-2xl text-center w-[50px] h-[50px] flex items-center justify-center'>
            <i className="fa-solid fa-backward"> </i>
        </div>
        <PlayButton toggle={toggle} playing={playing}></PlayButton>
        <div onClick={suiv} className='bg-white rounded-full text-2xl text-center w-[50px] h-[50px] flex items-center justify-center'>
            <i className="fa-solid fa-forward"></i>
        </div>
    </div>
}

class PlayBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.circle_diameter = 32;
        this.line_height = 12;
        this.changeTiming = null
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            // I wanted to tell it to render directly but nope
            this.setState({})
        }, 100)
    }

    getTime(seek, duration) {
        let current_secs = seek(), current_mins;
        let total_secs = duration(), total_mins;
        
        // Factorizable

        if (!isNaN(current_secs)){
            [current_mins, current_secs] = [Math.floor(current_secs / 60), Math.floor(current_secs % 60)];
        } else {
            [current_mins, current_secs] = [0, 0]
        }
        [current_mins, current_secs] = [current_mins.toString().padStart(2, '0'),
                                        current_secs.toString().padStart(2, '0')]

        if (!isNaN(total_secs)){
            [total_mins, total_secs] = [Math.floor(total_secs / 60), Math.floor(total_secs % 60)];
        } else {
            [total_mins, total_secs] = [0, 0]
        }
        [total_mins, total_secs] = [total_mins.toString().padStart(2, '0'),
                                    total_secs.toString().padStart(2, '0')];
        
        return [current_mins, current_secs, total_mins, total_secs]
    }

    barClicked(e) {
        console.log(e)
        console.log(e.currentTarget)
        let proportion = 100 * e.nativeEvent.offsetX / e.currentTarget.offsetWidth
        this.props.changeTiming(proportion)
    }
        

    render () {
        let {seek, duration, changeTiming} = this.props

        let [current_mins, current_secs, total_mins, total_secs] = this.getTime(seek, duration)

        let proportion = 100 * seek()  / duration();

        return <div className="pl-16 flex gap-20 items-center justify-start">
            <div className="">
                <div id="line" className="w-[80vw] h-[12px] bg-rose-500 rounded-[6px] relative" onClick={this.barClicked.bind(this)}>
                <div id="circle"
                     className="h-[32px] w-[32px] bg-rose-500 rounded-full absolute top-[-10px] border-2 border-red-600 pointer-events-none"
                     style={{left: `calc(${proportion}% - 16px`}}
                     >
                </div>
                </div>
            </div>
            <div className="bg-white px-3 py-2 rounded-[30px] text-red-900 text-xl font-bold">
                {current_mins}:{current_secs} / {total_mins}:{total_secs}
            </div>
        </div>
    }
}

class Player extends React.Component {
    render () {
        let {toggle, playing, prev, suiv, seek, duration, changeTiming} =this.props
        return <div className="bg-blue-500 col-span-2"> 
            <Buttons toggle={toggle} playing={playing} prev={prev} suiv={suiv}/>
            <PlayBar seek={seek} duration={duration} changeTiming={changeTiming}/>
        </div>
    }
}

export default Player
