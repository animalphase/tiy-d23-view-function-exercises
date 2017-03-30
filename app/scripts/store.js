/*jshint esversion: 6 */

// Our store keeps track of our app's state
//  and a list of subscribers to update whenenver an event is fired.
export default function Store(startingState) {
  let targetFunctions = [];
  let state = startingState;

  this.getState = function () {
    return state;
  };

  // fire() receives an event string, and a data object.
  // it outputs the current state, the passed event string, and the passed data object
  this.fire = function(event, data) {
    targetFunctions.forEach(function (targetFunction){
      //Update the app's state to whatever the update function returns.
      var newState = targetFunction(state, event, data);
      if (newState !== undefined && newState !== null) {
        state = newState;
      }
    });
  };

  this.add = function (newTargetFunction) {
    targetFunctions.push(newTargetFunction);
  };
}
