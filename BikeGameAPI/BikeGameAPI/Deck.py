from enum import Enum
from typing import List
import random


class CardTypes(Enum):
    SPRINTER = 1
    ROULER = 2
    PENALTY = 3


class Card:
    def __init__(self, type: CardTypes, value: int) -> None:
        self.type = type
        self.value = value

    def __str__(self) -> str:
        return f"Card({self.type.name}, {self.value})"

    def __repr__(self) -> str:
        return self.__str__()


class Deck:
    def __init__(self, player) -> None:
        self.player = player
        self.deck = []
        self.discard = []

    def __len__(self) -> int:
        return len(self.deck)

    def __str__(self) -> str:
        return f"Deck({str(self.player)})"

    def __repr__(self) -> str:
        return self.__str__()

    def draw(self) -> None:
        if len(self.deck) == 0 and len(self.discard) == 0:
            return [Card(CardTypes.PENALTY, 2)]

        if len(self.deck) == 0:
            self.deck = self.discard
            self.discard = []

        if len(self.deck) < 4:
            return [self.deck.pop() for _ in range(len(self.deck))]

        hand = []

        for _ in range(4):
            n_cards_in_deck = len(self.deck)
            idx = random.randint(0, n_cards_in_deck - 1)
            try:
                hand.append(self.deck.pop(idx))
            except IndexError:
                break

        return hand

    def discard_cards(self, cards: List[Card]) -> None:
        self.discard.extend(cards)


class SprinterDeck(Deck):
    def __init__(self, player) -> None:
        super().__init__(player)
        self.deck = [
            *[Card(CardTypes.SPRINTER, 2) for _ in range(3)],
            *[Card(CardTypes.SPRINTER, 3) for _ in range(3)],
            *[Card(CardTypes.SPRINTER, 4) for _ in range(3)],
            *[Card(CardTypes.SPRINTER, 5) for _ in range(3)],
            *[Card(CardTypes.SPRINTER, 9) for _ in range(3)],
        ]

    def __str__(self) -> str:
        return f"SprinterDeck({str(self.player)}, {len(self.deck)})"


class RoulerDeck(Deck):
    def __init__(self, player) -> None:
        super().__init__(player)
        self.deck = [
            *[Card(CardTypes.ROULER, 3) for _ in range(3)],
            *[Card(CardTypes.ROULER, 4) for _ in range(3)],
            *[Card(CardTypes.ROULER, 5) for _ in range(3)],
            *[Card(CardTypes.ROULER, 6) for _ in range(3)],
            *[Card(CardTypes.ROULER, 7) for _ in range(3)],
        ]

    def __str__(self) -> str:
        return f"RoulerDeck({str(self.player)}, {len(self.deck)})"
