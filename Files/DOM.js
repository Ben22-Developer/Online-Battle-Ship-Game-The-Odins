import { user,computer } from "./players.js"
import { Gameplaying } from "./gamePlaying.js";
import { Gamesetup } from "./gamesetup.js";

const welcome_section = document.getElementById("welcome_section");
const menu_page = document.getElementById("menu_page");
const game_welcome_title = document.getElementById("game_welcome_title");
const loading = document.getElementById("loading");

const game_play = document.getElementById("game_play");
const user_game_board = document.createElement("div");
const bot_game_board = document.createElement("div");
const game_boards = document.getElementById("game_boards");

const start_game_btn = document.getElementById("start_game_btn");
const continue_btn = document.getElementById("continue_btn");
const sound_btn = document.getElementById("sound_btn");
const back_btn = document.getElementById("back_btn");
const select = document.querySelector("select");

const user_remaining_ships = document.getElementById("user_remaining_ships");
const bot_remaining_ships = document.getElementById("bot_remaining_ships");
const user_points = document.getElementById("user_points");
const bot_points = document.getElementById("bot_points");
const dialog = document.querySelector("dialog");
const winner_msg = document.querySelector("#winner_msg");
const continue_after_win_btn = document.getElementById("continue_after_win_btn");
const reset_after_win_btn = document.getElementById("reset_after_win_btn");
const typing_sound = document.getElementById("typing_sound");
const click_sound = document.getElementById("click_sound");

const submit_optional_name = document.getElementById("submit_name");
const close_optional_name = document.getElementById("close_optional_name");


let user_header,bot_header,toggling_div_user,toggling_div_bot;
let game_level = "Medium";
let sound_on = true;



const user_game_board_arr = [];
const bot_game_board_arr = [];

class DOM {
    
    static end_game_sound (player) {
        if (sound_on) {
            if (player == user) {
                document.getElementById("win_effect").play();
            }
            else {
                document.getElementById("lose_effect").play();
            }
        }
    }

    static play_click () {
        if (sound_on) {
            click_sound.play();
        }
    }

    static ship_is_sunk_sound () {
        if (sound_on) {
            document.getElementById("ship_sunk").play();
        }
    }

    static ship_is_hit_sound () {
        if (sound_on) {
            document.getElementById("ship_hit").play();
        }
    }

    static manage_winner (player,msg) {
        player.points == 3 ? continue_after_win_btn.style.visibility = "hidden" : continue_after_win_btn.style.visibility = "visible";
        dialog.showModal();
        winner_msg.innerText = `😜😜😜 ${player.name}🚀🚀🚀\n ${msg}!`;
        DOM.end_game_sound(player);
    }

    static manage_player_points (player) {
        if (player == user) {
            user_points.innerText = `${user.name} Points : ${user.points}`;
        }
        else {
            bot_points.innerText = `${computer.name} Points : ${computer.points}`;
        }
    }

    static manage_player_ships (player) {
        if (player == user) {
            user_remaining_ships.innerText = `${user.name} has ${user.remaining_ships} remaining ships`;
        }
        else {
            bot_remaining_ships.innerText = `${computer.name} has ${computer.remaining_ships} remaining ships`;
        }
    }

    static manage_playing_state (player) {

        if (player.player_is_playing && player == user) {
            user_header.innerText = `${player.name} 👨🏽‍✈️ is playing`; 
        }
        else if (player.player_is_playing && player == computer) {
            bot_header.innerText = `${player.name} 👨🏾‍💻 is playing`; 
        }

        if (!player.player_is_playing && player == user) {
            user_header.innerText = `${player.name} 👨🏽‍✈️`; 
        }
        else if (!player.player_is_playing && player == computer) {
            bot_header.innerText = `${player.name} 👨🏾‍💻`; 
        }
            
    }

    static toggling_div_fn (player) {
        if (player == user) {
            toggling_div_bot.style.visibility = "hidden";
            toggling_div_user.style.visibility = "visible";
            user_game_board.style.cursor = "not-allowed";
            bot_game_board.style.cursor = "pointer";
        }
        else {
            toggling_div_bot.style.visibility = "visible";
            toggling_div_user.style.visibility = "hidden";
            user_game_board.style.cursor = "pointer";
            bot_game_board.style.cursor = "not-allowed";
        }
    }

    static switch_playing_characters (player) {
        DOM.toggling_div_fn(player);
    }

    static DOM_game_boards_controller (player,row,clm,character) {
        if (player == user) {
            user_game_board_arr[row][clm].innerHTML = `<p class="emoji">${character}</p>`;
        }
        else if (user.player_is_playing) {
            bot_game_board_arr[row][clm].innerHTML = `<p class="emoji">${character}</p>`;
        }
    }

    static filter_data (e) {
        const user_play_response = e.target.id.split(",");
        user.choice = [Number(user_play_response[0]),Number(user_play_response[1])];
        if (user.choice[0] && user.choice[1] || user.choice[0] == 0 || user.choice[1] == 0) {
            Gameplaying.user_play(user.choice);
        }
    }

