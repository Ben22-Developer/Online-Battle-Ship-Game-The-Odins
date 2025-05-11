import { user, computer } from './players.js'
import { Gameboard } from './Gameboard.js';
import { Gameplaying } from './gameplaying.js';
import { DOM } from "./DOM.js"


class Gamesetup {

    static available_coordinates_on_player_board = [];
    static free_dimension_to_place_ship_ver_hor = [];
    static free_dimension_to_place_ship_up_down = [];

    static generate_ship_coordinate_key = (ship_index) =>  ship_index.join("");
    

    static generate_submarine_ships_coordinate_key (submarine_ship_index) {

        if (submarine_ship_index) {
            let submarine_ship_key = "";
            for (let i = 0; i < submarine_ship_index.length; i++) {
                submarine_ship_key += this.generate_ship_coordinate_key(submarine_ship_index[i]);
            }
            return submarine_ship_key;
        }
    }


    static get_north_neighbour_y_axis = ship_coordinate => ship_coordinate[0] + 1;

    static get_north_and_south_neighbour_x_axis = ship_coordinate => ship_coordinate[1];

    static get_south_neighbour_y_axis = ship_coordinate => ship_coordinate[0] - 1;

    static get_east_neighbour_x_axis = ship_coordinate => ship_coordinate[1] + 1;

    static get_west_neighbour_x_axis = ship_coordinate => ship_coordinate[1] - 1;

    static get_east_and_west_neighbour_y_axis = ship_coordinate => ship_coordinate[0];

    static check_if_submarine_ship_neigbhour_is_in_boundary = (y_axis,x_axis) => (y_axis >= 0 && y_axis < 10 && x_axis >= 0 && x_axis < 10) ? true : false;
     
    static check_if_submarine_ship_axis_are_valid = (cell,next_cell) => (cell == 0 && next_cell == 0) ? true : false;
    

