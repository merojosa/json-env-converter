<script lang="ts">
  import Github from "./github.svelte";
  import { converter } from "./converter-store";
  import { browser } from "$app/environment";

  let textareaValue = (browser && localStorage.value) || "";

  $: converter.fromJsonToEnv(textareaValue);
  $: browser && localStorage.setItem("value", textareaValue);
</script>

<main>
  <h1>JSON - Env Variables Converter</h1>
  <section class="grid-section">
    <h2>JSON</h2>

    <textarea bind:value={textareaValue} class="edit-textarea" />

    <h2>Env Variables</h2>
    <div class="result-container">
      <pre><code>{$converter}</code></pre>
    </div>
  </section>
</main>
<footer>
  <span>
    Made by <a href="https://jose-andres.dev" target="_blank">Jose Andrés</a
    ></span
  >
  <div class="icons-container">
    <a href="https://github.com/merojosa/json-env-converter" target="_blank"
      ><Github /></a
    >
  </div>
</footer>

<svelte:head>
  <title>JSON - Env Variables Converter</title>
  <meta
    name="description"
    content="A JSON-Environments variables online converter"
  />
</svelte:head>

<style>
  :global(body) {
    all: unset;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100vh auto;
    grid-template-areas: "main" "footer";
    overflow-x: hidden;
  }

  h1,
  h2 {
    margin: 0;
    text-align: center;
  }

  h2 {
    padding: 1rem;
  }

  main {
    grid-area: main;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  footer {
    grid-area: footer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 1rem;
    margin: 0 2.5rem;
    border-top: 1px solid black;
  }

  .grid-section {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: min-content 80%;
    grid-auto-flow: column;
    width: 100%;
    height: 75%;
  }

  .edit-textarea {
    justify-self: center;
    width: 80%;
    resize: none;
    margin: 2rem;
    margin-top: 0;
  }

  .result-container {
    padding: 1rem;
    margin: 2rem;
    margin-top: 0;
    background-color: rgb(220, 220, 220);
  }
</style>
