export function toggleEdit(state = { edit: false }, action) {
  switch (action.type) {
    case 'TOGGLE_EDIT':
      return { edit: !state.edit };
    default:
      return state;
  }
}