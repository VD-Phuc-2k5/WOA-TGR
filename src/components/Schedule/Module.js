import { MinHeap } from "./MinHeap";

export function totalTrash(loadM) {
  return loadM.reduce((total, curr) => total + curr);
}

export function randomVertices(disM, vIdx, k) {
  const adjV = [];
  // Lay danh sach dinh ke
  for (let i = 0; i < disM[vIdx].length; i++) {
    if (disM[vIdx][i] !== 0) {
      adjV.push(i);
    }
  }
  // Lấy ngẫu nhiên k đỉnh kề
  const randVs = [];
  while (randVs.length < k && adjV.length > 0) {
    const randIdx = Math.floor(Math.random() * adjV.length);
    randVs.push(adjV[randIdx]);
    adjV.splice(randIdx, 1);
  }
  return randVs;
}

export function Collection(
  disM,
  loadM,
  start,
  max,
  next,
  path = [],
  visited = new Set()
) {
  visited.add(start);
  start = next;
  while (visited.size != loadM.length && max - loadM[start] >= 0) {
    // Neu dinh dang xet da duoc thu gom
    if (visited.has(start)) {
      const nextVertices = randomVertices(disM, start, 1);
      start = nextVertices[0];
      continue;
    }
    // Tat ca cac dinh da duoc thu gom thi xe tiep theo ko can chay
    if (totalTrash(loadM) == 0) {
      return path.length != 1 ? path : [];
    }
    // Cap nhat tuyen duong thu gom
    path.push(start);
    visited.add(start);
    max -= loadM[start]; // tru luong xe sau khi thu gom
    loadM[start] = 0;
    // Di chuyen den diem thu gom tiep theo
    const nextVertices = randomVertices(disM, start, 1);
    start = nextVertices[0];
  }

  return visited.size != loadM.length ? path : [];
}

export function takeOutTrash(disM, start, end) {
  const distances = Array(disM.length).fill(Infinity);
  const previous = Array(disM.length).fill(null);
  const minHeap = new MinHeap();
  const path = [];

  distances[start] = 0;
  minHeap.insert([start, distances[start]]);

  while (!minHeap.isEmpty()) {
    const [current] = minHeap.extractMin();

    if (current === end) break;

    for (let neighbor = 0; neighbor < disM[current].length; neighbor++) {
      if (disM[current][neighbor] !== 0) {
        const newDist = distances[current] + disM[current][neighbor];
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = current;
          minHeap.insert([neighbor, newDist]);
        }
      }
    }
  }
  for (let at = end; at !== null; at = previous[at]) {
    path.push(at);
  }
  path.reverse();
  return path.length > 1 ? path : [];
}

export function createRoute(disM, loadM, start, end, max, next) {
  const collect = Collection(disM, loadM, start, max, next);
  const lastNode = collect.pop();
  const takeOutRubbish = lastNode ? takeOutTrash(disM, lastNode, end) : [];
  return [0, ...collect, ...takeOutRubbish];
}
