from typing import Optional
from BikeGameAPI.Player import Player, PlayerColors


def play_hand(player: Player, hand_no: Optional[int] = None) -> None:
    hand = player.draw()
    print(f"{hand_no}: We drew {hand}")
    sprinter, rouler = hand._choose_random()
    print(f"{hand_no}: We chose {sprinter} and {rouler}")
    played_sprinter, played_rouler = player.play(sprinter, rouler)
    print(f"{hand_no}: We played {played_sprinter} and {played_rouler}")
    print(f"{hand_no}: {player.deck}")
    print("_" * 80)


if __name__ == "__main__":
    d1 = Player(PlayerColors.RED)
    d2 = Player(PlayerColors.PINK)

    for i in range(20):
        play_hand(d1, i)
