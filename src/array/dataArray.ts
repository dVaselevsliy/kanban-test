import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IssueType } from "../type/IssueType"

type DataType = {
  query: string
  link: string
  issues: IssueType[]
}

const initialState: DataType = {
  query: '',
  link: '',
  issues: [],
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload
    },
    setIssues: (state, action: PayloadAction<IssueType[]>) => {
      state.issues = action.payload
    }
  }
})

export default dataSlice.reducer
export const { setQuery, setLink, setIssues } = dataSlice.actions;