import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {
    addTodo,clearCompleted,deleteTodo, filterAtoZ, filterClear, filterZtoA,
    inputChange, searchTodo, setActiveTab, setSearchText,
    updateText,updateTextCancel,updateTextEnd,updateTodo
} from "./app/store";
import {MdDelete, MdModeEdit} from "react-icons/md";
import {useEffect, useRef} from "react";
import {FaSortAlphaDown, FaSortAlphaDownAlt} from "react-icons/fa";
import {LuFilterX} from "react-icons/lu";
import {TransitionGroup, CSSTransition} from "react-transition-group";

function App() {
    const inputField = useRef()
    const dispatch = useDispatch()
    const inpText = useSelector((store)=>store.inpText)
    const updatingTodoText = useSelector((store)=>store.updatingTodo.text)
    const activeTab = useSelector((store)=>store.activeTab)
    const filteredByTabs = useSelector((store)=>store.filteredByTab)
    const activeFilter = useSelector((store)=>store.activeFilter)
    const searchText = useSelector((store)=>store.searchText)

    useEffect(() => {
        dispatch(setActiveTab("All"))
    }, []);


    const search = (text)=>{
        dispatch(setSearchText(text))
        dispatch(searchTodo())
    }

    return (
    <div className="App">
        <h1>TODO LIST</h1>
        {updatingTodoText ? <div className="block"></div>:null}
        {updatingTodoText ? inputField.current.focus():null}

        <form onSubmit={(e) => {
              e.preventDefault()
              dispatch(addTodo())
              dispatch(setActiveTab(activeTab))
              }}
        >
            <input type={"text"}
                   ref={inputField}
                   placeholder="Add new task"
                   value={inpText}
                   onChange={(e) => {
                       dispatch(inputChange(e.target.value))
                   }}
            />
            <div className='form-btns'>
                {updatingTodoText
                    ?<span>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(updateTextEnd())
                            }}
                        >
                            Update
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(updateTextCancel())
                            }}
                        >
                            Cancel
                        </button>
                    </span>
                    :<button>Add todo</button>
                }
            </div>
        </form>
        <div className="tab-search-filter">
            <div className="tabs">
            <span onClick={() => dispatch(setActiveTab("All"))}
                  className={activeTab === "All" ? "clicked" : null}
            >
                All
            </span>
                <span onClick={() => dispatch(setActiveTab("Pending"))}
                      className={activeTab === "Pending" ? "clicked" : null}
                >
                Pending
            </span>
                <span onClick={() => dispatch(setActiveTab("Completed"))}
                      className={activeTab === "Completed" ? "clicked" : null}
                >
                Completed
            </span>
            </div>
            <div className="search-filter">
                <div className="search">
                    <input type="text"
                           placeholder="Search..."
                           value={searchText}
                           onChange={(e) => {
                               search(e.target.value)
                           }}
                    />
                    {searchText
                        ? <span className="search-close" onClick={() => search("")}>x</span>
                        : null
                    }
                </div>
                <div className="filters">
                    {activeFilter
                        ? <div tooltip={"Clear_filter"} onClick={() => dispatch(filterClear())}>
                            <LuFilterX/>
                        </div>
                        : null
                    }
                    <div className={activeFilter === "az" ? "activeFilter" : null}
                         onClick={() => dispatch(filterAtoZ())}
                         tooltip={"Filter_from_A_to_Z"}
                    >
                        <FaSortAlphaDown/>
                    </div>
                    <div className={activeFilter === "za" ? "activeFilter" : null}
                         onClick={() => dispatch(filterZtoA())}
                         tooltip={"Filter_from_Z_to_A"}
                    >
                        <FaSortAlphaDownAlt/>
                    </div>
                </div>
            </div>

        </div>

        <TransitionGroup>
            {filteredByTabs.map((item) => (
                <CSSTransition
                    key={item.id}
                    timeout={500}
                    classNames="item1"
                >
                    <div className={item.completed ? "todo-item checked" : "todo-item"}>
                        <input type={"checkbox"}
                               checked={item.completed ? "checked" : null}
                               onChange={(e) => {
                                   dispatch(updateTodo(item.id, e.target.checked))
                                   dispatch(setActiveTab(activeTab))
                               }}
                        />
                        <div className={"text"}>{item.text}</div>
                        <div className="update-delete">
                            <span onClick={() => dispatch(updateText(item))}
                                  tooltip={"Update"}
                            >
                                <MdModeEdit/>
                            </span>
                            <span
                                tooltip={"Delete"}
                                onClick={() => {
                                    dispatch(deleteTodo(item.id))
                                }}
                            >
                                <MdDelete/>
                            </span>
                        </div>
                    </div>
                </CSSTransition>
            ))}
        </TransitionGroup>
        <div className="todo-footer">
            <div>
                <span>
                    {filteredByTabs.filter((i) => i.completed === true).length}
                </span>
                <span>/</span>
                <span>
                    {filteredByTabs.length}
                </span>
                <span className="gap">
                    completed/tasks
                </span>
            </div>
            <button
                onClick={() => {
                    dispatch(clearCompleted())
                    dispatch(setActiveTab(activeTab))
                }}
                disabled={!filteredByTabs.filter((i) => i.completed === true).length}
            >
                Clear completed
            </button>
        </div>
    </div>
    );
}

export default App;
