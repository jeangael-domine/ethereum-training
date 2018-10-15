import React, {Component} from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
    // video as argument is equivalent to having : props as argument and then const video = props.video;
    
    const imageUrl = video.snippet.thumbnails.default.url;

    return (
        <li className="list-group-item" onClick={ () => onVideoSelect(video)}>
            <div className="video-list media">
                <div className="media-left">
                    <img className="media-object" src={imageUrl} />
                </div>

                <div className="media-body">
                    <div className="media-heading">{video.snippet.title}</div>
                </div>
            </div>
        </li>
    );
};

export default VideoListItem;