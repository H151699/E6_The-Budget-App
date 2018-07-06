
// MODULES

/* Important aspect of any robust application's architecture;
   keep the units of code for project both cleanly separated and organized;
   Encapsulate some data into privacy and expose other data publicly.
*/

// budgetController
var budgetController = (function(){



})();

// UI controller
var UIController = (function(){

  // todo

})();



// GLOBAL APP CONTROLLER
// here we pass the other two modules as arguments to th controller
var controller = (function(budgetCtrl, UICtrl){

// Avoid DRY dont repeat yourself : solution
var ctrlAddIterm = function(){
  // console.log('button clicked'); // test button

  // 1. Get the field  input data


  // 2. Add the item to the budget CONTROLLER


  // 3. add the item to the UI


  // 4. Caculate the budget


  // 5. Didpay the budget on the UI

console.log(' it works yea');

}


  document.querySelector('.add__btn').addEventListener('click', ctrlAddIterm);



    // KEYborad press event // keypress: press any key
  document.addEventListener('keypress', function(e){

    // keycode == enter \   old broswer
    if(e.keyCode === 13 || e.which === 13){

      // when press the enter key
      ctrlAddIterm();


    } //if

  });


})(budgetController, UIController);  // // GLOBAL APP CONTROLLER














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
