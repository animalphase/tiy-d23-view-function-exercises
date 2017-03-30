/*jshint esversion: 6 */

import Store from './store.js';
import BlogView from './blog-view.js';
import PersonSubmitView from './person-submit-view.js';
import BlogReaderView from './blog-reader-view.js';

export default function app() {


  let initialState = {
    view: '' //null view, selection made on event call
  };

  const store = new Store(initialState);
  console.log(store.getState()); // the state is an object, holding constructor references

  const update = function (state, event, data) {
    console.log(`Update was called because the '${event}' event was fired.`);
    if (state === undefined || event === undefined) {
      console.debug("Error: Something is undefined");
      console.debug(`State: ${state} | Event: '${event}'`);
      return;
    } else {
      // Your update code goes below here

      switch (event) {

        case 'goToBlogSubmission':
          state.view = BlogView;
          store.fire('renderToScreen');
          return state;

        case 'goToPersonSubmit':
          state.view = PersonSubmitView;
          store.fire('renderToScreen');
          return state;

        case 'goToBlogReader':
          state.view = BlogReaderView;
          store.fire('renderToScreen');
          return state;

        default:
          console.debug(`Unhandled Event in update(): ${event}'`);
          return;

      }
    }
  };

  const render = function (state, event, data) {
    if(event === 'renderToScreen'){
      console.log(`render() rendering to screen: ${state.view.name}`);
      $('#app').html(new state.view());
    }
  };

  // Every time an event is fired the update function will run
  //  and *then* the render function will run after that.
  store.add(update);
  store.add(render);

  // store.fire('goToBlogReader'); 

  $('.submit-blog-link').on('click', () => { store.fire('goToBlogSubmission'); } );
  $('.add-person-link').on('click', () => { store.fire('goToPersonSubmit'); } );
  $('.blog-reader-link').on('click', () => { store.fire('goToBlogReader'); } );



}