    static set_sub_marine_ship_neighbour_on_ver_position (chosen_cells,cells_to_take) {

        const north_neighbours_y_axis = [];

        let neigbhour_index,north_neighbour_y_axis,north_neighbour_x_axis,south_neighbour_y_axis,south_neighbour_x_axis;
        let east_neighbour_x_axis,east_and_west_neighbour_y_axis,west_neighbour_x_axis;
        let north_east_neigbhour_x_axis,north_east_neigbhour_y_axis,north_west_neigbhour_x_axis,north_west_neigbhour_y_axis;
        let south_east_neigbhour_x_axis,south_east_neigbhour_y_axis,south_west_neigbhour_x_axis,south_west_neigbhour_y_axis;

        let i = 0;
        let k = 0;

        // North neighbour
        north_neighbour_y_axis = this.get_north_neighbour_y_axis (chosen_cells[0][chosen_cells[0].length - 1]);
        north_neighbour_x_axis = this.get_north_and_south_neighbour_x_axis (chosen_cells[0][chosen_cells[0].length - 1]);

        if (this.check_if_submarine_ship_neigbhour_is_in_boundary (north_neighbour_y_axis,north_neighbour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [north_neighbour_y_axis,north_neighbour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }

        // South Neighbour
        south_neighbour_y_axis = this.get_south_neighbour_y_axis (chosen_cells[0][0]);
        south_neighbour_x_axis = this.get_north_and_south_neighbour_x_axis (chosen_cells[0][0]);

        if (this.check_if_submarine_ship_neigbhour_is_in_boundary (south_neighbour_y_axis,south_neighbour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [south_neighbour_y_axis, south_neighbour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }

        // East Neighbours
        for (let i = 0; i < cells_to_take; i++) {

            east_neighbour_x_axis = this.get_east_neighbour_x_axis (chosen_cells[0][i]);
            east_and_west_neighbour_y_axis = this.get_east_and_west_neighbour_y_axis (chosen_cells[0][i]);

            if (this.check_if_submarine_ship_neigbhour_is_in_boundary(east_and_west_neighbour_y_axis,east_neighbour_x_axis)) {

                if (!i) {
                    k ++;
                    chosen_cells[k] = [];
                }

                neigbhour_index = [east_and_west_neighbour_y_axis,east_neighbour_x_axis];
                chosen_cells[k].push (neigbhour_index);
            }
            else {
                break;
            }
        }

        // West Neighbours
        for (let i = 0; i < cells_to_take; i++) {

            west_neighbour_x_axis = this.get_west_neighbour_x_axis (chosen_cells[0][i]);
            east_and_west_neighbour_y_axis = this.get_east_and_west_neighbour_y_axis (chosen_cells[0][i]);

            if (this.check_if_submarine_ship_neigbhour_is_in_boundary(east_and_west_neighbour_y_axis,west_neighbour_x_axis)) {

                if (!i) {
                    k ++;
                    chosen_cells[k] = [];
                }

                neigbhour_index = [east_and_west_neighbour_y_axis,west_neighbour_x_axis];
                chosen_cells[k].push (neigbhour_index);
            }
            else {
                break;
            }
        }

        // North East Neighbour
        north_east_neigbhour_y_axis = north_neighbour_y_axis;
        north_east_neigbhour_x_axis = east_neighbour_x_axis;

        // North West Neighbour
        north_west_neigbhour_y_axis = north_neighbour_y_axis;
        north_west_neigbhour_x_axis = west_neighbour_x_axis;

        // South East Neighbour
        south_east_neigbhour_y_axis = south_neighbour_y_axis;
        south_east_neigbhour_x_axis = east_neighbour_x_axis;

        // South West Neighbour
        south_west_neigbhour_y_axis = south_neighbour_y_axis;
        south_west_neigbhour_x_axis = west_neighbour_x_axis;


        // North East Neighbours
        if (this.check_if_submarine_ship_neigbhour_is_in_boundary(north_east_neigbhour_y_axis,north_east_neigbhour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [north_east_neigbhour_y_axis,north_east_neigbhour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }

        // North West Neighbours
        if (this.check_if_submarine_ship_neigbhour_is_in_boundary(north_west_neigbhour_y_axis,north_west_neigbhour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [north_west_neigbhour_y_axis,north_west_neigbhour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }

        // South East Neighbours
        if (this.check_if_submarine_ship_neigbhour_is_in_boundary(south_east_neigbhour_y_axis,south_east_neigbhour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [south_east_neigbhour_y_axis,south_east_neigbhour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }
    
        // South West Neighbours 
        if (this.check_if_submarine_ship_neigbhour_is_in_boundary(south_west_neigbhour_y_axis,south_west_neigbhour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [south_west_neigbhour_y_axis,south_west_neigbhour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }

    }

    static add_ver_submarine_ship_coordinate (j,i,cells_to_take,chosen_cells) {

        chosen_cells[0] = [];
        let k = 0;

        while (k <= (cells_to_take/2)) {
            chosen_cells[0].push ([j + k, i],[j + (k + 1), i])
            k += 2;
        }
    }

    static invoke_for_checkup_of_submarine_on_ver_position (j,i,cells_to_take,game_board) {

        let k = 0;
        while (k <= (cells_to_take/2)) {

            const cell = game_board[j + k][i];

            const next_cell = (game_board[j+(k + 1)][i] == undefined) ? 2:game_board[j+(k + 1)][i];

            if (!this.check_if_submarine_ship_axis_are_valid(cell,next_cell)) {
                return false;
            }
            k += 2;
        }
        return true;
    }

    static set_sub_marine_ship_on_ver_up_position (game_board,cells_to_take) {
        
        const chosen_cells = [];

        // console.log("Vertical Up");
        // console.log(game_board);

        for (let i = 0; i < game_board.length; i++) {

            for (let j = 0; j <= (game_board[i].length - cells_to_take); j++) {

                const is_cell_valid = this.invoke_for_checkup_of_submarine_on_ver_position (j,i,cells_to_take,game_board);
                if (is_cell_valid) {
                    this.add_ver_submarine_ship_coordinate (j,i,cells_to_take,chosen_cells);
                    this.set_sub_marine_ship_neighbour_on_ver_position (chosen_cells,cells_to_take);
                    return chosen_cells;
                }
            }
        }
        return chosen_cells;
    }
    
    static set_sub_marine_ship_on_ver_down_position (game_board,cells_to_take) {

        const chosen_cells = [];

        // console.log("Vertical Down");
        // console.log(game_board);

        for (let i = game_board.length - 1; i >= 0; i--) {

            for (let j = game_board[i].length - cells_to_take; j >= 0; j --) {

                const is_cell_valid = this.invoke_for_checkup_of_submarine_on_ver_position (j,i,cells_to_take,game_board);
                if (is_cell_valid) {
                    this.add_ver_submarine_ship_coordinate (j,i,cells_to_take,chosen_cells);
                    this.set_sub_marine_ship_neighbour_on_ver_position (chosen_cells,cells_to_take);
                    return chosen_cells;
                }
            }
        }
        return chosen_cells;
    }

    static add_hor_submarine_ship_coordinate (i,j,cells_to_take,chosen_cells) {

        chosen_cells[0] = [];
        let k = 0;

        while (k <= (cells_to_take/2)) {
            chosen_cells[0].push ([i, j + k],[i, j + (k + 1)])
            k += 2;
        }
    }

    static invoke_for_checkup_of_submarine_on_hor_position (i,j,cells_to_take,game_board) {
        
        let k = 0;
        while (k <= (cells_to_take/2)) {

            const cell = game_board[i][j + k];
            const next_cell = (game_board[i][j+(k + 1)] == undefined) ? 2:game_board[i][j+(k + 1)];

            if (!this.check_if_submarine_ship_axis_are_valid(cell,next_cell)) {
                return false;
            }
            k += 2;
        }
        return true;
    }




    static set_sub_marine_ship_neighbour_on_hor_position (chosen_cells,cells_to_take) {
        
        const north_neighbours_y_axis = [];
        let neigbhour_index,north_neighbour_y_axis,north_neighbour_x_axis,south_neighbour_y_axis,south_neighbour_x_axis;
        let east_neighbour_x_axis,east_and_west_neighbour_y_axis,west_neighbour_x_axis;
        let north_east_neigbhour_x_axis,north_east_neigbhour_y_axis,north_west_neigbhour_x_axis,north_west_neigbhour_y_axis;
        let south_east_neigbhour_x_axis,south_east_neigbhour_y_axis,south_west_neigbhour_x_axis,south_west_neigbhour_y_axis;

        let i = 0;
        let k = 0;

        // North neighbour
        for (i = 0; i < cells_to_take; i++) {
            north_neighbour_y_axis = this.get_north_neighbour_y_axis (chosen_cells[0][i]);
            north_neighbour_x_axis = this.get_north_and_south_neighbour_x_axis (chosen_cells[0][i]);

            if (this.check_if_submarine_ship_neigbhour_is_in_boundary (north_neighbour_y_axis,north_neighbour_x_axis)) {
                
                if (!i) {
                    k ++;
                    chosen_cells[k] = [];
                }

                neigbhour_index = [north_neighbour_y_axis,north_neighbour_x_axis];
                chosen_cells[k].push (neigbhour_index);
            }
            else {
                break;
            }
        }

        // South Neighbours 
        for (i = 0; i < cells_to_take; i++) {
            south_neighbour_y_axis = this.get_south_neighbour_y_axis (chosen_cells[0][i]);
            south_neighbour_x_axis = this.get_north_and_south_neighbour_x_axis (chosen_cells[0][i]);

            if (this.check_if_submarine_ship_neigbhour_is_in_boundary (south_neighbour_y_axis,south_neighbour_x_axis)) {

                if (!i) {
                    k ++;
                    chosen_cells[k] = [];
                }

                neigbhour_index = [south_neighbour_y_axis, south_neighbour_x_axis];
                chosen_cells[k].push (neigbhour_index);
            }
        }

        // East and West Neighbours
        east_neighbour_x_axis = this.get_east_neighbour_x_axis (chosen_cells[0][chosen_cells[0].length - 1]);
        west_neighbour_x_axis = this.get_west_neighbour_x_axis (chosen_cells[0][0]);
        east_and_west_neighbour_y_axis = this.get_east_and_west_neighbour_y_axis (chosen_cells[0][chosen_cells[0].length - 1]);

        // North East Neighbour
        north_east_neigbhour_y_axis = north_neighbour_y_axis;
        north_east_neigbhour_x_axis = east_neighbour_x_axis;

        // North West Neighbour
        north_west_neigbhour_y_axis = north_neighbour_y_axis;
        north_west_neigbhour_x_axis = west_neighbour_x_axis;

        // South East Neighbour
        south_east_neigbhour_y_axis = south_neighbour_y_axis;
        south_east_neigbhour_x_axis = east_neighbour_x_axis;

        // South West Neighbour
        south_west_neigbhour_y_axis = south_neighbour_y_axis;
        south_west_neigbhour_x_axis = west_neighbour_x_axis;

        // East Neighbours
        if (this.check_if_submarine_ship_neigbhour_is_in_boundary(east_and_west_neighbour_y_axis,east_neighbour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [east_and_west_neighbour_y_axis,east_neighbour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }

        // West Neighbours
        if (this.check_if_submarine_ship_neigbhour_is_in_boundary(east_and_west_neighbour_y_axis,west_neighbour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [east_and_west_neighbour_y_axis,west_neighbour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }

        // North East Neighbours
        if (this.check_if_submarine_ship_neigbhour_is_in_boundary(north_east_neigbhour_y_axis,north_east_neigbhour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [north_east_neigbhour_y_axis,north_east_neigbhour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }

        // North West Neighbours
        if (this.check_if_submarine_ship_neigbhour_is_in_boundary(north_west_neigbhour_y_axis,north_west_neigbhour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [north_west_neigbhour_y_axis,north_west_neigbhour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }

        // South East Neighbours
        if (this.check_if_submarine_ship_neigbhour_is_in_boundary(south_east_neigbhour_y_axis,south_east_neigbhour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [south_east_neigbhour_y_axis,south_east_neigbhour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }
    
        // South West Neighbours
        if (this.check_if_submarine_ship_neigbhour_is_in_boundary(south_west_neigbhour_y_axis,south_west_neigbhour_x_axis)) {
            k ++;
            chosen_cells[k] = [];
            neigbhour_index = [south_west_neigbhour_y_axis,south_west_neigbhour_x_axis];
            chosen_cells[k].push (neigbhour_index);
        }
    }



    static set_sub_marine_ship_on_hor_down_position (game_board,cells_to_take) {

        const chosen_cells = [];

        // console.log("Horizantal Down");
        // console.log(game_board);

        for (let i = game_board.length - 1; i >= 0; i--) {

            for (let j = game_board[i].length - 1; j >= 0; j--) {

                const is_cell_valid = this.invoke_for_checkup_of_submarine_on_hor_position(i,j,cells_to_take,game_board);
                if (is_cell_valid) {
                    this.add_hor_submarine_ship_coordinate (i,j,cells_to_take,chosen_cells);
                    this.set_sub_marine_ship_neighbour_on_hor_position (chosen_cells,cells_to_take);
                    return chosen_cells;
                }
            }
        }
        return chosen_cells;
    }

    


    static set_sub_marine_ship_on_hor_up_position (game_board,cells_to_take) {

        const chosen_cells = [];

        // console.log("Horizantal Up");
        // console.log(game_board);

        for (let i = 0; i < game_board.length; i++) {

            for (let j = 0; j < game_board[i].length; j++) {
                
                const is_cell_valid = this.invoke_for_checkup_of_submarine_on_hor_position(i,j,cells_to_take,game_board);
                if (is_cell_valid) {
                    this.add_hor_submarine_ship_coordinate (i,j,cells_to_take,chosen_cells);
                    this.set_sub_marine_ship_neighbour_on_hor_position (chosen_cells,cells_to_take);
                    return chosen_cells;
                }
            }
        }
        return chosen_cells;
    }



    static make_random_choice (user_player_gameboard,cells_to_take) {

        let i = 0;
        let sub_marine_ship_coordinate;

        while (true /*i < 1*/) {
            let vertical_or_horizantal = Math.floor(Math.random() * this.free_dimension_to_place_ship_ver_hor.length); 
            let up_or_down =  Math.floor(Math.random() * this.free_dimension_to_place_ship_up_down.length);

            // let vertical_or_horizantal = 0;
            // let up_or_down = 1;

            if (this.free_dimension_to_place_ship_ver_hor[vertical_or_horizantal] == "Horizantal" &&
                this.free_dimension_to_place_ship_up_down[up_or_down] == "Up")
            {
                sub_marine_ship_coordinate = this.set_sub_marine_ship_on_hor_up_position (user_player_gameboard,cells_to_take);
            }

            if (this.free_dimension_to_place_ship_ver_hor[vertical_or_horizantal] == "Horizantal" &&
                this.free_dimension_to_place_ship_up_down[up_or_down] == "Down")
            {
                sub_marine_ship_coordinate = this.set_sub_marine_ship_on_hor_down_position (user_player_gameboard,cells_to_take);
            }

            if (this.free_dimension_to_place_ship_ver_hor[vertical_or_horizantal] == "Vertical" &&
                this.free_dimension_to_place_ship_up_down[up_or_down] == "Up")
            {
                sub_marine_ship_coordinate = this.set_sub_marine_ship_on_ver_up_position (user_player_gameboard,cells_to_take);
            }

            if (this.free_dimension_to_place_ship_ver_hor[vertical_or_horizantal] == "Vertical" &&
                this.free_dimension_to_place_ship_up_down[up_or_down] == "Down")
            {
                sub_marine_ship_coordinate = this.set_sub_marine_ship_on_ver_down_position (user_player_gameboard,cells_to_take);
            }

            // i ++;
            
            if (sub_marine_ship_coordinate) {
                break;
            }
            else {
                console.log("Removed: ",this.free_dimension_to_place_ship_ver_hor[vertical_or_horizantal]," in vertical or horizantal array");
                this.free_dimension_to_place_ship_ver_hor.splice(vertical_or_horizantal,1);
            }
            

        }

        return sub_marine_ship_coordinate;
    }

    static set_sub_marine_ships_controller (user_player_gameboard,cells_to_take) {
        const sub_marine_ship_coordinate = this.make_random_choice (user_player_gameboard,cells_to_take);
        return sub_marine_ship_coordinate;
    }

    static attack_ships_neigbhour_index_delete (neigbhour_index) {
        if (neigbhour_index !== -1) {
            this.available_coordinates_on_player_board.splice (neigbhour_index,1);
        }
    }

    static get_neigbhours_index_for_attack_ships (coordinate) {

        let k = 0, index;
        
        for (let i = 0; i < this.available_coordinates_on_player_board.length; i++) {
            
            if (coordinate[0] == this.available_coordinates_on_player_board[i][0] &&
                coordinate[1] == this.available_coordinates_on_player_board[i][1])
            {
                index = k;
                return index;
            }
            k ++;            
        }

        return -1;
    }

    static construct_attack_ships_boundaries (ship_and_neighbours_coordinate,x_axis,y_axis) {

        const coordinate = [y_axis,x_axis];
        const neigbhour_index = this.get_neigbhours_index_for_attack_ships(coordinate);
        ship_and_neighbours_coordinate.push (coordinate);
        this.attack_ships_neigbhour_index_delete (neigbhour_index);

    }

    static check_if_neigbhour_axis_are_valid (ship_and_neighbours_coordinate,x_axis,y_axis) {
    
        if (x_axis >= 0 && x_axis < 10 && 
            y_axis >= 0 && y_axis < 10)
        {
            this.construct_attack_ships_boundaries (ship_and_neighbours_coordinate,x_axis,y_axis);
        }

    }

    static filter_available_coordinates_array (randomIndex) {

        const ship_coordinate = this.available_coordinates_on_player_board[randomIndex];
        const ship_and_neighbours_coordinate = [];
        
        const north_neighbour_y_axis = this.get_north_neighbour_y_axis (ship_coordinate);
        const south_neighbour_y_axis =  this.get_south_neighbour_y_axis (ship_coordinate);
        const north_and_south_neighbour_x_axis = this.get_north_and_south_neighbour_x_axis (ship_coordinate);

        const east_neighbour_x_axis = this.get_east_neighbour_x_axis (ship_coordinate);
        const west_neighbour_x_axis = this.get_west_neighbour_x_axis (ship_coordinate);
        const east_west_neighbour_y_axis = this.get_east_and_west_neighbour_y_axis (ship_coordinate);

        const north_west_x_axis = west_neighbour_x_axis;
        const north_west_y_axis = north_neighbour_y_axis;

        const north_east_x_axis = east_neighbour_x_axis;
        const north_east_y_axis = north_neighbour_y_axis;

        const south_west_x_axis = west_neighbour_x_axis;
        const south_west_y_axis = south_neighbour_y_axis;

        const south_east_x_axis = east_neighbour_x_axis;
        const south_east_y_axis = south_neighbour_y_axis;

        ship_and_neighbours_coordinate.push (ship_coordinate);

        this.available_coordinates_on_player_board.splice(randomIndex,1);


        this.check_if_neigbhour_axis_are_valid (ship_and_neighbours_coordinate, north_and_south_neighbour_x_axis, north_neighbour_y_axis);
        this.check_if_neigbhour_axis_are_valid (ship_and_neighbours_coordinate, north_and_south_neighbour_x_axis, south_neighbour_y_axis);
        this.check_if_neigbhour_axis_are_valid (ship_and_neighbours_coordinate, east_neighbour_x_axis, east_west_neighbour_y_axis);
        this.check_if_neigbhour_axis_are_valid (ship_and_neighbours_coordinate, west_neighbour_x_axis, east_west_neighbour_y_axis);
        this.check_if_neigbhour_axis_are_valid (ship_and_neighbours_coordinate,north_west_x_axis,north_west_y_axis);
        this.check_if_neigbhour_axis_are_valid (ship_and_neighbours_coordinate,north_east_x_axis,north_east_y_axis);
        this.check_if_neigbhour_axis_are_valid (ship_and_neighbours_coordinate,south_west_x_axis,south_west_y_axis);
        this.check_if_neigbhour_axis_are_valid (ship_and_neighbours_coordinate,south_east_x_axis,south_east_y_axis);

        return ship_and_neighbours_coordinate;
    }

    static coordinate_the_available_space_to_ship (player,ship_length) {

        let ship_and_neighbours_coordinate,ship_coordinate_key;

        switch (ship_length) {
            case 1:
                const randomIndex = Math.floor (Math.random() * this.available_coordinates_on_player_board.length);
                ship_and_neighbours_coordinate = this.filter_available_coordinates_array (randomIndex);
                ship_coordinate_key = this.generate_ship_coordinate_key (ship_and_neighbours_coordinate[0]);
                Gameboard.gameboard_attacker_ships_setup (player, ship_coordinate_key, ship_and_neighbours_coordinate);
            break;

            case 2:
                ship_and_neighbours_coordinate = this.set_sub_marine_ships_controller(player.game_board,2);
                ship_coordinate_key = this.generate_submarine_ships_coordinate_key (ship_and_neighbours_coordinate[0]);
                if (ship_coordinate_key) {
                    Gameboard.gameboard_submarine_ships_setup (player, ship_coordinate_key, ship_and_neighbours_coordinate);
                }
            break;
            case 4: 
                ship_and_neighbours_coordinate = this.set_sub_marine_ships_controller(player.game_board,4);
                ship_coordinate_key = this.generate_submarine_ships_coordinate_key (ship_and_neighbours_coordinate[0]);
                if (ship_coordinate_key) {
                    Gameboard.gameboard_submarine_ships_setup (player, ship_coordinate_key, ship_and_neighbours_coordinate);
                };
            break;
        }
    }

    static set_ship_on_player_game_board_controller (player,ship_length,number_of_ship) {
        for (let i = 0; i < number_of_ship; i++) {
            this.coordinate_the_available_space_to_ship (player,ship_length);
        }
    }

    static game_level (the_level = "Medium") {
        Gameplaying.winner = true;
        Gameplaying.restart_the_champion ();
        this.main(the_level);
    }

    static global_variables_fixer () {

        const game_board_rows_cls = 10;
        let k = 0;

        for (let i = 0; i < game_board_rows_cls; i++) {
            for (let j = 0; j < game_board_rows_cls; j++) {
                const a_coordinate = [i,j];
                this.available_coordinates_on_player_board[k] = a_coordinate;
                k ++;
            }
        }

        this.free_dimension_to_place_ship_ver_hor = ["Vertical","Horizantal"];
        this.free_dimension_to_place_ship_up_down = ["Up","Down"];

    }

    static main (level ="Medium") {

        DOM.load_gameboards();

        const ship_length_and_quantity = [
            {
                ["1"]: 4
            },
            {
                ["2"]: 3
            },
            {
                ["4"]: 3
            } 
        ];
        const players = [user,computer];

        let i;
        for (i = 0; i <  players.length; i++) {
            
            players[i].setPlayerGameboard();

            this.global_variables_fixer();

            for (let j = 0; j < ship_length_and_quantity.length; j++) {

                const ship_length = Object.keys(ship_length_and_quantity[j]);
                const number_of_ship = Object.values(ship_length_and_quantity[j]);
                this.set_ship_on_player_game_board_controller (players[i],Number(ship_length[0]),number_of_ship[0]);
            }
        }
        Gameplaying.startGame(players,level);
    }
}

window.gamesetup = Gamesetup;

export { Gamesetup };