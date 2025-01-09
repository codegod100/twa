var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// pkg/snippets/wasm-bindgen-rayon-38edf6e439f6d70d/src/workerHelpers.js
function waitForMsgType(target, type) {
  return new Promise((resolve) => {
    target.addEventListener("message", function onMsg({ data }) {
      if (data?.type !== type)
        return;
      target.removeEventListener("message", onMsg);
      resolve(data);
    });
  });
}
async function startWorkers(module, memory, builder) {
  if (builder.numThreads() === 0) {
    throw new Error(`num_threads must be > 0.`);
  }
  const workerInit = {
    type: "wasm_bindgen_worker_init",
    init: { module_or_path: module, memory },
    receiver: builder.receiver()
  };
  _workers = await Promise.all(Array.from({ length: builder.numThreads() }, async () => {
    const worker = new Worker(new URL("./workerHelpers.js", import.meta.url), {
      type: "module"
    });
    worker.postMessage(workerInit);
    await waitForMsgType(worker, "wasm_bindgen_worker_ready");
    return worker;
  }));
  builder.build();
}
var _workers;
var init_workerHelpers = __esm(() => {
  waitForMsgType(self, "wasm_bindgen_worker_init").then(async ({ init, receiver }) => {
    const pkg = await Promise.resolve().then(() => (init_twa(), exports_twa));
    await pkg.default(init);
    postMessage({ type: "wasm_bindgen_worker_ready" });
    pkg.wbg_rayon_start_worker(receiver);
  });
});

// pkg/twa.js
var exports_twa = {};
__export(exports_twa, {
  wbg_rayon_start_worker: () => wbg_rayon_start_worker,
  wbg_rayon_PoolBuilder: () => wbg_rayon_PoolBuilder,
  sum: () => sum,
  initThreadPool: () => initThreadPool,
  initSync: () => initSync,
  default: () => twa_default
});
function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_export_2.set(idx, obj);
  return idx;
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.buffer !== wasm.memory.buffer) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().slice(ptr, ptr + len));
}
function isLikeNone(x) {
  return x === undefined || x === null;
}
function getUint32ArrayMemory0() {
  if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.buffer !== wasm.memory.buffer) {
    cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32ArrayMemory0;
}
function passArray32ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 4, 4) >>> 0;
  getUint32ArrayMemory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function sum(numbers) {
  const ptr0 = passArray32ToWasm0(numbers, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.sum(ptr0, len0);
  return ret;
}
function initThreadPool(num_threads) {
  const ret = wasm.initThreadPool(num_threads);
  return ret;
}
function wbg_rayon_start_worker(receiver) {
  wasm.wbg_rayon_start_worker(receiver);
}

class wbg_rayon_PoolBuilder {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
    obj.__wbg_ptr = ptr;
    wbg_rayon_PoolBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    wbg_rayon_PoolBuilderFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wbg_rayon_poolbuilder_free(ptr, 0);
  }
  numThreads() {
    const ret = wasm.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr);
    return ret >>> 0;
  }
  receiver() {
    const ret = wasm.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr);
    return ret >>> 0;
  }
  build() {
    wasm.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
  }
}
async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_call_b0d8e36992d9900d = function() {
    return handleError(function(arg0, arg1) {
      const ret = arg0.call(arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_instanceof_Window_d2514c6a7ee7ba60 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof Window;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_newnoargs_fd9e4bf8be2bc16d = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
  };
  imports.wbg.__wbg_startWorkers_2ca11761e08ff5d5 = function(arg0, arg1, arg2) {
    const ret = startWorkers(arg0, arg1, wbg_rayon_PoolBuilder.__wrap(arg2));
    return ret;
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_0be7472e492ad3e3 = function() {
    const ret = typeof global === "undefined" ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_THIS_1a6eb482d12c9bfb = function() {
    const ret = typeof globalThis === "undefined" ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_SELF_1dc398a895c82351 = function() {
    const ret = typeof self === "undefined" ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_WINDOW_ae1c80c7eea8d64a = function() {
    const ret = typeof window === "undefined" ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
  };
  imports.wbg.__wbindgen_is_undefined = function(arg0) {
    const ret = arg0 === undefined;
    return ret;
  };
  imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return ret;
  };
  imports.wbg.__wbindgen_module = function() {
    const ret = __wbg_init.__wbindgen_wasm_module;
    return ret;
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  return imports;
}
function __wbg_init_memory(imports, memory) {
  imports.wbg.memory = memory || new WebAssembly.Memory({ initial: 18, maximum: 16384, shared: true });
}
function __wbg_finalize_init(instance, module, thread_stack_size) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedUint32ArrayMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  if (typeof thread_stack_size !== "undefined" && (typeof thread_stack_size !== "number" || thread_stack_size === 0 || thread_stack_size % 65536 !== 0)) {
    throw "invalid stack size";
  }
  wasm.__wbindgen_start(thread_stack_size);
  return wasm;
}
function initSync(module, memory) {
  if (wasm !== undefined)
    return wasm;
  let thread_stack_size;
  if (typeof module !== "undefined") {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ({ module, memory, thread_stack_size } = module);
    } else {
      console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
    }
  }
  const imports = __wbg_get_imports();
  __wbg_init_memory(imports, memory);
  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }
  const instance = new WebAssembly.Instance(module, imports);
  return __wbg_finalize_init(instance, module, thread_stack_size);
}
async function __wbg_init(module_or_path, memory) {
  if (wasm !== undefined)
    return wasm;
  let thread_stack_size;
  if (typeof module_or_path !== "undefined") {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path, memory, thread_stack_size } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (typeof module_or_path === "undefined") {
    module_or_path = new URL("twa_bg.wasm", import.meta.url);
  }
  const imports = __wbg_get_imports();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  __wbg_init_memory(imports, memory);
  const { instance, module } = await __wbg_load(await module_or_path, imports);
  return __wbg_finalize_init(instance, module, thread_stack_size);
}
var wasm, cachedTextDecoder, cachedUint8ArrayMemory0 = null, cachedUint32ArrayMemory0 = null, WASM_VECTOR_LEN = 0, wbg_rayon_PoolBuilderFinalization, twa_default;
var init_twa = __esm(() => {
  init_workerHelpers();
  cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
    throw Error("TextDecoder not available");
  } };
  if (typeof TextDecoder !== "undefined") {
    cachedTextDecoder.decode();
  }
  wbg_rayon_PoolBuilderFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
  }, unregister: () => {
  } } : new FinalizationRegistry((ptr) => wasm.__wbg_wbg_rayon_poolbuilder_free(ptr >>> 0, 1));
  twa_default = __wbg_init;
});

// main.ts
init_twa();
console.log("wat");
await twa_default();
console.log("init");
await initThreadPool(navigator.hardwareConcurrency);
console.log("yolo");
while (true) {
  const arrayOf100 = Array(100).fill(0).map(() => Math.floor(Math.random() * 100));
  console.log({ arrayOf100 });
  console.log(sum(arrayOf100));
}
