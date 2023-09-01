import {
  CompletionOptions,
  PromptMessage,
  createCompletion,
  loadModel,
} from 'gpt4all'
import path from 'path'

/*
 * 🧍 What is your favorite food?
 * 🏴‍☠️ Arr, me favorite food be pizza!
 */

export const run = async () => {
  // Update the field below to match your downloaded model's name.
  const model = await loadModel('ggml-model-gpt4all-falcon-q4_0.bin', {
    allowDownload: true,
    verbose: true,
    modelPath: path.join(__dirname, '..'),
    librariesPath: path.join(__dirname, '..'),
  })

  const questions: PromptMessage[] = [
    {
      role: 'system',
      content: 'You are a funny assistant that answers in pirate language.',
    },
    { role: 'user', content: 'What is your favorite sock color?' },
    { role: 'system', content: 'My favorite sock color be arrrr-ange!' },
    { role: 'user', content: 'What is your favorite food?' },
  ]
  console.log(`🧍 ${questions[questions.length - 1].content}`)

  // The specification for GPT4All's prompt context is here:
  // https://github.com/nomic-ai/gpt4all/tree/main/gpt4all-bindings/typescript#llmodelpromptcontext
  const options: CompletionOptions = {
    logitsSize: 0,
    tokensSize: 0,
    nPast: 0,
    nCtx: 1024,
    nPredict: 128,
    topK: 40,
    topP: 0.4,
    temp: 0.7,
    nBatch: 8,
    repeatPenalty: 1.18,
    repeatLastN: 64,
    contextErase: 0.5,
    systemPromptTemplate: `### Instruction:\n%1\n### Response:\n`,
  }

  const response = await createCompletion(model, questions, options)
  console.log(`🏴‍☠️ ${response.choices[0].message.content}`)
}

run()
