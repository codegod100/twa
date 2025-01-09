import init, { initThreadPool, sum, yolo } from "./pkg/twa.js";

async function main() {
  console.log("wat");
  await init();
  console.log("init");
  await initThreadPool(navigator.hardwareConcurrency);
  console.log("yolo");

  // while (true) {
  //   const arrayOf100 = Array(100)
  //     .fill(0)
  //     .map(() => Math.floor(Math.random() * 100));
  //   console.log({ arrayOf100 });
  //   console.log(sum(arrayOf100));
  // }
  const p = performance.now();
  const y = yolo();
  const now = performance.now() - p;
  console.log({ y, now });
}

main();
