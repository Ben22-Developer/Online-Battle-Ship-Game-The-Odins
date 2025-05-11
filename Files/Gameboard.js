import { DOM } from "./DOM.js";

class Gameboard {

    static boat_symbol = '🏴‍☠️';

    static store_submarine_ships_of_player_in_gameboard  (player, ship_and_neighbours_coordinates) {
        player.submarine_ships_array[player.submarine_ships_array_length] = [];
        for (let i = 0; i < ship_and_neighbours_coordinates.length; i++) {
            for (let j = 0; j < ship_and_neighbours_coordinates[i].length; j++) {
                if (i == 0) {
                    player.game_board[ship_and_neighbours_coordinates[i][j][0]][ship_and_neighbours_coordinates[i][j][1]] = 1; 
                    player.submarine_ships_array[player.submarine_ships_array_length].push([ship_and_neighbours_coordinates[i][j][0],ship_and_neighbours_coordinates[i][j][1]]);
                    DOM.DOM_game_boards_controller (player,ship_and_neighbours_coordinates[i][j][0],ship_and_neighbours_coordinates[i][j][1],this.boat_symbol);
                }
                else {
                    player.game_board[ship_and_neighbours_coordinates[i][j][0]][ship_and_neighbours_coordinates[i][j][1]] = 2; 
                }     
            }
        }
        player.submarine_ships_array_length += 1;
    }

    static gameboard_submarine_ships_setup (player, ship_key, ship_and_neighbours_coordinates) {

        player.player_ships[ship_key] = ship_and_neighbours_coordinates;
        this.store_submarine_ships_of_player_in_gameboard (player, ship_and_neighbours_coordinates);
        player.remaining_ships += 1;
    }

    static store_attacker_ships_of_player_in_gameboard (player, ship_and_neighbours_coordinates) {

        for (let i = 0; i < ship_and_neighbours_coordinates.length; i++) {
            if (i == 0) {
                player.game_board[ship_and_neighbours_coordinates[i][0]][ship_and_neighbours_coordinates[i][1]] = 1;
                DOM.DOM_game_boards_controller (player,ship_and_neighbours_coordinates[i][0],ship_and_neighbours_coordinates[i][1],this.boat_symbol);
            }
            else {
                player.game_board[ship_and_neighbours_coordinates[i][0]][ship_and_neighbours_coordinates[i][1]] = 2;
            }
        }
    }

    static gameboard_attacker_ships_setup (player, ship_key, ship_and_neighbours_coordinates) {

        player.player_ships[ship_key] = ship_and_neighbours_coordinates;
        this.store_attacker_ships_of_player_in_gameboard (player, ship_and_neighbours_coordinates);
        player.remaining_ships += 1;
    }
}

export { Gameboard }