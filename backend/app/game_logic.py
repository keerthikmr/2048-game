import random
from typing import List, Tuple

# Move left and reuse logic. Moving left as we're left indexing. 
def move_tiles(row: List[int]) -> List[int]:
    zero_removed = [num for num in row if num != 0]
    moved = []
    skip = False

    for i in range(len(zero_removed)):
        if skip:
            skip = False # Disregard next index if we just merged
            continue
        if i + 1 < len(zero_removed) and zero_removed[i] == zero_removed[i + 1]:
            moved.append(zero_removed[i] * 2)
            skip = True
        else:
            moved.append(zero_removed[i])

    return moved + [0] * (len(row) - len(moved)) # Fill the rest with zeros

def rotate_board(board: List[List[int]]) -> List[List[int]]:
    return [list(row) for row in zip(*board[::-1])]

def process_move(game_id: str, board: List[List[int]], direction: str) -> Tuple[List[List[int]], bool]:
    size = len(board)
    valid_move = False

    if direction == "up":
        board = rotate_board(rotate_board(rotate_board(board)))
    elif direction == "down":
        board = rotate_board(board)
    elif direction == "right":
        board = [row[::-1] for row in board]

    new_board = [move_tiles(row) for row in board]
    
    if new_board != board:
        valid_move = True
    
    if direction == "up":
        new_board = rotate_board(new_board)
    elif direction == "down":
        new_board = rotate_board(rotate_board(rotate_board(new_board)))
    elif direction == "right":
        new_board = [row[::-1] for row in new_board]

    if valid_move:
        add_random_tile(new_board)

    return new_board, valid_move

def add_random_tile(board: List[List[int]]) -> None:
    empty_tiles = [(row, column) for row in range(len(board)) for column in range(len(board[row])) if board[row][column] == 0]
    if empty_tiles:
        row, column = random.choice(empty_tiles)
        board[row][column] = 2 if random.random() < 0.9 else 4
    
def create_initial_board(size: int) -> List[List[int]]:
    board = [[0] * size for _ in range(size)]
    add_random_tile(board)
    add_random_tile(board)
    return board

def is_game_over(board: List[List[int]]) -> bool:
    size = len(board)

    for row in board:
        if 0 in row:
            return False

    # Check for mergeable tiles
    for row in range(size):
        for col in range(size):
            if col + 1 < size and board[row][col] == board[row][col + 1]:
                return False
            if row + 1 < size and board[row][col] == board[row + 1][col]:
                return False

    return True

def is_game_won(board: List[List[int]]) -> bool:
    for row in board:
        if 2048 in row:
            return True
    return False