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
    };

    rowCol = findNextPlayerPosition();

    if (rowCol) {
      findNRooksHelper(solution,rowCol[0],rowCol[1],n);
    }

  };
///////////////////////////////////////////////////////////////////////////////
  // START RECURSION
  findNRooksHelper(solution,0,0,n);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};






// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({n:n});

  var storage = [];
  //var rowCol;
  

  //var findNRooksHelper = function(solution,n) {
    // if (solution.numOfPlayers() === n && !solution.hasAnyRowConflicts() && !solution.hasAnyColConflicts()) {
    //   return solution;
    // }

  for (var x=0; x < n; x++){
    for (var y=0; y < Math.floor(n/2); y++){
      //EMPTY BOARD
      solution = new Board({n:n});
      solution.togglePiece(x,y);
      //The following should be done for first player being positioned 
      // in 0 to Math.floor(n/2)
      ////////////////////////////////////////////////////////////////////////////////////
      var findNextPlayerPosition = function(row,col){
        for (var i = row; i < row+n; i++) {
          for (var j = col+1; j < col+n; j++) {
            var r = (i) % n ;
            var c = ( j ) % n ;
            solution.togglePiece(r,c);
            if (!solution.hasAnyRowConflicts() && !solution.hasAnyColConflicts()) {
              if (solution.numOfPlayers() === n) {
                var solutionString = JSON.stringify(solution);
                if(storage.indexOf(solutionString) < 0) {
                  storage.push(solutionString); 
                }
                debugger;
                solution.togglePiece(r,c);
                return;
              } else {
                row = r;
                col = c;
                findNextPlayerPosition(row,col);
                solution.togglePiece(row,col);
              } 
            } else {
              solution.togglePiece(r,c);
            }
          } // end of j
        } // end of i
      }; // end of findNextPlayerPosition
      ////////////////////////////////////////////////////////////////////////////////////
       // START RECURSION
      debugger;
      findNextPlayerPosition(x,y);
    } // end of y
  } // end of x

  //};

  console.log('Number of solutions for ' + n + ' rooks:', JSON.stringify(solution));
  //return solution.rows();

  //UNIQUE
  debugger;
  //var uniqStorage = _.uniq(storage);
  return uniqStorage.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n});
  var nQueensHelper = function (row) {
    for(var col = 0 ; col < n ; col++) {
      solution.togglePiece(row,col);
      if((solution.numOfPlayers() === n) && !solution.hasAnyQueensConflicts()) {
        console.log("We have a solution for "+n);
        return ;
      } else if (!solution.hasAnyQueensConflicts()) {
        var ret = nQueensHelper(row+1);

        if((solution.numOfPlayers() === n) && !solution.hasAnyQueensConflicts()) {
          return;
        } else if (ret === null) {
          solution.togglePiece(row,col);
        }

      } else {
        solution.togglePiece(row,col);
      } 
    }
    console.log("No solution");
    return null;
  };


  debugger;
  nQueensHelper(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
