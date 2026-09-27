import { useEffect, useState, type Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer";

// Tipado para los props del componente Form, que incluye la función dispatch para enviar acciones al reducer
type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0,
}

export default function Form({dispatch, state}: FormProps) {

  // useState para manejar el estado del formulario, con un objeto que representa la actividad inicial
  const [activity, setActivity] = useState<Activity>(initialState);

  // useEffect para actualizar el estado del formulario cuando se selecciona una actividad para editar
  useEffect(() => {
    if(state.activeId) {
      // Filtra la actividad seleccionada del estado global usando el activeId y actualiza el estado local del formulario con esa actividad
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId])

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    // Devuelve true si el campo es category o calories, que son los campos que deben ser convertidos a número
    const isNumberField = ['category', 'calories'].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  // Función que valida que el campo de actividad y calorías no este vacio
  const isValidActivity = () => {
    const {name, calories} = activity;
    return name.trim() !== '' && calories > 0;
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({type: "save-activity", payload: {newActivity: activity}});
    // Reinicia el formulario a su estado inicial después de enviar la actividad
    setActivity({
      ...initialState,
      id: uuidv4(), // Genera un nuevo ID para la próxima actividad
    });
  }

  return (
    <form 
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select 
          id="category" 
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
