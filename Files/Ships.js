import { user,computer } from "./players.js";
import { Gameplaying } from "./gameplaying.js";
import { DOM } from "./DOM.js";

class Ship {

    static invoke_dom_gameboard_handler_for_normal_cells (opponent,row,clm) {
        DOM.DOM_game_boards_controller (opponent, row, clm,'✖️');
        DOM.ship_is_hit_sound();
    }

    static invoke_dom_gameboard_handler_for_submarine_attacker_cells (opponent,row,clm) {
        DOM.DOM_game_boards_controller (opponent, row, clm,'⚔️');   
        DOM.ship_is_hit_sound();
    }

    static update_bot_cheat_code_array (opponent) {
        if (opponent.name != "Bot") {
            this.get_all_user_remaining_cells ();
        }
    }

    static ship_is_sunk (opponent,hash_key) {
        opponent.remaining_ships -= 1;
        delete opponent.player_ships[hash_key];
        DOM.manage_player_ships(opponent);
        DOM.ship_is_sunk_sound();
        if (!opponent.remaining_ships) {
            Gameplaying.end_game (opponent);
            return true;
        }
        return false;
    }

    static update_opponent_submarine_ship_properties (opponent,shot_submarine_index,submarine_player_index) {
        opponent.the_shot_submarine_ships.splice (shot_submarine_index,1);
        opponent.the_shot_submarine_ships_length -= 1;
        opponent.submarine_ships_array.splice(submarine_player_index,1);
        this.update_bot_cheat_code_array (opponent);
    }

    static submarine_ship_is_sunk (opponent,shot_submarine_index,hash_key,submarine_player_index) {
        const neighbors_array = opponent.player_ships[hash_key];
        for (let i = 1; i < neighbors_array.length; i++) {
            for (let j = 0; j < neighbors_array[i].length; j++) {
                opponent.game_board[neighbors_array[i][j][0]][neighbors_array[i][j][1]] = 4;
                this.invoke_dom_gameboard_handler_for_normal_cells(opponent,neighbors_array[i][j][0],neighbors_array[i][j][1]);
            }
        }
        const game_end = this.ship_is_sunk (opponent,hash_key);
        if (!game_end) {
            this.update_opponent_submarine_ship_properties (opponent,shot_submarine_index,submarine_player_index);
        }
    }

    static hash_submarine_ship (shot_ship) {
        let hash_key = "";
        for (let i = 0; i < shot_ship.length; i++) {
            hash_key += shot_ship[i].join("");
        }
        return hash_key;
    }

    static check_if_submarine_ship_is_sunk (opponent,shot_ship,shot_submarine_index,submarine_player_index) {
        const submarine_ship_hash_key = this.hash_submarine_ship (shot_ship);
        if (opponent.player_ships[submarine_ship_hash_key]) {
            this.submarine_ship_is_sunk (opponent,shot_submarine_index,submarine_ship_hash_key,submarine_player_index);
        }
    }

    static push_new_shot_submarine_cell_chamber (opponent,ship_cell) {
        opponent.the_shot_submarine_ships[opponent.the_shot_submarine_ships_length] = [];
        opponent.the_shot_submarine_ships[opponent.the_shot_submarine_ships_length].push(ship_cell);
        opponent.the_shot_submarine_ships_length += 1;
    }

    static push_to_existing_submarine_cell_chamber (opponent,ship_cell,shot_submarine_index,submarine_player_index) {
        opponent.the_shot_submarine_ships[shot_submarine_index].push(ship_cell);
        opponent.the_shot_submarine_ships[shot_submarine_index].sort ((a,b) => a > b ? 1:-1);
        this.check_if_submarine_ship_is_sunk (opponent,opponent.the_shot_submarine_ships[shot_submarine_index],shot_submarine_index,submarine_player_index);
    }

    static check_if_cell_is_in_submarine_ship_array (submarine_ship_array,ship_cell) {
        for (let i = 0; i < submarine_ship_array.length; i++) {
            if (ship_cell[0] == submarine_ship_array[i][0] && ship_cell[1] == submarine_ship_array[i][1])
            {
                return true;
            }
        }
        return false;
    }

