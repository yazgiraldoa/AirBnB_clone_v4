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

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'get'
  }).done(function (data, statusText, xhr) {
    const status = xhr.status;
    console.log(status);
  });
});
