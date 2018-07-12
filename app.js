
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


//
  var calculateTotal = function(type){
    var sum = 0;
    data.allItems[type].forEach(function(cur){
      sum = sum + cur.value;
    });

    data.totals[type] = sum;


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
      },

      budget:0,
      percentage:-1

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



    calculateBudget: function(){
      // calculate total income and expense
      calculateTotal('exp');
      calculateTotal('inc');

      // Calculate the budget: income - expenses__list
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spent
      if(data.totals.inc > 0){ // percentage value only be showed when budget > 0

        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else{
        data.percentage = -1;
      }

    },

    getBudget: function(){
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }

    },

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
    budgetLabel: '.budget__value',
    incomeLabel:'.budget__income--value',
    expensesLabel:'.budget__expenses--value',
    percentageLabel:'.budget__expenses--percentage'
  };



  return{
    getInput: function(){

      return{

        type: document.querySelector(DOMstrings.inputType).value,// will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // parseFloat: convert String to a floatin'nr

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
      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },


    // clear Fields
    clearFields: function(){
      var fields, fieldsArray;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', '
      + DOMstrings.inputValue);

      // convert list to array trick
      fieldsArray = Array.prototype.slice.call(fields);


      fieldsArray.forEach(function(current, index, array){
        current.value ="";

      });

      // set the mouse focus to the first
      fieldsArray[0].focus();

    },

    displayBudget: function(obj){
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
      document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
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


var updateBudget = function(){
  // 1. Caculate the budget
  budgetCtrl.calculateBudget();

  // 2.Return the budget
var budget = budgetCtrl.getBudget();

  // 3. Display the budget on UI
  UICtrl.displayBudget(budget);
}





/* Create  a public iniitalization function*/

var ctrlAddItem = function(){  // Avoid DRY dont repeat yourself : solution
  // console.log('button clicked'); // test button




  // 1. Get the field  input data
  var input = UICtrl.getInput();

  //  !isNaN(input.value)  :: NOT allow inputDescription has numbers
  if(input.description !=="" && !isNaN(input.value) &&  input.value > 0){ // input not empty && value not NaN/ is a number true, inputValue > 0

    // 2. Add the item to the budget CONTROLLER
    var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    // 4. Clear the fields

      UICtrl.clearFields();

    // 5. Calculate and update budget__title
    updateBudget();

  }






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
