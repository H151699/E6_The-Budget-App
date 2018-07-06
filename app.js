
// MODULES
/* Important aspect of any robust application's architecture;
   keep the units of code for project both cleanly separated and organized;
   Encapsulate some data into privacy and expose other data publicly.
*/

 /*********************************** budgetController *********************/
var budgetController = (function(){



})();



/*********************************** UI controller***********************
* A public funciton to be used in another fucntion
*
*/
var UIController = (function(){

  // make cleaner
  var DOMstrings = {
    inputType:'.add__type',
    inputDescription:'.add__description',
    inputValue:'.add__value',
    inputBtn:'.add__btn'
  };



  return{
    getinput: function(){

      return{

        type: document.querySelector(DOMstrings.inputType).value,// will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value

      };

      /*
      // read the input
      var type = document.querySelector('.add__type').value;// will be either inc or exp
      var description = document.querySelector('.add__description').value;
      var value = document.querySelector('.add__value').value;
      */

    }, //  getinput

    /*exposing the DOMstrings object into the public*/
    getDOMstrings:function(){
      return DOMstrings;
    }

  }; // UIController


})();


/*********************************** GLOBAL APP CONTROLLER ***************/
// here we pass the other two modules as arguments to th controller
var controller = (function(budgetCtrl, UICtrl){

var setupEventListeners = function(){

  var DOM = UICtrl.getDOMstrings();
  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddIterm);
  // KEYborad press event // keypress: press any key
  document.addEventListener('keypress', function(e){
      // keycode == enter \   old broswer
      if(e.keyCode === 13 || e.which === 13){
        // when press the enter key
        ctrlAddIterm();
      } //if

    });

};



/* Create  a public iniitalization function*/





var ctrlAddIterm = function(){  // Avoid DRY dont repeat yourself : solution
  // console.log('button clicked'); // test button

  // 1. Get the field  input data
  var input = UICtrl.getinput();
  console.log(input);

  // 2. Add the item to the budget CONTROLLER


  // 3. add the item to the UI


  // 4. Caculate the budget


  // 5. Didpay the budget on the UI



};

return{
  init: function(){
    console.log('App has started');
    setupEventListeners();
  }
}


})(budgetController, UIController);  // // GLOBAL APP CONTROLLER


controller.init();












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
