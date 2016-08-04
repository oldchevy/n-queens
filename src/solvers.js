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


  // if (n === 1) {
  //   return 1;
  // }
  // if (n === 2) {
  //   return 2;
  // }
  // // if (n === 3) {
  // //   return 6;
  // // }
  // if (n === 4) {
  //   return 24;
  // }
  // if (n === 5) {
  //   return 120;
  // }
  // if (n === 6) {
  //   return 720;
  // }
  // if (n === 7) {
  //   return 5040;
  // }
  // if (n === 8) {
  //   return 40320;
  // }


  var solutionCount = [];

  var topLevel = new Board({n: n});

  var findNextChild = function(board, rooks) {

    //debugger;

    //var board = new Board(nextboard);

    rooks = rooks || 0;

    if (rooks === n) {


      var solution = board.rows();
      var unique = [];
      board.rows().forEach(function(row){
        unique.push(row.slice());
      });
      //console.log('Solution: ', unique);

      var bool = false;
      _.each(solutionCount, function(entry) {
        if (!bool) {
          bool = _.isEqual(entry, unique);
        }
      });

      if (!bool) {
        solutionCount.push(unique);
      }

    } else {

      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          //console.log('Board:', board.rows(), 'Indeces:', i, j, 'Level:', rooks);
          if (!board.get(i)[j]) {
            board.togglePiece(i, j);
            if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
              board.togglePiece(i, j);
            } else {
              //var childBoard = new Board(board.rows());
              findNextChild(board, rooks + 1);
              //console.log('After recursion:', board.rows(), 'Level:', rooks);
              board.togglePiece(i, j);
            }
          }
        }
      }

      
    }
    //check every point, to see if it's a valid next move
    //if it's a valid next move, recurse on that

  };


  findNextChild(topLevel);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount.length);
  return solutionCount.length;

  //get all possible combinations of coordinates
  //Check each one with hasAnyRooksConflicts
  //increment count if it's correct






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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
