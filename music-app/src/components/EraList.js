import React from 'react';
import axios from 'axios';
import '../App.css';
import {getJwt} from '../helpers/jwt';
import unliked from './images/unliked.png';
import liked from './images/liked.png';

class EraList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: undefined,
            stringList: undefined
        }
        this.likeSong = this.likeSong.bind(this);
        this.unlikeSong = this.unlikeSong.bind(this);
        this.retrieveUser = this.retrieveUser.bind(this);
    }

    componentDidMount() {
        this.retrieveUser();
    }
    retrieveUser(){
        const jwt = getJwt();
        axios({
            url: '/api/getuser',
            method: 'GET',
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            const user = res.data;  
            this.pushToList(user);          
            console.log("State User: " + this.state.currentUser);
        })
        .catch((err) => {
            console.log('Error:' + err);
        }); 
    }

    pushToList(user){
        let list = user[0].favelist;
        let updatedList = [];
        for(let i = 0; i < list.length; i++){
            updatedList.push(parseInt(Object.keys(list[i])));
        }
        this.setState({
            stringList: updatedList, 
            currentUser: user
        })
        console.log("String List: " + this.state.stringList);
    }

    likeSong = (id) => {
        const songId = id;
        const jwt = getJwt();
        axios({
            url: '/api/like',
            method: 'PUT',
            data: JSON.stringify(songId),
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            console.log('User from DB: ' + JSON.stringify(res.data));
            this.retrieveUser();
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
    }

    unlikeSong = (id) => {
        const jwt = getJwt();
        axios({
            url: '/api/unlike',
            method: 'PUT',
            data: JSON.stringify(id),
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            this.retrieveUser();
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
    }
    

    render() {
        const {chooseSong, seventyList, eightyList, ninetyList} = this.props;
        const {currentUser, stringList} = this.state;
        const {era} = this.props.match.params;
        if(currentUser === undefined && stringList === undefined){
            return (
              <div><h1>Loading...</h1></div>
            )
        }
        let bgUrl;
        let songList;
        if(era === "70"){
            bgUrl = 'seventy-bg-style';
            songList = seventyList;
        }else if(era ==="80"){
            bgUrl = 'eighty-bg-style';
            songList = eightyList;
        }else{
            bgUrl = 'ninety-bg-style';
            songList = ninetyList;
        }
        return( 
            <div className={`container mt-2 text-left ${bgUrl}`}>
                <h1>The {era}'s</h1>
                <div className="list-container">                
                    {
                        songList.map((song) => {
                            return (
                                <div className="list-style" key={song.id}>
                                    {
                                        stringList.includes(parseInt(song.id)) ?
                                        <img onClick={() => this.unlikeSong(song.id)} src={liked} className="like-button" alt="like button" />
                                        :
                                        <img onClick={() => this.likeSong(song.id)} src={unliked} className="like-button" alt="unlike button" />
                                    }
                                    <button className="song-button" onClick={() => chooseSong(song.id)}> 
                                        <img src={song.album.cover_small} alt="artist" /> 
                                        <b>{song.artist.name}</b> - {song.title} 
                                    </button>   
                                </div>  
                            )       
                        })
                    }
                </div>
            </div>   
        )
    }
}

export default EraList;