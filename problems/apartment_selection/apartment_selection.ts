export interface Block {
  gym: boolean;
  school: boolean;
  store: boolean;
}

export type Requirement = keyof Block;

export function apartmentSelection(
  blocks: Block[],
  requirements: Requirement[]
): number {
  const n = blocks.length;
  const m = requirements.length;

  if (n === 0) {
    throw new Error('Empty block list');
  }

  if (n === 1 || m === 0) {
    return 0;
  }

  const blockReqDist = [...Array(n)].map(() => new Array(m).fill(Infinity));

  let minBlock = 0;
  let minBlockDist = Infinity;

  {
    const block = blocks[0];

    let blockDist = 0;
    for (let r = 0; r < m; r++) {
      const req = requirements[r];

      if (block[req]) {
        blockReqDist[0][r] = 0;
      }

      blockDist = Math.max(blockDist, blockReqDist[0][r]);
    }

    minBlockDist = blockDist;
  }

  for (let b = 1; b < n; b++) {
    const block = blocks[b];

    let blockDist = 0;
    for (let r = 0; r < m; r++) {
      const req = requirements[r];

      if (block[req]) {
        blockReqDist[b][r] = 0;
      } else {
        blockReqDist[b][r] = blockReqDist[b - 1][r] + 1;
      }

      blockDist = Math.max(blockDist, blockReqDist[b][r]);
    }

    if (blockDist < minBlockDist) {
      minBlockDist = blockDist;
      minBlock = b;
    }
  }

  for (let b = n - 2; b >= 0; b--) {
    const block = blocks[b];

    let blockDist = 0;
    for (let r = 0; r < m; r++) {
      const req = requirements[r];

      if (!block[req]) {
        blockReqDist[b][r] = Math.min(blockReqDist[b][r], blockReqDist[b + 1][r] + 1);
      }

      blockDist = Math.max(blockDist, blockReqDist[b][r]);
    }

    if (blockDist < minBlockDist) {
      minBlockDist = blockDist;
      minBlock = b;
    }
  }

  return minBlock;
}
