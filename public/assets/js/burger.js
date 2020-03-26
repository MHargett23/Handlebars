$(".devour").click(function() {
  console.log($(this).val());
  $.ajax({
    url: "/api/burger/" + $(this).val(),
    method: "PUT"
  }).then(results => {
    if (results === "OK") location.reload();
  });
});
$("#burgerform").on("submit", function(event) {
  event.preventDefault();
  const burgerName = $("#addburger").val();
  console.log(burgerName);

$.post("/api/burger",{burgerName:burgerName}).then(results=>{
   if(results === "OK"){
       location.reload()
   }
})
});


