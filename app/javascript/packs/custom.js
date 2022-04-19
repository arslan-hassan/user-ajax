$( document ).ready(function() {
  $( ".validate-btn" ).click(validate_url);

  var arrUrls = [];
  setInterval(function ajaxcall(){
    ajaxCall();
  },15000);

  function validate_url(){
    var url, protocol, host, str, port, values;

    var str = document.getElementById("url").value
    document.getElementById("url").value = ''

    if(validURL(str)){
      console.log('Valid URL');

      if(!(str.startsWith("http") || str.startsWith("https") || str.startsWith("www"))){
        str = 'http://' + str ;
        host = new URL(str).host
      }else{

        values = getUrlInfo(str)
        protocol = values[0];
        host = values[1];
      }



      addToStorage(completeUrl(host, protocol))


    }else if(localhostValid(str)){
      console.log('Valid URL');

      values = getUrlInfo(str)
      protocol = values[0];
      host = values[1];
      addToStorage(completeUrl(host, protocol))


    }else{
      console.log('wrong format');

    }
  }
});





function getUrlInfo(str){
  var  url = new URL(str);
  var  protocol = url.protocol;
  var  host = url.host;
  var  port = url.port;
  return [protocol, host, port]
}

function localhostValid(str){

  return (/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/).test(str);
}

function addToStorage(url){
  var getUrls = localStorage.getItem("urls")
  console.log("Storage URLS " ,getUrls)
  arrUrls = JSON.parse(getUrls)
  console.log("Get URLS ",arrUrls)

  if(arrUrls == null){
    arrUrls = [];
  }

  if(arrUrls.includes(url)){
    console.log('Already Added!')
  }else{
    arrUrls.push(url)
    console.log('New URLS ' ,arrUrls)
    localStorage.setItem("urls", JSON.stringify(arrUrls))


    pop_list(arrUrls);

    console.log("Added")
    console.log('List Length')
    console.log(arrUrls.length)

  }
}

function pop_list(arr){
  arr = arr.reverse();
  var str = ''
  console.log("Before POP ", arr)
  console.log(arr.length)
  $("#urls-list").html("");
  for(var i = 0; i < arr.length ; i++){
    str = arr[i];
    console.log(i,str)
    document.querySelector('#urls-list').innerHTML = document.querySelector('#urls-list').innerHTML + str + '<br />';
  }
}

function completeUrl(host='', protocol='', port = ''){
  var url;
  if(protocol=="http:" || protocol=="https:"){
    url = protocol + "//" + host + port
  }else if(protocol == "www"){
    url = protocol + "." + host + port
  }else{
    url = protocol + host + port
  }
  return url;
}


function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function ajaxCall(){
  console.log('ajaxcalls', arrUrls)

  $.ajax ({
      url: "/site_urls/create_urls",
      method: "POST",
      dataType: 'json',
      delay: 250,
      data: {"urls": arrUrls},

      processResults: function (data, params) {
        return {
          results: data.data
        };
      },
      cache: true
    });
}
