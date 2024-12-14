import { distanceM as disM, loadM } from "../../Data/data";
import { totalTrash, randomVertices, createRoute } from "./Module";

// n: so luong xe
// nextV: dinh ke tiep

export default class WOA {
  #load = null;
  #nSol = 30;
  // constructor func
  constructor(load, nSol) {
    this.#load = load;
    this.#nSol = nSol;
  }
  // Khoi tao quan the
  initPopulation(start, end) {
    const population = [];
    for (let i = 0; i < this.#nSol; i++) {
      const schedule = [];
      const copyLoadM = [...loadM];
      let j = 1;
      while (totalTrash(copyLoadM) > 0) {
        const randomv = randomVertices(disM, start, this.#load.length);
        const routeList = randomv.map((nextV, i) =>
          createRoute(disM, copyLoadM, start, end, this.#load[i], nextV)
        );
        schedule.push({
          id: j,
          routes: routeList,
        });
        j++;
      }
      population.push(schedule);
    }
    return population;
  }
}
