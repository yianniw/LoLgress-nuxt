<template>

  <div id="layout-footer">
    <div class="footer-container">
      <div class="column" />
      <div class="column" />
      <div class="column" />
      <div class="column">
        <span>@social</span>
        <a href="https://github.com/yianniw/LoLgress-nuxt">
          <img src="/socials/github-mark-white.png" />
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#layout-footer {
  border-top: 1px solid var(--border);
  background-color: var(--neutral);

  padding-block: 20px;
}

.footer-container {
  display: flex;
  justify-content: space-evenly;
  max-width: 1280px;
  margin-inline: auto;
}

.column {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  max-width: fit-content;

  & span {
    align-self: flex-end;
    font-size: 16px;
  }

  & a {
    color: aliceblue;
    text-decoration: none;
  }

  & img {
    --size: 24px;
    min-width: var(--size);
    max-width: var(--size);
    min-height: var(--size);
    max-height: var(--size);

    vertical-align: top;
  }
}
</style>