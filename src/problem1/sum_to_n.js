const sumToNByFormula = (n) => (n * (n + 1)) / 2

const sumToNByLoop = (n) => {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

const sumToNByRecursion = (n) => {
    if (n === 0) return 0

    return n + sumToNByRecursion(n - 1);
}

console.log({
    sumToNByFormula: sumToNByFormula(5),
    sumToNByLoop: sumToNByLoop(5),
    sumToNByRecursion: sumToNByRecursion(5)
})