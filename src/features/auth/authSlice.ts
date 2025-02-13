import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../common/firebase';
import { facebookProvider, googleProvider, database } from '../../common/firebase';
import { ref, set, get, update, remove, getDatabase } from 'firebase/database';
import { StatusType } from '../dashboard/task/taskSlice';


export type User = {
  id?: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password?: string;
  photoURL?: string;
};

type AuthState = {
  user: User | null;
  members: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isAuthenticated: boolean;
  darkMode: boolean;
}

const initialState: AuthState = {
  user: null,
  members: [],
  status: 'idle',
  error: null,
  isAuthenticated: false,
  darkMode: false,
};

// Helper function to write user data to the Realtime Database
const writeUserData = async (user: User) => {
  const userRef = ref(database, `users/${user.id}`);
  await set(userRef, user);
};

// Thunk to fetch all members from the Realtime Database
export const fetchMembers = createAsyncThunk("auth/fetchMembers", async (_, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    if (!auth.currentUser) {
      return rejectWithValue("User is not authenticated");
    }

    const db = getDatabase();
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      return [];
    }

    const members = Object.values(snapshot.val()); // Convert Firebase object to array
    return members;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async (user: User) => {
    if (!user.email || !user.password) {
      throw new Error('Email and password are required');
    }
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    const firebaseUser = userCredential.user;
    const newUser = {
      id: firebaseUser.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL || ""
    };
    await writeUserData(newUser);
    return newUser;
  }
);

// Thunk to sign in a user with email and password
export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    const userRef = ref(database, `users/${firebaseUser.uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val() as User;
    } else {
      throw new Error('User data not found in the database.');
    }
  }
);

// 🔹 Google Sign-In Thunk
export const googleSignIn = createAsyncThunk('auth/googleSignIn', async (_, { rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!user) {
      throw new Error("Invalid Google login credentials.");
    }

    // Reference to user data in Firebase database
    const userRef = ref(database, `users/${user.uid}`);

    // Check if the user exists
    const snapshot = await get(userRef);
    const newUser: User = {
      id: user.uid,
      firstName: user.displayName?.split(" ")[0] || "",
      lastName: user.displayName?.split(" ")[1] || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
    };
    if (!snapshot.exists()) {
      // If user does not exist, create new user in Firebase
      await set(userRef, newUser);
    }
    return newUser;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// 🔹 Facebook Sign-In Thunk
export const facebookSignIn = createAsyncThunk(
  'auth/facebookSignIn',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      // Reference to user data in Firebase Realtime Database
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      const newUser: User = {
        id: user.uid,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email,
        photoURL: user.photoURL || "",
      };

      if (snapshot.exists()) {
        // User exists, update the details instead of rejecting
        await update(userRef, newUser);
      } else {
        // User does not exist, create new record
        await set(userRef, newUser);
      }
      console.error("Facebook Sign-In Success");

      return newUser;
    } catch (error: any) {
      console.error("Facebook Sign-In Error:", error);

      if (error.code === "auth/account-exists-with-different-credential") {
        return rejectWithValue("Seems you already register with other provider. Kindly log in with it.");

      }
      return rejectWithValue("Facebook authentication failed. Please try again.");
    }
  }
);


// Thunk to update user data
export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async (user: User) => {
    const userRef = ref(database, `users/${user.id}`);
    await update(userRef, user);
    return user;
  }
);

// Thunk to delete a user
export const deleteUser = createAsyncThunk('auth/deleteUser', async (userId: string) => {
  const userRef = ref(database, `users/${userId}`);
  await remove(userRef);
  return userId;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      auth.signOut();
      state.user = null;
      state.isAuthenticated = false;
    },
    toggleTheme(state) {
      if (state.darkMode) { state.darkMode = false; } else { state.darkMode = true; }
    },
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;

    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = StatusType.LOADING;
      })
      .addCase(fetchMembers.fulfilled, (state, action: any) => {
        state.status = StatusType.SUCCEEDED;
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = StatusType.FAILED;
        state.error = action.error.message || null;
      })

      .addCase(signUpWithEmail.pending, (state) => {
        state.status = StatusType.LOADING;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.status = StatusType.SUCCEEDED;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.status = StatusType.FAILED;
        state.isAuthenticated = false;
        state.error = action.error.message || null;
      })

      .addCase(signInWithEmail.pending, (state) => {
        state.status = StatusType.LOADING;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.status = StatusType.SUCCEEDED;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.status = StatusType.FAILED;
        state.isAuthenticated = false;
        state.error = action.error.message || null;
      })

      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.status = StatusType.SUCCEEDED;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.status = StatusType.FAILED;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

      .addCase(facebookSignIn.fulfilled, (state, action) => {
        state.status = StatusType.SUCCEEDED;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(facebookSignIn.rejected, (state, action) => {
        state.status = StatusType.FAILED;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { signOut, toggleTheme, setUser, setAuthState } = authSlice.actions;
export default authSlice.reducer;
