import React from "react";
import {v4} from 'uuid'

class PlaylistItem extends React.Component {
    render() {
        let {data_row, switchEpisode, selected} = this.props;
        let background = selected ? "bg-red-300" : "bg-blue-300"
        return <li className={`rounded-3xl flex p-7 m-7 ${background} gap-7 items-center cursor-pointer`} onClick={switchEpisode}>
            <img className='w-20 h-20 object-cover' src={data_row.img_lnk} alt=''></img>
            <h3 className="text-blue-900">{String(data_row.nb) + ' - ' + data_row.title}</h3>
            {/* Add the time length */}
        </li>;
    }
}

class Playlist extends React.Component {
    render() {
        let {data, switchEpisode, idx} = this.props
        return <ul className="playlist overflow-y-scroll bg-blue-200 col-start-1">
            {
                data.map((data_row, i) => <PlaylistItem key={v4()} data_row={data_row} switchEpisode={switchEpisode(i)} selected={i === idx}></PlaylistItem>)
            }
            
        </ul>
    }
}

export default Playlist
