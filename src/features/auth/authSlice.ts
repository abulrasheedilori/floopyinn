import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../common/firebase';
import { facebookProvider, googleProvider, database } from '../../common/firebase';
import { ref, set, push, get, update, remove } from 'firebase/database';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}
type AuthState = {
  user: User | null;
  members: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  members: [],
  status: 'idle',
  error: null,
  isAuthenticated: false,
};

// Helper function to write user data to the Realtime Database
const writeUserData = async (user: User) => {
  const userRef = ref(database, `users/${user.id}`);
  await set(userRef, user);
};

// Thunk to fetch all members from the Realtime Database
export const fetchMembers = createAsyncThunk('auth/fetchMembers', async () => {
  const membersRef = ref(database, 'users');
  const snapshot = await get(membersRef);
  const members: User[] = [];
  snapshot.forEach((childSnapshot) => {
    const member = childSnapshot.val();
    members.push(member);
  });
  return members;
});

// Thunk to sign up a user with email and password
export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ email, password, firstName, lastName }: { email: string; password: string; firstName: string; lastName: string }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    const user: User = {
      id: firebaseUser.uid,
      firstName,
      lastName,
      email: firebaseUser.email || '',
    };
    await writeUserData(user);
    return user;
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

// Thunk to sign in a user with Google
export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const firebaseUser = userCredential.user;
  const user: User = {
    id: firebaseUser.uid,
    firstName: firebaseUser.displayName?.split(' ')[0] || '',
    lastName: firebaseUser.displayName?.split(' ')[1] || '',
    email: firebaseUser.email || '',
  };
  await writeUserData(user);
  return user;
});

// Thunk to sign in a user with Facebook
export const signInWithFacebook = createAsyncThunk('auth/signInWithFacebook', async () => {
  const userCredential = await signInWithPopup(auth, facebookProvider);
  const firebaseUser = userCredential.user;
  const user: User = {
    id: firebaseUser.uid,
    firstName: firebaseUser.displayName?.split(' ')[0] || '',
    lastName: firebaseUser.displayName?.split(' ')[1] || '',
    email: firebaseUser.email || '',
  };
  await writeUserData(user);
  return user;
});

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
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpWithEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(signInWithEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signInWithFacebook.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser, clearUser, signOut } = authSlice.actions;
export default authSlice.reducer;
