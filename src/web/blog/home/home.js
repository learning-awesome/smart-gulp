(function () {

  var params={page:{pageIndex:1, pageSize:10}};
  xhr.post(params, function (response) {
    View.renderObject(response.data);
  });

})();