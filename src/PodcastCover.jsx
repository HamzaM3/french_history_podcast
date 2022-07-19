import React from "react";

class PodcastCover extends React.Component {
    render() {
        let {img_path, title} = this.props
        return <div className="bg-[#484848] flex flex-col justify-center items-center gap-20 row-start-1 row-span-3 col-start-2">
            {img_path ? <img  className="object-cover h-[300px] w-[300px]" src={img_path} alt=''></img> : undefined}
            <h2 className="text-[#FFC46C] text-4xl">{title}</h2>
        </div>
    }
}

export default PodcastCover;
