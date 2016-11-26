interface State {
    hand: number[]
    path: string[]
}

interface Operation {
    (left: number, right: number): number | null
}

interface Graph {
    [key: string]: Graph
}

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

const OPERATIONS: { [key: string]: Operation } = {
    "+": (left, right) => left + right,
    "*": (left, right) => left * right,
    "-": (left, right) => left - right > 0 ? left - right : null,
    "/": (left, right) => left % right === 0 ? left / right : null,
}

const INPUTS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "target",
].map(name => document.querySelector(`input[name="${name}"]`) as HTMLInputElement)

const shuffle = () => {
    for (let counter = DECK.length; counter; counter--) {
        let swap = Math.floor(Math.random() * counter);
        [DECK[counter - 1], DECK[swap]] = [DECK[swap], DECK[counter - 1]]
    }
}

const reset = (evt?: Event) => {
    shuffle()
    INPUTS.forEach((input, index) => {
        input.value = DECK[index].toString(10)
    })
    if (evt) {
        evt.preventDefault()
    }
    solve()
}

const annotate = (graph: Graph, node: string): Graph => {
    if (!graph[node]) {
        graph[node] = {}
    }
    return graph[node]
}

const traverse = (state: State): State[] => {
    const states: State[] = []
    const hand = state.hand
    const path = state.path
    for (let i = hand.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            let nextHand = hand.filter((_, index) => index !== i && index != j)
            let left = hand[i]
            let right = hand[j]
            if (right > left) {
                [left, right] = [right, left]
            }
            Object.keys(OPERATIONS).forEach((op) => {
                const result = OPERATIONS[op](left, right)
                if (result !== null) {
                    states.push({
                        hand: nextHand.concat([result]),
                        path: path.concat([`${left}${op}${right}`])
                    })
                }
            })
        }
    }
    return states
}

const solve = () => {
    const hand = INPUTS.map(input => parseInt(input.value, 10))
    const target = hand.pop()
    const states: State[] = [{ hand: hand, path: [] }]
    const graph: Graph = {}
    let current = states.shift()
    while (current !== undefined) {
        if (current.hand.length === 1) {
            if (current.hand[0] === target) {
                current.path.reduce(annotate, graph)
            }
        } else {
            states.push.apply(states, traverse(current))
        }
        current = states.shift()
    }
    document.querySelector("pre").textContent = JSON.stringify(graph, undefined, 4)
        .replace(/[\{\}:,"]/g, "")
}

const form = document.querySelector("form")
form.addEventListener("change", solve)
form.addEventListener("reset", reset)
reset()
