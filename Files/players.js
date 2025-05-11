class Player {
    constructor () {
        this.name = null;
        this.points = 0;
        this.remaining_ships = 0;
        this.player_choice = 0;
        this.submarine_ships_array = [];
        this.submarine_ships_array_length = 0;
        this.the_shot_submarine_ships = [];
        this.the_shot_submarine_ships_length = 0;
        this.player_is_playing = false;
        this.player_ships = {};
        this.game_board = [];
    }

    setPlayerName (name) {
        this.name = name;
    }

    setPlayerGameboard () {
        const game_board_length = 10;
        for (let i = 0; i < game_board_length; i++) {
            this.game_board[i] = [];
            for (let j = 0; j < game_board_length; j++) {
                this.game_board[i][j] = 0;
            }
        }
        // console.log("this.game board: ",this.game_board);
    }

    updateUserPropertiesToStartTheGame (bool = false) {
        this.name = this.name;
        this.remaining_ships = 0;
        this.player_choice = 0;
        this.submarine_ships_array = [];
        this.submarine_ships_array_length = 0;
        this.the_shot_submarine_ships = [];
        this.the_shot_submarine_ships_length = 0;
        this.player_is_playing = false;
        this.player_ships = {};
        this.game_board = [];
        if (bool) {
            this.points = 0;
        }
    }
}

const user = new Player ();
const computer = new Player ();

user.setPlayerName("User");
computer.setPlayerName("Bot");

window.user = user;
window.computer = computer;

export { Player, user, computer };