export const reducer = (state, action) => {
  console.log('action', action);
  switch (action.type) {
    case 'setUserId':
      return {
        userId: action.value,
      };

    default:
      return state;
  }
};

export const initialState = {
  userId: false,
};
