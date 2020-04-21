import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyAaA59WPN52EuMeADNXy9IkWMwWNruVoGA';

class App extends React.Component {
    state = { videos: [], selectedVideo: null };

    componentDidMount() {
        this.onTermSubmit(' comedy central ');
    }

    onTermSubmit = async term => {
        const response = await youtube.get("/search", {
        params: {
            q: term,
            part: "snippet",
            maxResults: 5,
            type: 'video',
            key: KEY
            }
        });

        this.setState({ videos: response.data.items});
    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    };

    render () {
        return (
            <div>
            <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                             <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList 
                            onVideoSelect={this.onVideoSelect}
                            videos={this.state.videos}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;