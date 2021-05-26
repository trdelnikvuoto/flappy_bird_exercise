document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 400
    let obstaclesDone = 0

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) {
        birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        }
    }
    document.addEventListener('keyup', control)

    function generateObstacles() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if(obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            
            if(obstacleLeft === 140 && isGameOver === false) {

                obstaclesDone ++

                let boxText = document.querySelector('.box-text')
                boxText.innerText = obstaclesDone

                console.log(obstaclesDone)
            }
            if(
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 133 || birdBottom > obstacleBottom + gap - 200) ||
                birdBottom === 0) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacles, 3000)
    }
    generateObstacles()


    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup', control)

        let boxText = document.querySelector('.box-text')
        boxText.innerText = "You're too drunk!"
        boxText.style.marginTop = "10px"
    }
})