def compute_reward(rank: int) -> int:
    if rank == 1:
        return 10
    if rank == 2:
        return 5
    return -5
