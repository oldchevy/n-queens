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


  var solutionCount = [];

  var topLevel = new Board({n: n});

  var findNextChild = function(board, rooks) {

    rooks = rooks || 0;

    if (rooks === n) {

      _.each(solutionCount, function(unique) {
        _.isEqual()
      });
      solutionCount.push(board.rows());
      return;
    }

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (!board.get(i)[j]) {
          board.togglePiece(i, j);
          if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
            board.togglePiece(i, j);
          } else {
            var childBoard = new Board(board.rows());
            findNextChild(childBoard, rooks + 1);
            board.togglePiece(i, j);
          }
        }
      }
    }
    //check every point, to see if it's a valid next move
    //if it's a valid next move, recurse on that

  };
  //get all possible combinations of coordinates
  //Check each one with hasAnyRooksConflicts
  //increment count if it's correct

  findNextChild(topLevel);

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
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
