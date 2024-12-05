import {ThemeMode} from "../App";

export const modeReducer = (state:ThemeMode, action: ActionType):ThemeMode => {
    switch(action.type) {
        case "CHANGE-MODE":{
            return (action.mode === "light" ? "dark" : 'light')
        }
    }
}





type ActionType = changeModeACType


type  changeModeACType = ReturnType<typeof changeModeAC>

export const changeModeAC = (currentMode:ThemeMode) => {
    return {
        type: 'CHANGE-MODE',
        mode: currentMode ,
    } as const
}