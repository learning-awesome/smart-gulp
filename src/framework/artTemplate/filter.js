(function(){
  template.helper('$formatDate', function (value,format) {
    return formatDate(new Date(value),format);
  });
})();
