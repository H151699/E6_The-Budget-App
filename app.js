
// MODULES

/* Important aspect of any robust application's architecture;
   keep the units of code for project both cleanly separated and organized;
   Encapsulate some data into privacy and expose other data publicly.
*/
var budgetController = (function(){
    var x = 23;
    var add = function(a){
      return x + a;
    }

    return {
      publicTest: function(b){
        return add(b);
      }
    }
})();



var UIController = (function(){

  // todo

})();




// here we pass the other two modules as arguments to th controller
var controller = (function(budgetCtrl, UICtrl){

  var z = budgetCtrl.publicTest();
  return{
    anotherPublic: function(){
      console.log(z);
    }
  }

})(budgetController, UIController);












//
//
//
// var budgetController = (function(){
//   var x = 23;
//
//   var add = function(a){
//     return x + a;
//   }
//
//   return{
//
//       publicTest: function(b){
//         console.log(add(b));;
//       }
//   }
// })();
