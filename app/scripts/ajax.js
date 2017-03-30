/*jshint esversion: 6 */

export default function submitData (data, serverList, callback) {
  let urls = {
    blog: 'http://tiny-za-server.herokuapp.com/collections/ce-d23-blog/',
    people: 'http://tiny-za-server.herokuapp.com/collections/ce-d23-people/'
  };

  let postSettings = {
    type: 'POST',
    contentType: 'application/json',
    url: urls[serverList],
    data: JSON.stringify(data)
  };
  $.ajax(postSettings).then( (data, status, xhr) => {
    callback(data, status, xhr);
  });
}
