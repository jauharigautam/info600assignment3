document.addEventListener('DOMContentLoaded', loadData)
  function loadData(){
    //myDate
    var myDate = new Date();
    // Get the button loadRec
    document.getElementById('loadRec').addEventListener('click', function(){
      document.getElementById('View').innerHTML = " ",
      $.getJSON("/users", function(data){
        $(data.records).each(function(key, result){
         $("#View").append('<li>'+ myDate.getHours().toString().padStart(2, '0')+':'+ myDate.getMinutes().toString().padStart(2, '0') +'-' +result.fullName+ ','+ result.major + ', ' + result.startYear+'<button value='+result.id+' id="DeleteRec">Delete</button>'+'</li>' ); 
        });// end of each 
      });// end getJSON
    }); // end of loodRec
  }// end of loadData()

document.addEventListener('DOMContentLoaded', assignClickHandler)
  function assignClickHandler () {
    document.getElementById('addRec').addEventListener('click', function () {
      const startYear = document.getElementById('startYear').value
      if (startYear < 2000) {
        window.alert('Incorrect year: ' + startYear)
        return
      }
      
      // configuration and formating of time 
      const date = new Date()
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const time = hours + ':' + minutes

      // the record to be added to the json file
      var record ={
        fullName: document.getElementById('fullName').value,
        major: document.getElementById('major').value,
        startYear: document.getElementById('startYear').value,
      }; 
      // ajax method
      $.ajax({
        method: 'POST',
        url: '/user/',
        data: record,
        success: function(newEntry){
          $(record.newEntry).append("<li> time: "+time+" id: "+newEntry.id +", fullName :"+newEntry.fullName+ ","+ "major: "+ newEntry.major+ ", startYear: "+newEntry.startYear+"</li>");
        }

      });
      // clear the data after adding the record
      document.getElementById('inputs').reset();
    });// end the addRec button click function
  }// End of assignClickHandler
  
// This function deletes the record selected by the user using user id
$(document).on("click","#DeleteRec",function(){
  const id= $(this).val();  
    console.log(id);
        $.ajax({

          method: 'DELETE',
          url: '/user/'+id,
          
        }) // the ajax DELETE request
        .done(reloadData) // call the reloadData method
  
    });// END THE end the document 

// This function has the same functionalities as 4A and its called for data to be reloaded.
function reloadData(){
  var myDate = new Date();
  document.getElementById('View').innerHTML = " ",
      $.getJSON("/users", function(data){
        $(data.records).each(function(key, result){
         $("#View").append('<li>'+ myDate.getHours().toString().padStart(2, '0')+':'+ myDate.getMinutes().toString().padStart(2, '0')+ '-' +result.fullName+ ','+ result.major + ', ' + result.startYear+'<button value='+result.id+' id="DeleteRec">Delete</button>'+'</li>' ); 
        });// end of each 
      });// end getJSON

}// reloadData
