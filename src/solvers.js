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
  var solution = new Board({n:n});

  var rowCol;
  //debugger;
  /////////////////////////////////////////////////////////////////////////////
  var findNRooksHelper = function(solution,row,col,n) {
    if (solution.numOfPlayers() === n && !solution.hasAnyRowConflicts() && !solution.hasAnyColConflicts()) {
      return solution;
    }
    solution.togglePiece(row,col);
   // Place the first player on the first cell
    var findNextPlayerPosition = function(){
      for (var i = row; i < n; i++) {
        for (var j = col+1; j < n; j++) {
          solution.togglePiece(i,j);
          if (!solution.hasAnyRowConflicts() && !solution.hasAnyColConflicts()) {
            row = i;
            col = j;
            solution.togglePiece(i,j);
            return [row,col]; 
          } else {
            solution.togglePiece(i,j);
          }
        }
      }
      //debugger;
    };

    rowCol = findNextPlayerPosition();

    if (rowCol) {
      findNRooksHelper(solution,rowCol[0],rowCol[1],n);
    }

  };
///////////////////////////////////////////////////////////////////////////////
  // START RECURSION
  findNRooksHelper(solution,0,0,n);

 // 2. recursion -------
 // ignore the row and column where the first player sits
 // place the next player anywhere else
 // apply the conflict checks for row and column 
 // if passed move on to the next player
 // check if the player no is less than n
 // go to line 2
  debugger;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};





// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
