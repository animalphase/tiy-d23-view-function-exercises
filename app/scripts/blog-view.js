/*jshint esversion: 6 */

import submitData from './ajax.js';

export default function BlogView() {
  let $blogViewContent =
     $(`<section class="blog-authoring">
          <h1>Blog form</h1>
          <form class="form-blog">
            <input class="blog-title" type="text" name="" value="" placeholder="enter blog title…">
            <textarea class="blog-body" name="name" rows="8" cols="60" placeholder="enter blog body…"></textarea>
            <button class="submit-blog" type="submit" name="button">Submit Blog Post</button>
          </form>
        </section>`);

  const assembleBlogData = () => {
    let newBlogPost = {
      title: $blogViewContent.find('.blog-title').val(),
      body: $blogViewContent.find('.blog-body').val()
    };
    console.log('assembled', newBlogPost);
    return newBlogPost;
  };

  const confirmBlogPostSubmission = () => {
    console.log('✅ blog post submission successful! 👍🏻');
  };

  const welcomeMessage = (name) => {

  };

  $blogViewContent.find('.submit-blog').on('click', (e) => {
    e.preventDefault();
    e.target.disabled = true;
    submitData(assembleBlogData(), 'blog', confirmBlogPostSubmission);
    $blogViewContent.find('.blog-title').val('');
    $blogViewContent.find('.blog-body').val('');
  });

  return $blogViewContent;
}
