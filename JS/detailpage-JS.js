// builts country detail table
function buildDetailTable(response){
	var table = document.getElementById("detailtable");
	// to iterate every key in a response object
	Object.keys(response).forEach(function (key){
		var row = table.insertRow(-1);		
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = key;
		if(typeof response[key] == "string"){
			if(key=="flag"){
				cell2.innerHTML = '<img class="gty" src="'+ response[key] +'" width="82" height="42">';
			}
			else{
				cell2.innerHTML = response[key];
			}
		}
		else{
			
			cell2.innerHTML = JSON.stringify(response[key]);
		}

	});
}

// called while rendering and reloading page for constracting details table
function trigger(){
      // extract URL params from request URL of this page
      var urlParams = new URLSearchParams(window.location.search);
      if(urlParams.has('country_name')){
    	var response = JSON.parse(sessionStorage.search_result);
    	var country_name = urlParams.get('country_name');
    	document.getElementById('header1').innerHTML = country_name;
    	for(var i in response){
    		if(response[i].name == country_name){
    			buildDetailTable(response[i]);
    			return;
    		}
    	}
    	console.error("Wrong Argument Value is passed!");
    	alert("Wrong Argument Value is passed!");
      }
      else{
        console.error("Missing Required Argument");
    	   alert("Missing Required Argument");
      }
}