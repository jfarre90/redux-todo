const initialState = {
  todos: [],
  id: 0
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      var newState = { ...state };
      newState.id++;
      return {
        ...newState,
        todos: [...newState.todos, { task: action.task, id: newState.id }]
      };
    case 'REMOVE_TODO':
      let todos = state.todos.filter(val => val.id !== +action.id); //The + icon converts it to a number!
      return { ...state, todos };
    default:
      return state;
  }
}

const store = Redux.createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //part of the chrom extension react devTool
);

$(document).ready(function() {
  $('ul').on('click', 'button', function(event) { //jQuery syntax, to select any button created in the page
    store.dispatch({
      type: 'REMOVE_TODO',
      id: $(event.target).attr('id')
    });
    $(event.target)
      .parent()
      .remove();
  });

  $('form').on('submit', function(event) {
    event.preventDefault(); //THIS IS TO AVOID THE PAGE REFRESHING
    let newTask = $('#task').val();
    store.dispatch({
      type: 'ADD_TODO',
      task: newTask
    });
    
    let currentState = store.getState();
    let $newLi = $('<li>', {
      text: newTask
    });
    let $newButton = $('<button>', {
      text: 'X',
      id: currentState.id
    });
    $newLi.append($newButton);
    $('#todos').append($newLi);
    $('form').trigger('reset');
  });
});
