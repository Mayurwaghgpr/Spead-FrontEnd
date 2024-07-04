import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
// const post = JSON.parse(localStorage.getItem("selectedPost"));
const initialState = {
    selectedPostId:'',
    postsData: [],
    topiclist:[],
    submit: false,
    beforsubmit: false,
    elements:[
    { type: "text", data: "", id: uuidv4(), index: 0 },
    { type: "text", data: "", id: uuidv4(), index: 1 },
  ]
}


const PostSclic = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setSelectedPostId: (state,action) => {
            state.selectedPostId = action.payload
        },
        setData: (state,action) => {
            state.postsData = action.payload
        },
        FilterData: (state, action)=>{
            state.postsData = state.postsData.filter(post=> post.id !== action.payload)
        },
        setTopiclist: (state, action) => {
            state.topiclist = action.payload
        },
        setElements: (state, action) => {
            state.elements = action.payload
        },
        setSubmit: (state,action) => {
            state.submit = action.payload
        },
        setBeforeSubmit: (state, action) => {
            state.beforsubmit = action.payload
        }
    }
})


export const { setSelectedPostId, setData, setTopiclist, setSubmit ,setBeforeSubmit ,FilterData,setElements} = PostSclic.actions

export default PostSclic.reducer