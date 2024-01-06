import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const serverSlice = createSlice({
  name: 'server',
  initialState:{
    serverId: null,
    serverName: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setServerInfo: (state, action) => {

      state.serverId = action.payload.serverId;
      state.serverName = action.payload.serverName;
    },

  },

});

export const { setServerInfo} = serverSlice.actions;

export const selectServerId = (state) => state.server.serverId;
export const selectServerName = (state) => state.server.serverName;


export default serverSlice.reducer;
