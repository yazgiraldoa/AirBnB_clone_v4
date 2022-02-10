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
});
