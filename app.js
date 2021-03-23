// Our Initial state
let gameState = {

    canvas: [

        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','','','','','','',''],
    ],



    // Initialize snake body and direction
    snake : {
            body: [ [9, 16], [9, 17], [9, 18], [9, 19] ],
            nextDirection: [0, -1]
    },

    // Initialize apple
    apple : {
            //  location:  [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]
            location: []
    }

};

function buildInitialState() {

    renderState();
    buildSnake();
    showApple();

}

// Render the State
function renderState() {

    const canvasElement = $('#canvas');
    canvasElement.empty();

    gameState.canvas.forEach( function(row, rowIndex) {
        row.forEach( function( segment, segmentIndex) {
            const segmentElement = $(`<div class="segment" data-x="${rowIndex}" data-y="${segmentIndex}"></div>`);
            canvasElement.append(segmentElement);
        })
    })

}

function buildSnake() {

    $('.segment').removeClass('snake')
    
    const snakeHead = gameState.snake.body[0];
    const snakeHeadX = snakeHead[0];
    const snakeHeadY = snakeHead[1];

    const newSnakeHeadX = snakeHeadX + gameState.snake.nextDirection[0]
    const newSnakeHeadY = snakeHeadY + gameState.snake.nextDirection[1]
    const newSnakeHead = [ newSnakeHeadX, newSnakeHeadY ]

    // Check if apple coordinates match Snake Head coordinates
    if( gameState.apple.location[0] === newSnakeHead[0] && gameState.apple.location[1] === newSnakeHead[1] ){   
        // Add to Snake Head (make Snake larger)
        gameState.snake.body.unshift(newSnakeHead);
        // Give apple new location
        gameState.apple.location = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
        // Update apple on game board
        showApple();
    } else {
        // Remove tail and add to head
        gameState.snake.body.pop();
        gameState.snake.body.unshift(newSnakeHead);
    }

    // Draw Snake on page (update elements on game board)
    gameState.snake.body.forEach(function(coordinates) {
        // Grab coordinates from Snake body property
        const coordinateX = coordinates[0];
        const coordinateY = coordinates[1];

        const segmentElement = $(`[data-x="${coordinateX}"][data-y="${coordinateY}"]`);
        segmentElement.addClass('snake');
    })
}


function showApple() {
    // let location = gameState.apple.location;
    let location = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]
    const appleXCoordinate = location[0];
    const appleYCoordinate = location[1];
    
    const appleElement = $(`[data-x="${appleXCoordinate}"][data-y="${appleYCoordinate}"]`);
    appleElement.addClass('apple');

}


// Listeners
function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState() // show the user the new state
}

$('.board').on('click', onBoardClick); // etc

// Arrow Key listeners
$(window).on('keydown', function(event) {
    if (event.keyCode === 37) {
        gameState.snake.nextDirection = [0, -1]
    }
    if (event.keyCode === 39) {
        gameState.snake.nextDirection = [0, 1]
    }
    if (event.keyCode === 38) {
        gameState.snake.nextDirection = [-1, 0]
    }
    if (event.keyCode === 40) {
        gameState.snake.nextDirection = [1, 0]
    }
})


setInterval(tick, 200);

// Refresh the screen in an interval
function tick() {
    buildSnake();
}

$(window).on('keydown', function (event) {
// Read which key was pressed and update the state accordingly
})


buildInitialState();