// Dynamically create the table 
function createTable(response){
    var table = document.getElementById("mytable");
    var header = document.getElementById("tableHeader");
    header.innerHTML = "<th>Country Name</th><th>National Flag</th>";
    for (var i in response)
    {
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var name="<a href='detailspage.html?country_name="+response[i].name+"' id='"+response[i].name+"'>"+response[i].name+"</a>";
        var img='<img class="gty" src="'+ response[i].flag +'" width="82" height="42" alt="Country Flag" align="middle">';
        cell1.innerHTML = name;
        cell2.innerHTML = img;
    }
}

// Used for clear the row in table 
function clearRow(){
    var myTable = document.getElementById("mytable");
    var rowCount = myTable.rows.length;
    for (var x=rowCount-1; x>0; x--) {
        myTable.deleteRow(x);
    }
    var header = document.getElementById("tableHeader");
    header.innerHTML="";
}

//Used to check response and store session data
function ConstructTable(response){
    if(response.message !== undefined){
        console.error("Facing "+response.message+" error while processing you request!");
        alert("Facing "+response.message+" error while processing you request!");
        return;
    }
    sessionStorage.setItem("search_result",JSON.stringify(response)); //brower session stroage for save data and used for other pages
    createTable(response);
}

// handle error from fetch function
function handleError(error){
    console.error(error);
    //sessionStorage.removeItem("search_result");
    alert("We are facing some issue while performing your action. Please try again later");
}

// called while clicking Go to button
document.getElementById('btn').addEventListener('click', function() {
    clearRow();
    sessionStorage.removeItem("search_result");
    var input=document.getElementById('box').value;
    if(input)
    {
        fetch('https://restcountries.eu/rest/v2/name/'+input)
        .then(response => response.json())
        .then(data => {
         ConstructTable(data)
        })
        .catch(error => handleError(error))
        
    }
});

// called while pressing enter key inside text box
function keyHandler(event){
    if (event.keyCode == 13)
    {
        clearRow();
        sessionStorage.removeItem("search_result");
        var s=document.getElementById('box').value;
        if(s)
        {
            fetch('https://restcountries.eu/rest/v2/name/'+s)
            .then(response => response.json())
            .then(data => {
             ConstructTable(data)
            })
            .catch(error => handleError(error))   
        }
    }
}

// called while refresh or reload a page to restore the table
function restore_page(){
    if(sessionStorage.search_result !== undefined){
        var j_data = JSON.parse(sessionStorage.search_result);
        createTable(j_data);
    }
}