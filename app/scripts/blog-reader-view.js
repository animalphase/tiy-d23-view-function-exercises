/*jshint esversion: 6 */

import submitData from './ajax.js';
import getData from './ajax-retrieve.js';

export default function BlogReaderView() {
  let $blogViewContent =
     $(`<section class="blog-reader">
         <aside class="reader-nav">
           <ul class="blog-post-links"></ul>
         </aside>
         <article class="blog-article"></article>
       </section>`);



// first lets get in the list and store a reference to ID
// then we'll use that ID to look up the right post to put in main display

  let currentPost;
  let $blogNav = $blogViewContent.find('.blog-post-links');
  $blogViewContent.find('blog-post-title');
  $blogViewContent.find('blog-body');


  const displayNavLinks = (data) => {
    data.forEach( (blogPost, i, array) => {
      $blogNav.append(`<li><a href="#" data-post-id="${blogPost._id}">${blogPost.title}</a></li>`);
    });
    $blogNav.find('li a').on('click', (e) => {
      e.preventDefault();
      console.log(e.target.getAttribute('data-post-id'));
      currentPost = e.target.getAttribute('data-post-id');
      getData('blog', displayBlogPost);
    });
  };


  const confirmBlogLoad = (data) => {
    console.log('✅ blog database loaded 💁🏻');
    console.log(data);
    displayNavLinks(data);
  };

  const deleteBlogPost = (id, $articleContainer) => {
    console.log('❌ deleteing', id);
    let postUrl = 'http://tiny-za-server.herokuapp.com/collections/ce-d23-blog/' + id;
    let deleteSettings = {
      type: 'DELETE',
      url: postUrl
    };
    $.ajax(deleteSettings).then( () => {
      $articleContainer.html('');
    });
  };

  const displayBlogPost = (data, status, xhr) => {
    var chosenPost = data.filter( (post, i, array) => {
      return post._id === currentPost;
    });
    chosenPost = chosenPost[0];

    let $deleteButton = $('<button class="delete-post">delete this post</button>');
    let $articleContainer = $blogViewContent.find('.blog-article');
    $articleContainer.html(
      `<h2 class="blog-post-title">${chosenPost.title}</h2>
      <div class="blog-body">${chosenPost.body}</div>`
    )
      .attr('data-post-id', chosenPost._id)
      .append($deleteButton);

    $deleteButton.on('click', (e) => {
      e.preventDefault();
      e.target.disabled = true;
      deleteBlogPost(chosenPost._id, $articleContainer);
    });
  };

  getData('blog', confirmBlogLoad);


  return $blogViewContent;
}
