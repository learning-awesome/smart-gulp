(function(){
  template.helper('$formatDate', function (value,format) {
    console.log('-----------');
    return formatDate(new Date(value),format);
  });
})();
