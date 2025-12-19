/**
 * Generate random number between min and max
 */
export function randomRange(min, max) {
    return Math.random() * (max - min) + min
}

/**
 * Convert degrees to radians
 */
export function degToRad(degrees) {
    return degrees * (Math.PI / 180)
}

/**
 * Lerp between two values
 */
export function lerp(start, end, t) {
    return start * (1 - t) + end * t
}

/**
 *
 * @returns fasta files
 */

export default async function readFastaFile(filePath="/norovirus.fasta") {
  try {
    // Fetch the file from the public directory
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Read the file as text
    const text = await response.text();

    // Split into lines and filter out empty lines
    const lines = text.split('\n').filter(line => line.trim() !== '');

    const sequences = [];
    let currentSequence = null;

    for (const line of lines) {
      if (line.startsWith('>')) {
        // Save the previous sequence if it exists
        if (currentSequence) {
          sequences.push(currentSequence);
        }
        // New sequence object
        currentSequence = {
          name: line.substring(1).trim(), // Drop leading '>' and trim whitespace
          seq: []
        };
      } else {
        // Spread add to the current sequence
        if (currentSequence) {
          currentSequence.seq.push(...line.trim().split(''));
        }
      }
    }

    // Last sequence
    if (currentSequence) {
      sequences.push(currentSequence);
    }

    if (sequences.length === 0) {
      throw new Error('No FASTA sequences found in file');
    }

    return sequences;
  } catch (error) {
    console.error('Error reading FASTA file:', error);
    throw error;
  }
}