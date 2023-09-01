# gpt4all-typescript-example

This repo is an example implementation of the [gpt4all typescript bindings](https://github.com/nomic-ai/gpt4all/tree/main/gpt4all-bindings/typescript) in a basic TS project.

Currently, the bindings do not include prebuilt dylibs.
This repo includes a prebuilt dylib for macOS, but you will need to build your own for other platforms.
Details on how to do this are below.

### How it works

1. Download your desired model (in this example, we use [ggml-model-gpt4all-falcon-q4_0.bin](https://huggingface.co/nomic-ai/gpt4all-falcon-ggml/resolve/main/ggml-model-gpt4all-falcon-q4_0.bin)) and place it in the root of this repo. You'll need to update the `model` name in `src/index.ts` to match the name of the model you downloaded.

2. If the prebuilt binaries in this repo work for you, skip the next two steps! If not, you'll need to clone the [gpt4all repo](https://github.com/nomic-ai/gpt4all), navigate to the `gpt4all-backend` and update its submodules to ensure the `llama.cpp` files are up to date:

   ```bash
   cd gpt4all-backend
   git submodule update --init --depth 1 --recursive
   ```

3. Next, you need to build the dylibs for your platform, then move the output of the `native` runtime to the root of this repo. For example, on macOS:

   ```bash
   cd ../gpt4all-bindings/typescript
   yarn
   yarn build:backend
   cp ./runtimes/osx/native/* ~/Developer/gpt4all-typescript-example
   ```

4. Finally, install your dependencies and run the example!

   ```bash
   yarn
   yarn start
   ```
