$(document).ready(function () {
  $('.amenities UL LI INPUT').css('margin-right', '10px');
  let idDict = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      idDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete idDict[$(this).attr('data-id')];
    }
    let alist = [];
    for (let k in idDict) {
      alist.push(idDict[k]);
    }
    $('.amenities h4').text(alist.join(', '));
  });
});
