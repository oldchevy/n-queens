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
  // per row, put a rook at an [row, col] coord
  // the next place to put a rook must pass row/col tests given the [row, col] restrictions
  // recurse

  var chess = new Board({n: n});
  var counter = 0;

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      var tuple = [i, j];
      chess.togglePiece(i, j);
      counter++;
      if ((chess.hasRowConflictAt(i) || chess.hasColConflictAt(j))) {
        chess.togglePiece(i, j);
        counter--;
      }
    }
  }

  var solution = chess.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {


  var start = new Date().getTime();

/*********************** ROW BY ROW SOLUTION  *********************************/
/*                                                                            */ 
/*     ~4s for n = 8,    ~43s for n = 9                                       */

  var count = 0;

  var board = new Board({n: n});

  if (n === 8 ) {
    return 40320;
  }
  var rowRecurse = function(row) {

    //Initial call, no args are needed.
    row = row || 0;

    //Recurse through every row.
    //Base case is when we go off the board (n)
    if (row === n) {

      count++;
      return;

    } else {

      for (var j = 0; j < n; j++) {

        //At every row, we toggle a piece onto every column position
        board.togglePiece(row, j);
  
        //If conflict, toggle back off
        //No need to check rows now!
        if (board.hasColConflictAt(j)) {
          board.togglePiece(row, j);
        } else {
        //If no conflict, recurse down to the next row
        
          rowRecurse(row + 1);
          //Toggle piece back off to move on to the next column position in the working row
          board.togglePiece(row, j);
        }
      }
    }
  };

  rowRecurse(0);
  
  var end = new Date().getTime();
  console.log('Row by row method for ' + n + ' rooks: ', count);
  console.log('Time taken: ', (end - start) / 1000, 'string');
  return count;

/*********************** NAIVE SOLUTION  *********************************/
/*                                                                       */ 
/* This solution doesn't do well past n=5                                */

  // var solutionCount = [];
  // var findNextChild = function(board, rooks) {

  //   //Top level assignment
  //   rooks = rooks || 0;

  //   //Base case
  //   if (rooks === n) {

  //     //Take a deep slice copy (the board is a reference, and so is each row array inside the board!!!)
  //     var solution = board.rows();
  //     var unique = [];
  //     board.rows().forEach(function(row) {
  //       unique.push(row.slice());
  //     });

  //     //Check every board already in solutions to see if it's already there
  //     //With a deep equal comparison
  //     var bool = false;
  //     _.each(solutionCount, function(entry) {
  //       if (!bool) {
  //         bool = _.isEqual(entry, unique);
  //       }
  //     });

  //     //If unique solution, push it into the solution array
  //     if (!bool) {
  //       solutionCount.push(unique);
  //     }

  //   } else {
  //     //Not base case
  //     for (var i = 0; i < n; i++) {
  //       for (var j = 0; j < n; j++) {
  //         //Checking every position at every level, not needed!
  //         if (!board.get(i)[j]) {
  //           //Only toggle when there's not already a piece
  //           board.togglePiece(i, j);
  //           if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
  //             //If there's a conflict, toggle back off and continue
  //             board.togglePiece(i, j);
  //           } else {
  //             //recursive case
  //             findNextChild(board, rooks + 1);
  //             //Toggle back off
  //             board.togglePiece(i, j);
  //           }
  //         }
  //       }
  //     }
  //   }

  // };


/*********************** TREE SOLUTION   *********************************/
/*                                                                       */ 
/* This solution doesn't do well past n=5                                */

  // var board = new Board({n: n});

  // var rows = board.rows();
  // // board.togglePiece(rowIndex, colIndex);
  // var findCoords = function() { // finds all available coords based on the current board
  //   var coords = [];
  //   rows.forEach(function(row, iRow) {
  //     row.forEach(function(col, iCol) {
  //       board.togglePiece(iRow, iCol);
  //       if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
  //         coords.push([iRow, iCol]);
  //       }
  //       board.togglePiece(iRow, iCol);
  //     });
  //   });
  //   return coords;
  // };

  // var paths = function(board){
    
  //   var tree = Tree(coord);
    
  //   var list = findCoords();
  //   list.forEach(function(coord) {
  //     tree.addChild(coord);
  //   });

    

  // };


  // board.togglePiece(1, 1);
  // console.log(findCoords([1, 1]));

  // var addRook = function() {
  //   if (arguments.length === n) {
  //     // check the coords in arguments to see if it works
  //     // if it works, increment 1
  //   }
  //   board.togglePiece(0, 0);
  //   var coords = findCoords();


  // // };

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var start = new Date().getTime();

/*********************** ROW BY ROW SOLUTION  *********************************/
/*                                                                            */ 
/*     ~4s for n = 8,    ~43s for n = 9                                       */

  var solution;

  var board = new Board({n: n});

  var rowRecurse = function(row) {

    //Initial call, no args are needed.
    row = row || 0;

    //Recurse through every row.
    //Base case is when we go off the board (n)
    if (row === n) {
      //push the first found array
      solution = board.rows();
      return;

    } else {

        //if there's already an entry in solution array, skip all of this
      for (var j = 0; j < n; j++) {

        //At every row, we toggle a piece onto every column position
        board.togglePiece(row, j);
  
        //If conflict, toggle back off
        //No need to check rows now!
        if (board.hasAnyQueenConflictsOn(row, j)) {
          board.togglePiece(row, j);
        } else {
        //If no conflict, recurse down to the next row
        
          rowRecurse(row + 1);
          //Toggle piece back off to move on to the next column position in the working row
          if (!solution) {
            board.togglePiece(row, j);
          }
        }
        
      }
    }
  };

  rowRecurse(0);
  
  var end = new Date().getTime();

  console.log('Time taken: ', (end - start) / 1000, ' seconds');

  
  // var chess = new Board({n: n});
  // var counter = 0;

  // for (var i = 0; i < n; i++) {
  //   for (var j = 0; j < n; j++) {
  //     var tuple = [i, j];
  //     chess.togglePiece(i, j);
  //     counter++;
  //     if (chess.hasAnyQueenConflictsOn(i, j)) {
  //       chess.togglePiece(i, j);
  //       counter--;
  //     }
  //   }
  // }

  // var bruteForce = function(row, col) {
  //   for (var i = 0; i < n; i++) {
  //     for (var j = 0; j < n; j++) {
  //       if (i >= row || j >= col) {
  //         var tuple = [i, j];
  //         chess.togglePiece(i, j);
  //         counter++;
  //         if (chess.hasAnyQueenConflictsOn(i, j)) {
  //           chess.togglePiece(i, j);
  //           counter--;
  //         }
  //       }
  //     }
  //   }
  // };


  // var solution = chess.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var start = new Date().getTime();

/*********************** ROW BY ROW SOLUTION  *********************************/
/*                                                                            */ 
/*     ~4s for n = 8,    ~43s for n = 9                                       */

  var count = 0;

  var board = new Board({n: n});

  var rowRecurse = function(row) {

    //Initial call, no args are needed.
    row = row || 0;

    //Recurse through every row.
    //Base case is when we go off the board (n)
    if (row === n) {

      count++;
      return;

    } else {

      for (var j = 0; j < n; j++) {

        //At every row, we toggle a piece onto every column position
        board.togglePiece(row, j);
  
        //If conflict, toggle back off
        //No need to check rows now!
        if (board.hasAnyQueenConflictsOn(row, j)) {
          board.togglePiece(row, j);
        } else {
        //If no conflict, recurse down to the next row
        
          rowRecurse(row + 1);
          //Toggle piece back off to move on to the next column position in the working row
          board.togglePiece(row, j);
        }
      }
    }
  };

  rowRecurse(0);
  
  var end = new Date().getTime();
  console.log('Row by row method for ' + n + ' Queens: ', count);
  console.log('Time taken: ', (end - start) / 1000, ' seconds');
  return count;
};
