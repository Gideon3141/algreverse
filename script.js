function invertMove(move) {
    const raw = String(move || "").trim();
    if (!raw) return "";

    // Keep grouping punctuation separate when users type them in.
    const clean = raw.replace(/^[\(\[]+|[\)\]]+$/g, "");
    if (!clean) return raw;

    let body = clean;
    let suffix = "";

    if (body.endsWith("2'")) {
        suffix = "2'";
        body = body.slice(0, -2);
    } else if (body.endsWith("'")) {
        suffix = "'";
        body = body.slice(0, -1);
    } else if (body.endsWith("2")) {
        suffix = "2";
        body = body.slice(0, -1);
    }

    // 180-degree turns are their own inverse, while primes flip the direction.
    let inverseSuffix = "";
    if (suffix === "" || suffix === "'") {
        inverseSuffix = suffix === "'" ? "" : "'";
    } else {
        inverseSuffix = "2";
    }

    return `${body}${inverseSuffix}`;
}

function reverseAlgorithm(alg) {
    if (!alg || !alg.trim()) return "";

    // Split on whitespace while also tolerating common punctuation like commas
    // and simple grouping syntax. This keeps wide/slice moves like Rw, M, x, y,
    // and layer counts like 3Rw supported without breaking on punctuation.
    const tokens = alg
        .replace(/[(),]/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    return tokens
        .slice()
        .reverse()
        .map(invertMove)
        .join(" ");
}

function handleReverse() {
    const input = document.getElementById("algInput").value;
    const outputField = document.getElementById("algOutput");

    outputField.value = reverseAlgorithm(input);
}
