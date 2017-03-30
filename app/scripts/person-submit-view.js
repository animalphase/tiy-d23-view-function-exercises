/*jshint esversion: 6 */

import submitData from './ajax.js';

export default function PersonSubmitView() {
  let $personViewContent =
     $(`<section class="person-submission">
          <h1>Person Form</h1>
          <form class="form-person">
            <input class="first-name" type="text" name="" value="" placeholder="enter first name…">
            <input class="last-name" type="text" name="" value="" placeholder="enter last name…">
            <input class="phone-number" type="text" name="" value="" placeholder="enter phone number…">
            <button class="submit-person" type="submit" name="button">Submit Person</button>
          </form>
        </section>`);

  const assemblePersonData = () => {
    let newPerson = {
      firstname: $personViewContent.find('.first-name').val(),
      lastname: $personViewContent.find('.last-name').val(),
      phonenumber: $personViewContent.find('.phone-number').val()
    };
    console.log('assembled', newPerson);
    return newPerson;
  };

  const confirmSubmission = (data) => {
    console.log('✅ person input submission successful! 💁🏻');
    displayNewPerson(data);
  };

  const displayNewPerson = (data) => {
    $personViewContent.html(`<h3>Hello, ${data.firstname} ${data.lastname}</h3>`);
  };

  $personViewContent.find('.submit-person').on('click', (e) => {
    e.preventDefault();
    e.target.disabled = true;
    submitData(assemblePersonData(), 'people', confirmSubmission);
    $personViewContent.find('.first-name').val('');
    $personViewContent.find('.last-name').val('');
    $personViewContent.find('.phone-number').val('');
  });

  return $personViewContent;
}
