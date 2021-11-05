import React from 'react';
import SearchBar from './SearchBar'; 
import youtube from '../apis/index';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyD-Mmqael5YQgPQKbU4tZLnX0EhStC0554'; 

class App extends React.Component { 
    state = { videos: [], selectedVideo: null}; 

    componentDidMount() {
        // this.onTermSubmit('');
        document.body.style.backgroundColor = "gray"
    }
    
    onTermSubmit = async (term) => { 
        const response = await youtube.get('/search', { 
            params: { 
                q: term, 
                part: 'snippet', 
                maxResults: 50, 
                type: 'video', 
                key: KEY, 
            }, 
        }); 
        
        this.setState({ 
            videos: response.data.items,
            selectedVideo: response.data.items[0], 
        });
    }; 

    onVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }
    
    render() { 
        return ( 
            <div className="ui container"> 
                <SearchBar onFormSubmit={this.onTermSubmit} /> 
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList 
                                onVideoSelect= {this.onVideoSelect} 
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