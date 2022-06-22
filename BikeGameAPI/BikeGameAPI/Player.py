from enum import Enum
from typing import List, Tuple
from BikeGame.Deck import SprinterDeck, RoulerDeck, Card, CardTypes

import random


class PlayerColors(Enum):
    RED = 1
    BLUE = 2
    GREEN = 3
    BLACK = 4
    WHITE = 5
    PINK = 6


class PlayerHand:
    def __init__(self, sprinters, roulers):
        self.sprinters = sprinters
        self.roulers = roulers

    def __str__(self) -> str:
        sprinter_str = ", ".join([str(c) for c in self.sprinters])
        roulers_str = ", ".join([str(c) for c in self.roulers])
        return f"Sprinters: {sprinter_str} || Roulers: {roulers_str}"

    def _choose_random(self):
        sprinter = self.sprinters[random.randint(0, len(self.sprinters) - 1)]
        rouler = self.roulers[random.randint(0, len(self.sprinters) - 1)]
        return sprinter, rouler

    def _find_element(self, l: List[Card], e: Card):
        try:
            return l.pop(l.index(e))
        except ValueError:
            raise ValueError(
                f"Player does not have {e} in hand. Available cards are: {l}"
            )

    def play(self, sprinter, rouler) -> Tuple[Card, Card]:
        sprinter = self._find_element(self.sprinters, sprinter)
        rouler = self._find_element(self.roulers, rouler)
        return sprinter, rouler


class PlayerDeck:
    def __init__(self, player):
        self.sprinter_deck: SprinterDeck = SprinterDeck(player)
        self.rouler_deck: RoulerDeck = RoulerDeck(player)

    def __str__(self) -> str:
        return f"PlayerDeck(sprinter={len(self.sprinter_deck.deck)}/{len(self.sprinter_deck.discard)} || rouler={len(self.rouler_deck)}/{len(self.rouler_deck.discard)})"

    def draw(self) -> PlayerHand:
        sprinters = self.sprinter_deck.draw()
        roulers = self.rouler_deck.draw()
        return PlayerHand(sprinters, roulers)

    def discard_hand(self, hand: PlayerHand) -> None:
        self.sprinter_deck.discard_cards(hand.sprinters)
        self.rouler_deck.discard_cards(hand.roulers)


class Player:
    def __init__(self, color: PlayerColors) -> None:
        self._player_number = color.name
        self._deck = PlayerDeck(self)
        self._hand = None
        self._round = 0

    def __str__(self) -> str:
        return f"Player({self._player_number}, round={self.round})"

    def __repr__(self) -> str:
        return self.__str__()

    def draw(self) -> PlayerHand:
        self._hand = self._deck.draw()
        return self._hand

    def play(self, sprinter: Card, rouler: Card) -> None:
        played_sprinter, played_rouler = self._hand.play(sprinter, rouler)
        self._deck.discard_hand(self._hand)
        self._round += 1
        return played_sprinter, played_rouler

    @property
    def deck(self) -> PlayerDeck:
        return self._deck

    @property
    def hand(self) -> list:
        if self._hand is None:
            print(f"Player {self._player_number} has no hand. Use player.draw().")
        return self._hand
