import React from 'react';
import axios from 'axios';
import {getJwt} from '../helpers/jwt';
import '../App.css';
import {withRouter} from 'react-router-dom';
import FavoriteList from './FavoriteList';

class DashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: undefined,
            faveList: [],
            allUsers: [],
            bgUrl: undefined
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        axios({
            url: '/api/',
            method: 'GET',
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            const allUsers = res.data;
            this.setState({allUsers});
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
        axios({
            url: '/api/getuser',
            method: 'GET',
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            const user = res.data;
            const randomBackground = this.randomBackground();
            this.setState({
                currentUser: user, 
                bgUrl: randomBackground
            });
            this.pushToList(user[0].favelist);
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
    }

    randomBackground() {
        const backgroundList = ['dashboard1','dashboard2','dashboard3','dashboard4' ];
        const randNum = Math.floor(Math.random() * 4);
        return backgroundList[randNum];
    }

    pushToList(list){
        let updatedList = [];
        let realList = [];
        for(let i = 0; i < list.length; i++){
            updatedList.push(Object.keys(list[i]));
        }
        for(let i = 0; i < updatedList.length; i++){
            axios({
                "method":"GET",
                "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${updatedList[i]}`,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
                }
                })
                .then((response)=>{
                    realList.push(response.data);
                })
                .catch((error)=>{
                  console.log(error);
            })   
        }
        this.setState({faveList: realList});
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
            this.setState({currentUser: res.data});
            this.refreshFaveList();
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
    }

    handleChange = (event) => {
        this.setState({ 
            bgUrl: event.target.value 
        });
    };

    render() {
        const {currentUser, faveList, allUsers, bgUrl} = this.state;
        const {chooseSong} = this.props;
        let firstName;
        if(currentUser === undefined || faveList === undefined){
            firstName = "";
        } else{
            firstName = currentUser[0].firstname;
        }
        
        return(
            <div className={`${bgUrl} mt-2`}>
                <div className="border-dark border-bottom mt-1 ml-3 ">
                    <div className="row">
                        <div className="col mt-2"><h2>Welcome {firstName}</h2></div>
                        <div className="col text-center">
                            <div className="form-group mt-2 ml-6">
                                Choose a Theme
                                <br/>
                                <select value={this.state.bgUrl} onChange={this.handleChange} className="theme-dropdown">
                                    <option value="dashboard1">Oceans11</option>
                                    <option value="dashboard2">OrangeIsTheNewBlack</option>
                                    <option value="dashboard3">PlatinumRecords</option>
                                    <option value="dashboard4">HipHopYouDontStop</option>
                                </select>
                            </div>
                        </div>
                    </div>    
                </div>
                <div className="row">                   
                    <div className="col">
                        <div className="mt-2 ml-4">
                            <h5>My Playlist</h5>
                        </div>
                        <div className="dashboard-list-style">   
                            <FavoriteList id={currentUser} 
                                          chooseSong={chooseSong} 
                                          refresh={this.refreshFaveList}
                                          unlikeSong={this.unlikeSong}
                            />                                                  
                        </div>  
                    </div>
                    <div className="col">
                        <div className="mt-2 ml-4">
                            <h5>Other User's Playlists</h5>
                        </div> 
                        <div className="dashboard-list-style">
                            {
                                allUsers.map((user) => {
                                    if(user.firstname === firstName){
                                        return;
                                    }
                                    return (
                                        <div>
                                            <button className="btn dashboard-song-button" onClick={() => this.props.history.push(`/dashboard/${user._id}`)}> 
                                                {user.firstname}'s Playlist                     
                                            </button>   
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DashBoard);