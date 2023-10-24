import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { addTeamMember } from '../redux/teams'
import { removeTeamMember } from '../redux/teams'
import { addUserTeam } from '../redux/user'
import { removeUserTeam } from '../redux/user'

const TeamDetails = () => {

    const { teamName } = useParams();
    const [leaveRes, setLeaveRes] = useState(null);

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teams);
    const user = useSelector(state => state.user);
    

    const team = teams?.find((team) => team.team_name === teamName)
    console.log(team)

    function handleJoinTeam(e) {
        e.preventDefault()
        fetch(`/users/${user.id}/join_team`, {
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                team_id: team.id
            })
        })
        .then((r) => {
            if(r.ok) {
                r.json().then(updatedTeam => {
                    console.log(updatedTeam);
                    dispatch(addTeamMember(updatedTeam))
                    dispatch(addUserTeam(updatedTeam.id))
                });
            }
        })
    }

    function handleLeaveTeam(e) {
        e.preventDefault();
        fetch(`/users/${user.id}/leave_team`, {
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                team_id: null
            })
        })
        .then((r) => {
            if(r.ok) {
                r.json().then(response => {
                    dispatch(removeTeamMember({teamId: team.id, userId: user.id}))
                    dispatch(removeUserTeam())
                    setLeaveRes(response.message)
                    setTimeout(() => {
                        setLeaveRes(null);
                      }, 2000);
                });
            }
        })
    }
   
    if(!team) return <h1>Loading...</h1>

    return (
        <div>
            <h1>{team.team_name}</h1>
            <h2>{team.team_points} points</h2>
            <h2>Members</h2>
            {team.users.map((user) => (
                <div key={user.id}>
                    <ul>{user.first_name} {user.last_name}</ul>
                    <ul>{user.points} points</ul>
                    <ul>Handicap: {user.handicap}</ul>
                </div>
            ))}
            { user.team_id === null ? <button onClick={handleJoinTeam}>Join Team</button> : null }
            { team.id === user.team_id ? <button onClick={handleLeaveTeam}>Leave Team</button> : null }
            {leaveRes ? <h2>{user.first_name} {leaveRes}.</h2> : null}
        </div>
    )
}

export default TeamDetails;

//team image via Active storage?

