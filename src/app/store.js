import {createStore} from "redux";

const store =  createStore(function (state, action){
    if(action.type === "input-change") {
        return {
            ...state,
            inpText:action.payload.text
        }
    }
    if(action.type === "add-todo") {
        if(state.inpText.trim()){
            const id = new Date().valueOf()
            return {
                ...state,
                todoItems:[
                    {
                        id:id,
                        text:state.inpText,
                        completed:false
                    },
                    ...state.todoItems
                ],
                filteredByTab:[
                    ...state.filteredByTab,
                    {
                        id:id,
                        text:state.inpText,
                        completed:false
                    }
                ],
                inpText:''
            }
        }
        return state
    }
    if(action.type === "delete-todo") {
        return {
            ...state,
            todoItems:[
                ...state.todoItems.filter(e=>e.id !== action.payload.id)
            ],
            filteredByTab:[
                ...state.filteredByTab.filter(e=>e.id !== action.payload.id)
            ]
        }
    }
    if(action.type === "update-todo") {
        return {
            ...state,
            todoItems:[
                ...state.todoItems.map((e)=>{
                    if(e.id !== action.payload.id){
                        return e
                    } else{
                        return {...e,completed:action.payload.completed}
                    }
                })
            ],
            filteredByTab:[
                ...state.filteredByTab.map((e)=>{
                    if(e.id !== action.payload.id){
                        return e
                    } else{
                        return {...e,completed:action.payload.completed}
                    }
                })
            ]
        }
    }
    if(action.type === "update-text") {
        return {
            ...state,
            updatingTodo:{
                id:action.payload.id,
                text:action.payload.text,
                completed:action.payload.completed
            },
            inpText:action.payload.text
        }
    }
    if(action.type === "update-text-end") {
        return {
            ...state,
            todoItems:[
                ...state.todoItems.map((e)=>{
                    if(e.id !== state.updatingTodo.id){
                        return e
                    } else{
                        return {...e,text:state.inpText}
                    }
                })
            ],
            filteredByTab:[
                ...state.filteredByTab.map((e)=>{
                    if(e.id !== state.updatingTodo.id){
                        return e
                    } else{
                        return {...e,text:state.inpText}
                    }
                })
            ],
            updatingTodo:{
                id:'',
                text:'',
                completed:''
            },
            inpText:''
        }
    }
    if(action.type === "update-text-cancel") {
        return {
            ...state,
            updatingTodo:{
                id:'',
                text:'',
                completed:''
            },
            inpText:''
        }
    }
    if(action.type === "clear-completed") {
        return {
            ...state,
            todoItems: state.todoItems.filter((i)=>i.completed === false),
            filteredByTab: state.filteredByTab.filter((i)=>i.completed === false)
        }
    }
    if(action.type === "set-active-tab") {
        return {
            ...state,
            activeTab: action.payload.tab,
            filteredByTab:[...state.todoItems.filter((i)=> {
                if(action.payload.tab==="All"){
                    return i
                } else if(action.payload.tab==="Pending" && i.completed === false){
                    return i
                } else if(action.payload.tab==="Completed" && i.completed === true){
                    return i
                }
            })
            ].filter((i)=>  i.text?.toLowerCase().indexOf(state.searchText?.toLowerCase()) !== -1)
        }
    }
    if(action.type === "filter-a-z") {
        return {
            ...state,
            todoItems:[...state.todoItems.sort((a, b) => a.text.localeCompare(b.text))],
            filteredByTab:[...state.filteredByTab.sort((a, b) => a.text.localeCompare(b.text))],
            activeFilter:"az"
        }
    }
    if(action.type === "filter-z-a") {
        return {
            ...state,
            todoItems:[...state.todoItems.sort((a, b) => b.text.localeCompare(a.text))],
            filteredByTab:[...state.filteredByTab.sort((a, b) => b.text.localeCompare(a.text))],
            activeFilter:"za"
        }
    }
    if(action.type === "filter-clear") {
        return {
            ...state,
            todoItems:[...state.todoItems.sort((a, b) => b.id - a.id)],
            filteredByTab:[...state.filteredByTab.sort((a, b) => b.id - a.id)],
            activeFilter:""
        }
    }
    if(action.type === "set-search-text") {
        return {
            ...state,
            searchText:action.payload.text
        }
    }
    if(action.type === "search-todo") {
        return {
            ...state,
            filteredByTab:[...state.todoItems.filter((i)=> {
                if(state.activeTab==="All"){
                    return i
                } else if(state.activeTab==="Pending" && i.completed === false){
                    return i
                } else if(state.activeTab==="Completed" && i.completed === true){
                    return i
                }
            })
            ].filter((i)=>  i.text?.toLowerCase().indexOf(state.searchText?.toLowerCase()) !== -1)
        }
    }
    return state
},{
    inpText:"",
    todoItems: [
        {
            id:1706012884778,
            text:"Learn html",
            completed:false
        },
        {
            id:1706012884777,
            text:"Learn css",
            completed:false
        },
        {
            id:1706012884776,
            text:"Learn js",
            completed:false
        },
        {
            id:1706012884775,
            text:"Learn react",
            completed:true
        },
        {
            id:1706012884774,
            text:"Learn redux",
            completed:true
        },
        {
            id:1706012884773,
            text:"Create a new portfolio site",
            completed:false
        },
        {
            id:1706012884772,
            text:"Create an application using React Redux",
            completed:true
        },
        {
            id:1706012884771,
            text:"Redesign website",
            completed:false
        },
    ],
    filteredByTab:[],
    updatingTodo:{
        id:"",
        text:"",
        completed:false
    },
    activeTab:"All",
    activeFilter:"",
    searchText:''

})

export function inputChange(text) {
    return {
        type:"input-change",
        payload: {
            text
        }
    }
}
export function addTodo(newTodo) {
    return {
        type:"add-todo",
        payload: {
            newTodo: newTodo
        }
    }
}

export function deleteTodo(id) {
    return {
        type:"delete-todo",
        payload: {
            id: id
        }
    }
}

export function updateTodo(id,completed) {
    return {
        type:"update-todo",
        payload: {
            id,
            completed
        }
    }
}

export function updateText({id, text, completed}) {
    return {
        type:"update-text",
        payload: {
            id,
            text,
            completed
        }
    }
}
export function updateTextEnd() {
    return {
        type:"update-text-end"
    }
}
export function updateTextCancel() {
    return {
        type:"update-text-cancel"
    }
}

export function clearCompleted() {
    return {
        type:"clear-completed"
    }
}

export function setActiveTab(tab) {
    return {
        type:"set-active-tab",
        payload: {
            tab
        }
    }
}
export function filterAtoZ() {
    return {
        type:"filter-a-z"
    }
}
export function filterZtoA() {
    return {
        type:"filter-z-a"
    }
}
export function filterClear() {
    return {
        type:"filter-clear"
    }
}
export function setSearchText(text) {
    return {
        type:"set-search-text",
        payload: {
            text
        }
    }
}
export function searchTodo(text) {
    return {
        type:"search-todo"
    }
}

export default store