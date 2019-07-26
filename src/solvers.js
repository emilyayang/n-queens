/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  // input: board size and num of rooks
  // output: matrix, array of arrays with length === n

//   var board = new Board({n});
//   var solution = board.rows();
// console.log(solution)
//   var columnIndex = 0;
//   var rowIndex = 0;
//   solution[0][0]= 1;
//   n--;
//   var savedRow;
//   var savedColumn;
//   var checkConflict = function() {
//     if (n > 0) {
//       if (columnIndex < length - 1) {
//         columnIndex++;
//         solution[rowIndex][columnIndex] = 1;
//         savedRow = rowIndex;
//         savedColumn = columnIndex;
//       } else {
//         columnIndex = 0;
//         rowIndex++;
//         solution[rowIndex][columnIndex] = 1;///
//         savedRow = rowIndex;
//         savedColumn = columnIndex;
//       }
//       if (board.hasAnyRooksConflicts()) {
//         solution[savedRow][savedColumn] = 0;
//         checkConflict();
//       } else {
//         n--;
//         checkConflict();
//       }
//     }
//   }
//   checkConflict();
//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution;
//////
  var solution;
  var board = new Board({ n });
  var findSolution = (row = 0) => {
    if (row < n && !solution) {//stay in confines of matrix // && when we get one solution
      for (var col = 0; col < n; col++) {
        board.togglePiece(row, col);
        if (!board.hasAnyRooksConflicts()) { //if no conflicts can check another
          findSolution(row + 1);
        }
        board.togglePiece(row, col); //if there is a conflict set it back to 0
      }
      //check row and repeat
    } else if (row === n) {
      //return board;//cant just return board since it bubbles back up and it is untoggled //returns and empty board
      //solution = board//cant do changes both objects need to copy the board
      solution = board.rows().slice().map(row => row.slice());
      //slice returns a shallow copy, still pointing at individual rows
      //made a new array but pointing at the same rows
      //one level nested to slice the inside arrays too
    }
  }
  findSolution();
  return solution || board.rows();// || if n was 0

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  //if all rows are exhausted
  var board = new Board({n});
  var findSolution = function(row) {
    if( row === n) {
      solutionCount++;
      return;
    }
    // var row = n - rowsLeft
    //iterate over possible decisions
    for (var i = 0; i < n; i++) {
      //place a piece
      board.togglePiece(row, i);
      //recurse into remaining problem
      if (!board.hasAnyRooksConflicts()) {
        findSolution(row + 1);
      //unplace a piece
      }
      board.togglePiece(row, i);
    }
  }
  findSolution(0);
  return solutionCount;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var board = new Board({ n });
  var findSolution = (row = 0) => {
    if (row < n && !solution) {
      for (var col = 0; col < n; col++) {
        board.togglePiece(row, col);
        if (!board.hasAnyQueensConflicts()) {
          findSolution(row + 1);
        }
        board.togglePiece(row, col);
      }
    } else if (row === n) {
      solution = board.rows().slice().map(row => row.slice());
    }
  }
  findSolution();
  return solution || board.rows();// || if n was 0

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  //if all rows are exhausted
  var board = new Board({n});
  var findSolution = function(row) {
    if( row === n) {
      solutionCount++;
      return;
    }
    // var row = n - rowsLeft
    //iterate over possible decisions
    for (var i = 0; i < n; i++) {
      //place a piece
      board.togglePiece(row, i);
      //recurse into remaining problem
      if (!board.hasAnyQueensConflicts()) {
        findSolution(row + 1);
      //unplace a piece
      }
      board.togglePiece(row, i);
    }
  }
  findSolution(0);
  return solutionCount;
};
