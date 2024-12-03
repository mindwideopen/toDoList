import {TasksStateType} from "../App";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "./tasks-reducer";

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

    test('should add a new task to the correct todolist', () => {
        const action = addTaskAC('todolist1', 'New Task');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolist1'].length).toBe(3);
        expect(newState['todolist1'][0].title).toBe('New Task');
        expect(newState['todolist1'][0].isDone).toBe(false);
    });

    test('should remove a task from the correct todolist', () => {
        const action = removeTaskAC('todolist1', '1');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolist1'].length).toBe(1);
        expect(newState['todolist1'][0].id).toBe('2'); // Remaining task should be 'Task 2'
    });

    test('should update the title of the specified task', () => {
        const action = updateTaskAC('todolist1', '1', 'Updated Task 1');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolist1'][0].title).toBe('Updated Task 1'); // Проверяем, что заголовок обновлен
        expect(newState['todolist1'][1].title).toBe('Task 2'); // Проверяем, что остальные задачи не изменились
        expect(newState['todolist1'][0].isDone).toBe(false); // Проверяем, что isDone не изменился
        expect(newState['todolist1'][1].isDone).toBe(false); // Проверяем, что isDone не изменился
    });

    

    test('should not update task if taskID does not exist', () => {
        const action = updateTaskAC('todolist1', 'non-existent-id', 'New Title');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolist1'][0].title).toBe('Task 1'); // Проверяем, что первая задача не изменилась
        expect(newState['todolist1'][1].title).toBe('Task 2'); // Проверяем, что вторая задача не изменилась
        expect(newState['todolist1'][0].isDone).toBe(false); // Проверяем, что isDone не изменился
        expect(newState['todolist1'][1].isDone).toBe(false); // Проверяем, что isDone не изменился
    });
});