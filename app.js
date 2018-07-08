
// MODULES
/* Important aspect of any robust application's architecture;
   keep the units of code for project both cleanly separated and organized;
   Encapsulate some data into privacy and expose other data publicly.
*/

 /***** BUDGET CONTROLLER ******************************************************
 ******************************************************************************/
var budgetController = (function(){

   // Expense funciton constructor
   var Expense = function(id, description, value) {
       this.id = id;
       this.description = description;
       this.value = value;
  };

  // Income funciton constructor
  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };


  // store in array
  var data = {
      allItems: {
          exp: [],
          inc: []
      },
      totals: {
          exp: 0,
          inc: 0
      }
  };

// allow other modules to add a new item into data structure
return {
    addItem: function(type, des, val) {
        var newItem, ID;

        //[1 2 3 4 5], next ID = 6
        //[1 2 4 6 8], next ID = 9
        // ID = last ID + 1

        // Create new ID

        if (data.allItems[type].length > 0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }


        // Create new item based on 'inc' or 'exp' type
        if (type === 'exp') {
            newItem = new Expense(ID, des, val);
        } else if (type === 'inc') {
            newItem = new Income(ID, des, val);
        }

        // Push it into our data structure
        data.allItems[type].push(newItem);

        // Return the new element
        return newItem;
    }, // addItem func

  testing: function(){
    console.log(data);
  }
}; // return fun



})(); // budgetController



/******* UI CONTROLLER ********************************************************
 ******************************************************************************/
/* A public funciton to be used in another fucntion
*
*/
var UIController = (function(){

  // make cleaner
  var DOMstrings = {
    inputType:'.add__type',
    inputDescription:'.add__description',
    inputValue:'.add__value',
    inputBtn:'.add__btn',
    incomeContainer:'.income__list',
    expensesContainer:'.expenses__list',
  };



  return{
    getInput: function(){

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


  addListItem: function(obj, type){
      var html, newHtml,element;
      // create HTML string with placeholder text
  if(type === 'inc'){
    element = DOMstrings.incomeContainer;
    html =  '<div class="item clearfix" id="income-%id%"><div class="item__description"> %description%</div> <div class="right clearfix">  <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"> </i></button> </div> </div></div>';
  } else if (type === 'exp'){
    element = DOMstrings.expensesContainer;
    html = '<div class="item clearfix" id="expense--%id%"> <div class="item__description"> %description%</div> <div class="right clearfix"> <div class="item__value">%value%</div><div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> ';
  }
      // replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

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
  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
  // KEYborad press event // keypress: press any key
  document.addEventListener('keypress', function(e){
      // keycode == enter \   old broswer
      if(e.keyCode === 13 || e.which === 13){
        // when press the enter key
        ctrlAddItem();
      } //if

    });

};



/* Create  a public iniitalization function*/



var ctrlAddItem = function(){  // Avoid DRY dont repeat yourself : solution
  // console.log('button clicked'); // test button

  // 1. Get the field  input data
  var input = UICtrl.getInput();


  // 2. Add the item to the budget CONTROLLER
  var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

  // 3. add the item to the UI
  UICtrl.addListItem(newItem, input.type);

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
