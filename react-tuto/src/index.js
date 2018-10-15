import _ from 'lodash';
// Here react is the name of the folder
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAyezhIbYHB8s0FOY_8oQJ6ouF6OZ6Yqik';

// Create a new component. This component should produce some HTML
class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }
    
    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term}, (videos) =>{
            this.setState({
                 videos: videos,
                 selectedVideo: videos[0]
            }); // equivalent to this.setState({ videos: videos}); because the name of the attribute is the same 
            // as the name of the argument
        });
    }

    render() {
        // makes a version of the videoSearch function that cannot be called two times in a row before 300 ms have elapsed
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoList 
                    onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
                    videos={ this.state.videos }/>
                <VideoDetail video={ this.state.selectedVideo }/>
            </div>
        );
    }
}


// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
