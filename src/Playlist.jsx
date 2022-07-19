import React from "react";
import {v4} from 'uuid'

class PlaylistItem extends React.Component {
    render() {
        let {data_row, switchEpisode, selected} = this.props;
        let background = selected ? "bg-[#C0770A]" : "bg-[#FFC46C]"
        let textColor = selected ? "text-[#FEE4BC]" : "text-[#000]"
        return <li className={`rounded-3xl flex p-7 m-7 ${background} gap-7 items-center cursor-pointer`} onClick={switchEpisode}>
            {data_row.img_lnk ? <img className='w-20 h-20 object-cover' src={data_row.img_lnk} alt=''></img> : undefined}
            <h3 className={textColor}>{String(data_row.nb) + ' - ' + data_row.title}</h3>
            {/* Add the time length */}
        </li>;
    }
}

class Playlist extends React.Component {
    render() {
        let {data, switchEpisode, nb, podcast_idx} = this.props
        return <ul className="playlist overflow-y-scroll bg-[#383838] col-start-1">
            {
                data.map((data_row, i) => <PlaylistItem key={v4()} data_row={data_row} switchEpisode={switchEpisode(podcast_idx, i)} selected={data_row.nb === nb}></PlaylistItem>)
            }
            
        </ul>
    }
}

export default Playlist
