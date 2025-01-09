use rand::Rng;
use rayon::iter::{
  IntoParallelIterator, IntoParallelRefIterator, ParallelIterator,
};
use wasm_bindgen::prelude::*;
pub use wasm_bindgen_rayon::init_thread_pool;

#[wasm_bindgen]
extern "C" {
  // Use `js_namespace` here to bind `console.log(..)` instead of just
  // `log(..)`
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);

  // The `console.log` is quite polymorphic, so we can bind it with multiple
  // signatures. Note that we need to use `js_name` to ensure we always call
  // `log` in JS.
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_u32(a: u32);

  // Multiple arguments too!
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_many(a: &str, b: &str);
}

#[wasm_bindgen]
pub fn sum(numbers: &[i32]) -> i32 {
  numbers.par_iter().sum()
}

#[wasm_bindgen]
pub fn yolo(n: i32) -> Vec<i32> {
  let foo = (0..n)
    .into_par_iter()
    .map(|_| {
      let mut rng = rand::thread_rng();
      let random_numbers: Vec<i32> =
        (0..1000).map(|_| rng.gen_range(0..1000)).collect();
      sum(&random_numbers)
    })
    .collect::<Vec<i32>>();
  foo
}
