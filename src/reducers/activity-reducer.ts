import type { Activity } from "../types";

// Reducer para manejar las acciones de las actividades
export type ActivityActions = 
  { type: "save-activity", payload: { newActivity: Activity } } | 
  { type: "set-activeId", payload: { id: Activity['id'] } } |
  { type: "delete-activity", payload: { id: Activity['id'] } } |
  { type: "restart-app" }

// Tipo para el estado de las actividades
export type ActivityState = {
  activities: Activity[],
  activeId: Activity['id']
};

// Esta función se encarga de obtener las actividades almacenadas en el localStorage. 
// Si no hay actividades almacenadas, devuelve un array vacío.
const localStorageActivities = () : Activity[] => {
  const activities = localStorage.getItem('activities');
  return activities ? JSON.parse(activities) : [];
}

// Estado inicial del reducer
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: ''
};

// Función reductora para manejar las acciones relacionadas con las actividades
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions,
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];
    // Si hay un activeId, significa que estamos editando una actividad existente, por lo que actualizamos la lista de actividades 
    // reemplazando la actividad con el mismo ID por la nueva actividad enviada en la acción. Si no hay un activeId, significa que 
    // estamos agregando una nueva actividad, por lo que simplemente agregamos la nueva actividad a la lista de actividades existente.
    if(state.activeId) {
      updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity);
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity]
    }
    return {
      ...state,
      activities: updatedActivities,
      activeId: ''
    }
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id
    }
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== action.payload.id)
    }
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: ''
    }
  }

  return state;
};
