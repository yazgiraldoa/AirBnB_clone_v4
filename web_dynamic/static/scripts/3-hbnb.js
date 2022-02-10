$(function () {
  const listChecked = {};

  $('.amenities ul li input').on('change', function () {
    if ($(this).is(':checked')) {
      listChecked[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete listChecked[$(this).attr('data-id')];
    }
    const list = Object.values(listChecked);
    if (list.length > 0) {
      $('.amenities h4').text(list.join(', '));
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, statusText, xhr) {
    if (xhr.status === 200) {
      $('div#api_status').toggleClass('available default');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data, textStatus, jQxhr) {
      for (const value of data) {
        $.get('http://0.0.0.0:5001/api/v1/users/' + value.user_id, function (user) {
          $('section.places').append('<article> <div class="title_box"> <h2>' + value.name + '</h2>' +
                                     '<div class="price_by_night">' + value.price_by_night + '</div> </div>' +
                                     '<div class="information"> <div class="max_guest">' + value.max_guest + ' Guests </div>' +
                                     '<div class="number_rooms">' + value.number_rooms + ' Bedrooms </div>' +
                                     '<div class="number_bathrooms">' + value.number_bathrooms + ' Bathrooms </div> </div>' +
                                     '<div class="user"> <b>Owner:</b> ' + user.first_name + ' ' + user.last_name +
                                     '</div> <div class="description">' + value.description + '</div> </article>');
        });
      }
    }
  });
});
