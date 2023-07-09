let players = (function() {

    let players = [];

    function addPlayer() {
        players.push(player)
    }

    function removePlayer(i) {
        players.slice(i, 1)
    }

    return { addPlayer, removePlayer }
})()

function player(name, symbol) {
    return { name, symbol }
}

const gameBoard = (() => {



})();