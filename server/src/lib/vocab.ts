// vocabulary.ts

export const UNK_ID = 666;
export const UNK_TOKEN = '<UNK>';

/**
 * Generates a deterministic token ID from an ASCII code.
 * Uses input parity to create either 2-digit or 4-digit IDs (for variety).
 * @param asciiCode - The ASCII code of the character (e.g., 97 for 'a')
 * @returns A deterministic token ID (either 2-digit or 4-digit)
 */
export const generateTokenId = (asciiCode: number): number => {
    const isFourDigits = (asciiCode % 2) === 0;

    if (isFourDigits) {
        return (asciiCode % 9000) + 1000; // 1000–9999
    } else {
        return (asciiCode % 90) + 10;     // 10–99
    }
};

/**
 * Creates a mapping from token IDs to characters (ID → char).
 * Used for decoding.
 * @returns Map<number, string> - token ID → character
 */
export const createVocabularyIdToToken = (): Map<number, string> => {
    const vocab = new Map<number, string>();

    // Printable ASCII: 32 (space) to 126 (~)
    for (let i = 32; i <= 126; i++) {
        const tokenId = generateTokenId(i);
        const char = String.fromCharCode(i);
        vocab.set(tokenId, char);
    }

    // Special token for unknowns
    vocab.set(UNK_ID, UNK_TOKEN);

    return vocab;
};

/**
 * Creates a mapping from characters to token IDs (char → ID).
 * Used for encoding.
 * @returns Map<string, number> - character → token ID
 */
export const createVocabularyTokenToId = (): Map<string, number> => {
    const idToToken = createVocabularyIdToToken();
    const tokenToId = new Map<string, number>();

    for (const [tokenId, char] of idToToken) {
        if (!tokenToId.has(char)) {
            tokenToId.set(char, tokenId);
        }
    }

    return tokenToId;
};