<script lang="ts">
  let textareaValue = "";

  function calculateCodeValue(value: string) {
    let json = {};
    try {
      json = JSON.parse(value);
    } catch (e) {
      return "Incorrect JSON";
    }

    function getEnvValue(value: unknown): string | number {
      if (value === null || value === undefined) {
        return "";
      }

      if (typeof value === "string" || typeof value === "number") {
        return value;
      }

      if (Array.isArray(value)) {
        return value.reduce<string>((result, arrayElement, index) => {
          if (
            JSON.stringify(arrayElement) === "{}" ||
            arrayElement === null ||
            arrayElement === undefined
          ) {
            return result;
          }

          return result.concat(
            `${index > 0 ? "," : ""}${getEnvValue(arrayElement)}`
          );
        }, "");
      }

      if (typeof value === "object") {
        const entries = Object.entries(value);

        return entries.reduce((result, [key, value], index) => {
          if (
            JSON.stringify(value) === "{}" ||
            value === null ||
            value === undefined
          ) {
            return result.concat(`${key}`);
          }

          return result.concat(
            `${key},${getEnvValue(value)}${
              index < entries.length - 1 ? "," : ""
            }`
          );
        }, "");
      }

      return "";
    }

    if (Array.isArray(json)) {
      return json.reduce(
        (codeValue, arrayElement) => codeValue.concat(`${arrayElement}\n`),
        ""
      );
    }

    const entries = Object.entries(json);

    return entries.reduce(
      (codeValue, [envName, value]) =>
        codeValue.concat(`${envName}=${getEnvValue(value)}\n`),
      ""
    );
  }

  $: codeValue = calculateCodeValue(textareaValue);
</script>

<main>
  <h1>JSON - Envs Variables Converter</h1>
  <section class="grid-section">
    <h2>JSON</h2>

    <textarea bind:value={textareaValue} class="edit-textarea" />

    <h2>Envs Variables</h2>
    <div class="result-container">
      <pre><code>{codeValue}</code></pre>
    </div>
  </section>
</main>

<svelte:head>
  <title>JSON - Envs Variables Converter</title>
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
    grid-template-rows: 1fr auto;
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
