export class Shuffle{
  static shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let rnd = Math.floor(Math.random() * i);

      let temp = arr[i];
      arr[i] = arr[rnd];
      arr[rnd] = temp;
    }
    return arr;
  }
}
