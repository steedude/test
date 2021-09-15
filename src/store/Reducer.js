const ADD_TODOLIST = "ADD_TODOLIST";
const DELETE_TODOLIST = "DELETE_TODOLIST";
const REVISE_TODOLIST = "REVISE_TODOLIST";
const REVISEDONE_TODOLIST = "REVISEDONE_TODOLIST";
const ADD_DONELIST = "ADD_DONELIST";
const REVISE_ISRUNNING = "REVISE_ISRUNNING";

const initState = {
  todoList: ["1", "2"],
  doneList: [],
  isRunning: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODOLIST: {
      const arrTodo = [...state.todoList];
      arrTodo.push({ title: action.payload.title, isEdit: false });
      return {
        ...state,
        todoList: arrTodo,
      };
    }
    case DELETE_TODOLIST: {
      const arrTodo = [...state.todoList];
      arrTodo.splice(action.payload.index, 1);
      return {
        ...state,
        todoList: arrTodo,
      };
    }

    case REVISE_TODOLIST: {
      const arrTodo = [...state.todoList];
      arrTodo.forEach((ele, i) => {
        arrTodo[i].isEdit = false;
      });
      arrTodo[action.payload.index].isEdit = true;
      return {
        ...state,
        todoList: arrTodo,
      };
    }

    case REVISEDONE_TODOLIST: {
      const arrTodo = [...state.todoList];
      arrTodo[action.payload.index].title = action.payload.name;
      arrTodo[action.payload.index].isEdit = false;
      return {
        ...state,
        todoList: arrTodo,
      };
    }

    case ADD_DONELIST: {
      const arrDone = [...state.doneList];
      arrDone.push(state.todoList[0].title);
      return {
        ...state,
        doneList: arrDone,
      };
    }

    case REVISE_ISRUNNING: {
      const boolean = action.payload.boolean;
      return {
        ...state,
        isRunning: boolean,
      };
    }
    default:
      return state;
  }
};

export default reducer;
