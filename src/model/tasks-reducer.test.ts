import {TasksStateType} from "../App";
import {removeTaskAC, tasksReducer} from "./tasks-reducer";

// test('task should be removed', () => {
//
//     const startState: TasksStateType = {
//         'todolistId1': [
//             { id: '1', title: 'CSS', isDone: false },
//             { id: '2', title: 'JS', isDone: true },
//             { id: '3', title: 'React', isDone: false },
//         ],
//         'todolistId2': [
//             { id: '1', title: 'bread', isDone: false },
//             { id: '2', title: 'milk', isDone: true },
//             { id: '3', title: 'tea', isDone: false },
//         ],
//     }
//
//
//
//
//     const endState = tasksReducer(startState, removeTaskAC('todolistId1', '1'))
//
//
//
//
// })

describe('tasksReducer', () => {
    let initialState: TasksStateType;

    beforeEach(() => {
        initialState = {
            'todolist1': [
                { id: '1', title: 'Task 1', isDone: false },
                { id: '2', title: 'Task 2', isDone: false },
            ],
            'todolist2': [
                { id: '3', title: 'Task 3', isDone: false },
            ],
        };
    });

    test('should remove task from the correct todolist', () => {
        const action = removeTaskAC('todolist1', '1');
        const newState = tasksReducer(initialState, action);

        expect(newState).toEqual({
            'todolist1': [
                { id: '2', title: 'Task 2', isDone: false },
            ],
            'todolist2': [
                { id: '3', title: 'Task 3', isDone: false },
            ]
        });
    });

    test('should not affect other todolists when removing a task', () => {
        const action = removeTaskAC('todolist1', '1');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolist2']).toEqual([
            { id: '3', title: 'Task 3', isDone: false },
        ]);
    });

    test('should not change state if task ID does not exist', () => {
        const action = removeTaskAC('todolist1', '999');
        const newState = tasksReducer(initialState, action);

        expect(newState).toEqual(initialState);
    });

    test('should not change state if todolist ID does not exist', () => {
        const action = removeTaskAC('unknownTodolist', '1');
        const newState = tasksReducer(initialState, action);

        expect(newState).toEqual(initialState);
    });
});