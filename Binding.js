$(function(){
  reqajex();
  $("#recipes").on("click",".btn-danger",handledel);
  $("#btn").click(addproduct);
  $("#recipes").on("click",".btn-warning",handleedit);
  
  $("#save").click(function(){
      var name=$("#Name").val();
      var price=$("#Price").val();
      var color=$("#Color1").val();
      var department=$("#Department").val();
      var description=$("#Description").val();
$.ajax({
  url:"https://usman-recipes.herokuapp.com/api/products",
  method:"POST",
  data:{name,price,color,department,description},
  success:function (result){
      console.log(result);
  reqajex();
  $("#addmodel").modal("hide");
  },
});
  });


  $("#UpdatedSave").click(function() {
      var id = $("#updateId").val();
      var name =  $("#UpdateName").val();
      var price = $("#UpdatePrice").val();
      var color= $("#Updatecolor").val();
      var department=$("#UpdateDepartment1").val();
      var description=$("#UpdateDescription").val();
      $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/" + id,
        data: { name, price,color,department,description },
        method: "PUT",
        success: function() {
          
          reqajex();
          $("#updatemodle").modal("hide");
        }
      });
    });
  });
  

  
  
     
  
  
  
  
  function handleedit(){
      var btn=$(this);
      var parent=btn.closest(".product");
      let id=parent.attr("data-id");
      $.get("https://usman-recipes.herokuapp.com/api/products/"+id,function(result){
  
          $("#updateId").val(result._id);
          $("#UpdateName").val(result.name);
          $("#UpdatePrice").val(result.price);
          $("#Updatecolor").val(result.color);
          $("#UpdateDepartment1").val(result.department);
          $("#UpdateDescription").val(result.description);
          $("#updatemodle").modal("show");
  });
  }
  
  function addproduct(){
  $("#addmodel").modal("show");
  
  }
  
  function handledel()
  {
      var btn=$(this);
      var parent=btn.closest(".product");
      let id=parent.attr("data-id");
      console.log(id);
  
      $.ajax({
  
          url:"https://usman-recipes.herokuapp.com/api/products/"+id,
          method:"DELETE",
          success:function(){
              reqajex();
          },
  
      });
  
  
  
  }
  
  function reqajex()
  {
  $.ajax({
      url:"https://usman-recipes.herokuapp.com/api/products",
      method:"GET",
      success:function(result){
        var req= $("#recipes");
        console.log(result);
  
       req.empty();
        for(var i=0;i<result.length;i++){
           var rec=result[i];
            req.append(`
            <div class="product" data-id="${rec._id}">
             <u><h4>Name:</h4></u><p>${rec.name}</p>
             <u><h4>Price:</h4></u><p>${rec.price}<p>
             <u><h4>Color:</h4></u><p>${rec.color}<p>
             <u><h4>Department:</h4></u><p>${rec.department}</p>
             <u><h4>Description:</h4></u><p><button class="btn btn-danger btn-sm float-right"> Delete</button> <button class="btn btn-warning btn-sm float-right"> Edit</button>
              ${rec.description}</p>
            </div>`);
  
            
            
           
  
        }
      },
      
  
  });
  }