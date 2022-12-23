import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createEvent = createAsyncThunk(
  "event/create",
  async (
    { formValue: updatedEventData, navigate, toast },
    { rejectWithValue }
  ) => {
    try {
      console.log("updated data", updatedEventData);
      const response = await api.createEvent(updatedEventData);
      toast.success("Created successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEvents = createAsyncThunk(
  "event/get",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getEvents(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEvent = createAsyncThunk(
  "event/getSingleEvent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getEvent(id.id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (
    { id, data: updatedEventData, toast, navigate },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updateEvent(id, updatedEventData);
      toast.success("Event updated successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      // navigate("/");
      console.log(response.data, "response data");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEventsByUser = createAsyncThunk(
  "event/getEventsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getEventsByUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    event: {},
    events: [],
    userEvents: [],
    tagEvents: [],
    relatedEvents: [],
    currentPage: 1,
    noOfPages: 1,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createEvent.pending]: (state, action) => {
      state.loading = true;
    },
    [createEvent.fulfilled]: (state, action) => {
      state.loading = false;
      state.events = action.payload;
    },
    [createEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    [getEvents.pending]: (state, action) => {
      state.loading = true;
    },
    [getEvents.fulfilled]: (state, action) => {
      state.loading = false;
      state.events = action.payload.data;
      state.noOfPages = action.payload.noOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getEvents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    [getEvent.pending]: (state, action) => {
      state.loading = true;
    },
    [getEvent.fulfilled]: (state, action) => {
      state.loading = false;
      state.event = action.payload;
    },
    [getEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    [getEventsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getEventsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userEvents = action.payload;
    },
    [getEventsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    [updateEvent.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userEvents = state.userEvents.map((item) =>
          item._id == id ? action.payload : item
        );
        state.events = state.events.filter((item) =>
          item._id == id ? action.payload : item
        );
      }
    },
    [updateEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    [updateEvent.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { setCurrentPage } = eventSlice.actions;
export default eventSlice.reducer;
