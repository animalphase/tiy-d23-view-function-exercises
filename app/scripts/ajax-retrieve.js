/*jshint esversion: 6 */

export default function getData (serverList, callback) {
  let urls = {
    blog: 'http://tiny-za-server.herokuapp.com/collections/ce-d23-blog/',
    people: 'http://tiny-za-server.herokuapp.com/collections/ce-d23-people/'
  };

  let getSettings = {
    type: 'GET',
    dataType: 'json',
    url: urls[serverList]
  };

  $.ajax(getSettings).then( (data, status, xhr) => {
    callback(data, status, xhr);
  });
}
