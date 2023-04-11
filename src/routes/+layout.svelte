<script>
  import "@fontsource/open-sans";
  import Github from "./github.svelte";
</script>

<slot />

<footer>
  <span>
    Made by <a href="https://jose-andres.dev" target="_blank">Jose Andrés</a>
  </span>
  <div class="icons-container">
    <a href="https://github.com/merojosa/json-env-converter" target="_blank">
      <Github />
    </a>
  </div>
</footer>

<svelte:head>
  <title>JSON - Env Variables Converter</title>
  <meta
    name="description"
    content="A JSON-Environment variables online converter"
  />
  <meta
    name="google-site-verification"
    content="AcTAAeL5tm0AeyDltMUMjgpxpySMInGYI-H6yIA2kMI"
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
    font-family: "Open Sans", sans-serif;
  }

  :global(main) {
    grid-area: main;
    margin: 2.5rem;
    display: grid;
    align-items: unset;
    grid-template-rows: 40% 60%;
    grid-template-columns: 100%;
  }

  :global(footer) {
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

  @media (min-width: 400px) {
    :global(main) {
      grid-template-rows: 30% 70%;
    }
  }

  @media (min-width: 800px) {
    :global(main) {
      align-items: center;
      grid-template-rows: 15% 85%;
    }
  }
</style>
