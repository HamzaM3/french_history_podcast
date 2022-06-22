import React from "react";

class PodcastCover extends React.Component {
    render() {
        let {img_path, title} = this.props
        return <div className="bg-red-200 flex flex-col justify-center items-center gap-20 row-start-1 row-span-2 col-start-2">
            <img  className="object-cover h-[300px] w-[300px]" src={img_path} alt=''></img>
            <h2 className="text-red-700 text-4xl">{title}</h2>
        </div>
    }
}

export default PodcastCover;
