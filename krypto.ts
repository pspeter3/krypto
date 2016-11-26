const INPUTS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "target",
]

const DECK = [
    1, 1, 1,
    2, 2, 2,
    3, 3, 3,
    4, 4, 4,
    5, 5, 5,
    6, 6, 6,
    7, 7, 7, 7,
    8, 8, 8, 8,
    9, 9, 9, 9,
    10, 10, 10, 10,
    11, 11,
    12, 12,
    13, 13,
    14, 14,
    15, 15,
    16, 16,
    17, 17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
]

const shuffle = () => {
    for (let counter = DECK.length; counter; counter--) {
        let swap = Math.floor(Math.random() * counter);
        [DECK[counter - 1], DECK[swap]] = [DECK[swap], DECK[counter - 1]]
    }
}

const reset = (evt?: Event) => {
    shuffle()
    INPUTS.forEach((name, index) => {
        const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement
        input.value = DECK[index].toString(10)
    })
    if (evt) {
        evt.preventDefault()
    }
}

document.querySelector("form").addEventListener("reset", reset)
reset()
