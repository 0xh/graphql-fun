import { PubSub } from 'apollo-server-express'

global.players = []
global.teams = []
global.playersOnDeck = []
global.availablePlayers = []
global.currentGame = {
    playerCount: 0,
    players: [],
    playingMusic: [],
    faces: []
}

const pubsub = new PubSub()
pubsub.ee.setMaxListeners(1500)

export const context = ({ req, connection }) => ({
    pubsub,
    players: global.players,
    teams: global.teams,
    playersOnDeck: global.playersOnDeck,
    availablePlayers: global.availablePlayers,
    currentGame: global.currentGame,
    currentPlayer: global.players
        .find(p => p.token === (connection ?
            connection.context.Authorization :
            req.headers.authorization
        ))
})
