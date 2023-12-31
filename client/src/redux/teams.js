import { createSlice } from '@reduxjs/toolkit';

export const teamsSlice = createSlice({
    name: 'teams',
    initialState: [],
    reducers: {
        setTeams: (state, action) => {
            return action.payload;
        },
        addTeam: (state, action) => {
            return [...state, action.payload];
        },
        deleteTeam: (state, action) => {
            const teamToDelete = state.find((team) => team.id === action.payload);
            if (teamToDelete && teamToDelete.users.length === 1) {
                return state.filter((team) => team.id !== action.payload);
            }
            return state;
        },
        addTeamMember: (state, action) => {
            const user = action.payload;

            return state.map((team) => {
                if (team.id === user.team_id) {
                  return {...team, users: [...team.users, user]};
                }
                return team;
              });
        },
        removeTeamMember: (state, action) => {
            const { teamId, userId } = action.payload;

            return state.map((team) => {
                if (team.id === teamId) {
                    const updatedMembers = team.users.filter((user) => user.id !== userId);
                    return { ...team, users: updatedMembers };
                }
                return team;
            });
        },
        updateTeamPoints: (state, action) => {
            const { teamId, points, userPoints, userId } = action.payload;
            return state.map((team) => {
                if (team.id === teamId) {
                    const updatedUsers = team.users.map((user) => {
                        if (user.id === userId) {
                            return { ...user, points: userPoints };
                        }
                        return user;
                    });
                    return { ...team, team_points: points, users: updatedUsers };
                }
                return team;
            });
        }
    }
});

// this is for dispatch
export const { setTeams, addTeam, deleteTeam, addTeamMember, removeTeamMember, updateTeamPoints } = teamsSlice.actions;

// this is for configureStore
export default teamsSlice.reducer;
