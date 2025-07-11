export const initialStore = () => {
  return {
    characters: [],
    vehicles: [],
    planets: [],
    favorites: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'load_characters':
      return {
        ...store,
        characters: action.payload,
      };

    case 'load_vehicles':
      return {
        ...store,
        vehicles: action.payload,
      };

    case 'load_planets':
      return {
        ...store,
        planets: action.payload,
      };

    case 'add_favorite':
      // Añade un favorito si no está ya en la lista
      if (store.favorites.find(fav => fav.id === action.payload.id && fav.type === action.payload.type)) {
        return store;
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload],
      };
      
    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.id === action.payload.id && fav.type === action.payload.type)
        ),
      };


    default:
      throw Error('Unknown action.');
  }
}
