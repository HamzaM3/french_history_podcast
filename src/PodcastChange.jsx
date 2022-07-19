import React from "react";

class PodcastChange extends React.Component {

    render() {
        let{prevPodcast, nextPodcast, name} = this.props;
        
        return <div className="my-5 mx-7 text-4xl grid grid-cols-[auto_1fr_auto]">
                <div className="bg-[#D9A75B] p-4 flex items-center justify-center rounded-l-3xl cursor-pointer" onClick={prevPodcast}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="bg-[#FFC46C] flex items-center justify-center">
                    {name}
                </div>
                <div className="bg-[#D9A75B] p-4 flex items-center justify-center rounded-r-3xl cursor-pointer" onClick={nextPodcast}>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
        </div>
    }
}

export default PodcastChange