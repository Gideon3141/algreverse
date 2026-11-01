function invertMove(move) {
    if (move.endsWith("'")) {
        return move.slice(0, -1); // Remove prime (e.g., R' -> R)
    } else if (move.endsWith("2")) {
        return move; // 180 turns are their own inverse (e.g., R2 -> R2)
    } else if (move.endsWith("2'")) {
        return move.slice(0, -1); // R2' -> R2
    } else {
        return move + "'"; // Add prime to standard moves (e.g., R -> R')
    }
}

function reverseAlgorithm(alg) {
    if (!alg.trim()) return "";
    
    // Split by spaces, reverse the array, invert each move, and rejoin
    return alg.trim()
        .split(/\s+/)
        .reverse()
        .map(invertMove)
        .join(" ");
}

function handleReverse() {
    const input = document.getElementById("algInput").value;
    const outputField = document.getElementById("algOutput");
    
    outputField.value = reverseAlgorithm(input);
}
