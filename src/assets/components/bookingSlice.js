import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch hotels from the API
export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async () => {
    const response = await fetch('https://e4b3a13c-d8e4-4687-bac5-6001eebe3671-00-31n2czp7jgupl.pike.replit.dev/hotels');
    const data = await response.json();
    return data;
});

// Async thunk to book a hotel
export const bookHotel = createAsyncThunk('hotels/bookHotel', async ({ bookingData, token }, { rejectWithValue }) => {
    try {
        const response = await fetch('https://e4b3a13c-d8e4-4687-bac5-6001eebe3671-00-31n2czp7jgupl.pike.replit.dev/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Use token for authentication
            },
            body: JSON.stringify(bookingData),
        });

        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue(data.message);
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Hotel slice
const hotelSlice = createSlice({
    name: 'hotels',
    initialState: {
        hotels: [],
        status: 'idle',
        error: null,
        bookingStatus: 'idle',
        bookingError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle fetching hotels
        builder
            .addCase(fetchHotels.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.hotels = action.payload;
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        // Handle booking a hotel
        builder
            .addCase(bookHotel.pending, (state) => {
                state.bookingStatus = 'loading';
            })
            .addCase(bookHotel.fulfilled, (state) => {
                state.bookingStatus = 'succeeded';
            })
            .addCase(bookHotel.rejected, (state, action) => {
                state.bookingStatus = 'failed';
                state.bookingError = action.payload;
            });
    },
});

export default hotelSlice.reducer;
