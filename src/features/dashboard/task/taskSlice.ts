import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ref, push, get, update, remove } from 'firebase/database';
import { database } from '../../../common/firebase';
import { TaskTabType } from './views/screens/TaskScreen';

export enum StatusType {
    IDLE = "idle",
    LOADING = "loading",
    SUCCEEDED = "succeeded",
    FAILED = "failed",
};

export type TaskType = {
    id: string;
    createdAt: string;
    title: string;
    createdBy: string;
    updatedAt?: number;
    content: string;
    flag: TaskTabType;
    teamLead: string;
    members: string[];
    completionRate: number;
    expiryDate: string;
  }
  
type TaskStateType = {
  tasks: TaskType[];
  status: StatusType;
  error: string | null
}

const initialState: TaskStateType = {
  tasks: [],
  status: StatusType.IDLE,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const tasksRef = ref(database, 'tasks');
    const snapshot = await get(tasksRef);
    const tasks: TaskType[] = [];
    snapshot.forEach((childSnapshot) => {
      const task = childSnapshot.val();
      task.id = childSnapshot.key;
      tasks.push(task);
    });
    return tasks;
  });

export const createTask = createAsyncThunk('tasks/createTask', async (task: Omit<TaskType, 'id'>) => {
    const tasksRef = ref(database, 'tasks');
    const newTaskRef = await push(tasksRef, task);
    return { ...task, id: newTaskRef.key! };
});
  
export const updateTask = createAsyncThunk('tasks/updateTask', async (task: TaskType) => {
    const taskRef = ref(database, `tasks/${task.id}`);
    await update(taskRef, task);
    return task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
    const taskRef = ref(database, `tasks/${taskId}`);
    await remove(taskRef);
    return taskId;
});
  
const authSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TaskType>) {
        state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<TaskType>) {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    updateTask(state, action: PayloadAction<TaskType>) {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        state.tasks[index] = action.payload;
    },
    clearTasks(state) {
      state.tasks = [];
    },
  },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTasks.pending, (state) => {
            state.status = StatusType.LOADING;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = StatusType.SUCCEEDED;
            state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.status = StatusType.FAILED;
            state.error = action.error.message || null;
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload);
            state.status = StatusType.SUCCEEDED;
        })
        .addCase(createTask.pending, (state) => {
          state.status = StatusType.LOADING;
      })
        .addCase(createTask.rejected, (state, action) => {
          state.status = StatusType.FAILED;
          state.error = action.error.message || null;
        })
        .addCase(deleteTask.pending, (state) => {
          state.status = StatusType.LOADING;
        })
        .addCase(deleteTask.rejected, (state, action) => {
          state.status = StatusType.FAILED;
          state.error = action.error.message || null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = StatusType.SUCCEEDED;
          state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
          const index = state.tasks.findIndex((task) => task.id === action.payload.id);
          if (index !== -1) {
          state.tasks[index] = action.payload;
          }
          state.status = StatusType.SUCCEEDED;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state
          state.error = action.error.message || null;
      })
      .addCase(updateTask.pending, (state) => {
          state.status = StatusType.LOADING;
      });
    },
  });

export const { addTask, clearTasks } = authSlice.actions;
export default authSlice.reducer;
