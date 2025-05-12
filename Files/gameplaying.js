import { Ship } from "./Ships.js";
import { user, computer } from './players.js';
import { DOM } from "./DOM.js";

class Gameplaying {

    static game_level;
    static winner;

    static restart_the_champion () {
        user.updateUserPropertiesToStartTheGame (true);
        computer.updateUserPropertiesToStartTheGame (true);
    }
    
    static restart_the_round () {
        user.updateUserPropertiesToStartTheGame ();
        computer.updateUserPropertiesToStartTheGame ();

    }

    static start_the_game_again (bool) {
        if (bool) {
            this.restart_the_champion ();
        }
        else {
            this.restart_the_round ();
        }
    }

    static update_winner_properties (winner) {
        
        const to_be_champion_points = 3;

        winner.points += 1;
        
        // let champion_win,round_win;

        if (winner.points == to_be_champion_points) {
            DOM.manage_player_points(winner);
            DOM.manage_winner(winner,"is the champion");
        }
        else {
            DOM.manage_player_points(winner);
            DOM.manage_winner(winner,"wins the round");
        }
    }

    static end_game (loser) {
        this.winner = true;
        if (loser == user) {
            this.update_winner_properties (computer);
        }
        else {
            this.update_winner_properties (user);
        }
    }

    static make_user_repeat_the_shot () {
       alert ("Attack to an uncrossed target homie!");
    }

    static make_another_player_play () {
        user.player_is_playing = !user.player_is_playing;
        computer.player_is_playing = !computer.player_is_playing;
        if (computer.player_is_playing) {
            this.check_player_who_is_going_to_play (computer);
            DOM.switch_playing_characters(computer);
        }
        else {
            DOM.switch_playing_characters(user);
        }
        DOM.manage_playing_state (computer);
        DOM.manage_playing_state (user);
    }

    static process_the_target (player,opponent,row,clm) {
        switch (opponent.game_board[row][clm]) {
            case 1:
                Ship.isHit (opponent,opponent.game_board[row][clm],row,clm);
            break;
            case 2: 
                Ship.isHit (opponent,opponent.game_board[row][clm],row,clm);
            break;
            case 0:
                Ship.isHit (opponent,opponent.game_board[row][clm],row,clm);
            break;
            default:
                return false;
        }
        return true;
    }

    static handle_player_shots (player,opponent,target) {
        if (player.player_is_playing) {

            const user_shot_the_target = this.process_the_target (player,opponent,target[0],target[1]);

            if (this.winner) {
                return;
            }

            if (user_shot_the_target) {
                this.make_another_player_play ();
            }
            else {
                this.make_user_repeat_the_shot ();
            }
        }
    }

    static computer_sleep_1_second () {
        return new Promise ((resolve,reject) => {
            setTimeout (() => this.winner ? reject() : resolve(),1000);
        })
    }

    static async computer_plays () {

        try {

            const random_choice = Math.floor (Math.random() * computer.cheat_user_gameboard.length);
            computer.player_choice = computer.cheat_user_gameboard[random_choice];
            computer.cheat_user_gameboard.splice(random_choice,1);
            await this.computer_sleep_1_second();
            this.handle_player_shots (computer,user, computer.player_choice);
        }
        catch (err) {}
    }


    static check_player_who_is_going_to_play (player) {
        if (player.name == "Bot") {
            this.computer_plays();
        }
        else {
            return true;
        }
    }

    // user.choice to be done when DOM is added
    static user_play (target) {
        const check_if_its_user_turn = this.check_player_who_is_going_to_play(user);
        if (check_if_its_user_turn) {
            this.handle_player_shots (user,computer,target);
        }
    }
    
    static startGame (players,level) {

        const player_to_start_game = Math.floor(Math.random() * players.length);

        this.game_level = level;
        this.winner = false;

        Ship.get_all_user_remaining_cells ();

        players[player_to_start_game].player_is_playing = true;
        
        DOM.switch_playing_characters (players[player_to_start_game]);
        DOM.manage_playing_state (players[player_to_start_game]);
        DOM.manage_player_points(user);
        DOM.manage_player_points(computer);
        DOM.manage_player_ships(user);
        DOM.manage_player_ships(computer);

        if (player_to_start_game == 1) {
            setTimeout(() => {
                this.check_player_who_is_going_to_play (players[player_to_start_game]);
            },2000);
        }
    }
}

window.Gameplaying = Gameplaying;

export { Gameplaying };
