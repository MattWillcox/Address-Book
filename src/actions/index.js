export function contactsHasErrored(bool) {
  return {
      type: 'CONTACTS_HAS_ERRORED',
      hasErrored: bool
  };
}
export function contactsIsLoading(bool) {
  return {
      type: 'CONTACTS_IS_LOADING',
      isLoading: bool
  };
}
export function contactsFetchDataSuccess(contacts) {
  return {
      type: 'CONTACTS_FETCH_DATA_SUCCESS',
      contacts
  };
}

export function contactsFetchData(url) {
  return (dispatch) => {
      dispatch(contactsIsLoading(true));
      fetch(url)
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }
              dispatch(contactsIsLoading(false));
              return response;
          })
          .then((response) => response.json())
          .then((contacts) => dispatch(contactsFetchDataSuccess(contacts)))
          .catch(() => dispatch(contactsHasErrored(true)));
  };
}