    static check_the_shot_submarine_cell (opponent,ship_cell) {
        
        let submarine_ship_array = [];

        let cell_found = false;

        let i,j;

        for (i = 0; i < opponent.the_shot_submarine_ships.length; i++) {
            for (j = 0; j < opponent.submarine_ships_array.length; j++) {
                
                let made_check = false;
                
                for (let k = 0; k < opponent.submarine_ships_array[j].length; k++) {
                    if (opponent.the_shot_submarine_ships[i][0][0] == opponent.submarine_ships_array[j][k][0] &&
                        opponent.the_shot_submarine_ships[i][0][1] == opponent.submarine_ships_array[j][k][1])
                    {
                        made_check = true;
                        submarine_ship_array = opponent.submarine_ships_array[j];
                        cell_found = this.check_if_cell_is_in_submarine_ship_array (submarine_ship_array,ship_cell)
                        break;
                    }
                }

                if (made_check) {
                    break;
                }
            }
            if (cell_found) {
                break;
            }
        }

        if (cell_found) {
            this.push_to_existing_submarine_cell_chamber (opponent,ship_cell,i,j);
        }
        else {
            this.push_new_shot_submarine_cell_chamber (opponent,ship_cell);
        }
    }

    static handle_submarine_ship_shot (opponent,row,clm) {
        
        opponent.game_board[row][clm] = 3;
        if (!opponent.the_shot_submarine_ships.length) {
            this.push_new_shot_submarine_cell_chamber (opponent,[row,clm]);
        }
        else {
            this.check_the_shot_submarine_cell (opponent,[row,clm]);
        }
        this.invoke_dom_gameboard_handler_for_submarine_attacker_cells(opponent,row,clm);
    }

    static handle_attacker_ship_shot (opponent,hash_key) {

        const ship_and_neighbors_array = opponent.player_ships[hash_key];

        for (let i = 0; i < ship_and_neighbors_array.length; i++) {
            if (!i) {
                opponent.game_board[ship_and_neighbors_array[i][0]][ship_and_neighbors_array[i][1]] = 3;
                this.invoke_dom_gameboard_handler_for_submarine_attacker_cells(opponent,ship_and_neighbors_array[i][0],ship_and_neighbors_array[i][1]);
                continue;
            }
            opponent.game_board[ship_and_neighbors_array[i][0]][ship_and_neighbors_array[i][1]] = 4;
            this.invoke_dom_gameboard_handler_for_normal_cells(opponent,ship_and_neighbors_array[i][0],ship_and_neighbors_array[i][1]);
        }
        const game_end =this.ship_is_sunk (opponent,hash_key);
        if (!game_end) {
            this.update_bot_cheat_code_array (opponent);
        }
    }

    static attacker_or_submarine_is_hit (opponent,row,clm) {
        const hash_key = `${row}${clm}`;

        // it's an attacker if the key is hashable
        if (opponent.player_ships[hash_key]) {
            this.handle_attacker_ship_shot (opponent,hash_key);
        }
        else {
            this.handle_submarine_ship_shot (opponent,row,clm);
        }
    }

    static isHit (opponent,the_target,row,clm) {
        switch (the_target) {
            case 1:
                this.attacker_or_submarine_is_hit (opponent,row,clm);
            break;
            case 2:
                opponent.game_board[row][clm] = 4;
                this.invoke_dom_gameboard_handler_for_normal_cells (opponent, row, clm);
            break;
            case 0:
                opponent.game_board[row][clm] = 4;
                this.invoke_dom_gameboard_handler_for_normal_cells (opponent, row, clm);
            break;
        }
    }

    static get_all_user_cells (computer_cheat_array) {
        for (let i = 0; i < user.game_board.length; i++) {
            for (let j = 0; j < user.game_board[i].length; j++) {
                if (user.game_board[i][j] == 1 || user.game_board[i][j] == 2 || user.game_board[i][j] == 0) {
                    computer_cheat_array.push ([i,j]);
                }
            }
        }
    }

    static get_only_user_ships_and_neighbors (computer_cheat_array) {
        for (let i = 0; i < user.game_board.length; i++) {
            for (let j = 0; j < user.game_board[i].length; j++) {
                if (user.game_board[i][j] == 1 || user.game_board[i][j] == 2) {
                    computer_cheat_array.push ([i,j]);
                }
            }
        }
    }

    static get_only_user_ships (computer_cheat_array) {
        for (let i = 0; i < user.game_board.length; i++) {
            for (let j = 0; j < user.game_board[i].length; j++) {
                if (user.game_board[i][j] == 1) {
                    computer_cheat_array.push ([i,j]);
                }
            }
        }
    }

    static get_all_user_remaining_cells () {
        computer.cheat_user_gameboard = [];
        switch (Gameplaying.game_level) {
            case "Easy":
                this.get_all_user_cells (computer.cheat_user_gameboard);
            break;
            case "Medium":
                this.get_only_user_ships_and_neighbors (computer.cheat_user_gameboard);
            break;
            case "Hard":
                this.get_only_user_ships (computer.cheat_user_gameboard);
            break;
        }
    }
}

export { Ship };