    static create_player_gameboard (user_game_board,player,emoji,player_arr) {
        const header = document.createElement("h2");
        const game_board = document.createElement("div");

        user_game_board.append (header);
        user_game_board.append(game_board);

        let characters = 97;
        let clm_nbr = -2;

        header.innerText = `${player.name} ${emoji}`;
        header.id = player == user ? header.id = "user_header" : header.id = "bot_header";

        for (let i = 0; i < 11; i++) {
            const row = document.createElement("div");
            row.classList.add("row");
            clm_nbr ++;
            for (let j = 0; j < 11; j++) {
                if (!i) {
                    const char_paragraph = document.createElement("p");
                    row.append(char_paragraph);
                    if (!j) {
                        continue;
                    }
                    char_paragraph.innerText = String.fromCharCode(characters);
                    char_paragraph.classList.add("char");
                    characters ++;
                }
                else {
                    if (!j) {
                        const char_paragraph = document.createElement("p");
                        row.append(char_paragraph);
                        char_paragraph.classList.add("nbrs");
                        char_paragraph.innerText = clm_nbr;
                        player_arr[clm_nbr] = [];
                        continue;
                    }
                    const square = document.createElement("div");
                    square.classList.add("square");
                    row.append(square);
                    square.id = `${clm_nbr},${j-1}`;
                    player_arr[clm_nbr].push(square);
                }
            }
            game_board.append(row);
        }
    }

    static load_gameboards() {

        user_game_board.innerHTML = "";
        bot_game_board.innerHTML = "";
        game_boards.innerHTML = "";

        game_boards.append(user_game_board);
        game_boards.append(bot_game_board);
        game_boards.id = "game_boards";
        user_game_board.id = "user_game_board";
        bot_game_board.id = "bot_game_board";

        DOM.create_player_gameboard (user_game_board,user,"👨🏽‍✈️",user_game_board_arr);
        DOM.create_player_gameboard (bot_game_board,computer,"👨🏾‍💻",bot_game_board_arr);

        const toggling_div_user_elt = document.createElement("div");
        const toggling_div_bot_elt = document.createElement("div");
        
        toggling_div_user_elt.id = "toggling_div_user";
        toggling_div_bot_elt.id = "toggling_div_bot";

        user_game_board.append(toggling_div_user_elt);
        bot_game_board.append(toggling_div_bot_elt);

        user_header = document.getElementById("user_header");
        bot_header = document.getElementById("bot_header");

        toggling_div_user = document.getElementById("toggling_div_user");
        toggling_div_bot = document.getElementById("toggling_div_bot");

    }

    static display_menu_page() {
        menu_page.style.display = "flex";
        menu_page.style.flexDirection = "column";
        menu_page.style.justifyContent = "center";
        menu_page.style.alignItems = "center";
    }

    static load_animations() {
        typing_sound.play();
        loading.style.display = "none";
        welcome_section.style.animationPlayState = "Running";
        game_welcome_title.style.animationPlayState = "Running";
        setTimeout (() => {
            DOM.display_menu_page ();
        },10000)
    }

    static start_page () {
        document.getElementById("optional_form").style.display = "none";

        if (document.readyState == "complete") {
            DOM.load_animations();
            return;
        }
        loading.style.visibility = "visible";
        window.addEventListener("load",DOM.load_animations);
    }
}

window.addEventListener("load",DOM.load_animations);
bot_game_board.addEventListener("click",DOM.filter_data);

continue_after_win_btn.addEventListener("click", e => {
    e.preventDefault();
    DOM.play_click();
    Gameplaying.start_the_game_again(false);
    Gamesetup.main(game_level);
    dialog.close();
});

reset_after_win_btn.addEventListener("click", e => {
    e.preventDefault();
    DOM.play_click();
    Gameplaying.start_the_game_again(true);
    Gamesetup.main(game_level);
    dialog.close();
});

back_btn.addEventListener ("click", () => {
    DOM.play_click();
    game_play.style.display = "none";
    continue_btn.style.display = "block";
    DOM.display_menu_page ();
});

start_game_btn.addEventListener ("click", () => {
    DOM.play_click();
    game_play.style.display = "block";
    menu_page.style.display = "none";
    Gamesetup.game_level(game_level);
});

continue_btn.addEventListener ("click", () => {
    DOM.play_click();
    game_play.style.display = "block";
    menu_page.style.display = "none";
});

select.addEventListener("change",e => {
    continue_btn.style.display = "none";
    game_level = e.target.value;
    DOM.play_click();
});
/*
submit_optional_name.addEventListener("click", e => {
    e.preventDefault();
    DOM.play_click();
    user.setPlayerName(document.getElementById("optional_name").value);
    DOM.start_page();
});

close_optional_name.addEventListener("click", e => {
    e.preventDefault();
    DOM.play_click();
    DOM.start_page();
});
*/
sound_btn.addEventListener("click", () => {
    DOM.play_click();
    sound_on = !sound_on;
    sound_on ? sound_btn.innerText = "SOUND ON" : sound_btn.innerText = "SOUND OFF";

})

export { DOM };