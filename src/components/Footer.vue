<template>
  <div>
    <strong>Veisla</strong>, a <strong>NON - PROFITABLE</strong> open-source
    project by <a href="https://github.com/Guilherme-HJA">Guilherme Araujo</a>,
    is made under
    <a href="https://opensource.org/licenses/mit-license.php">MIT License</a
    >.<br />
    Source code can be found at
    <a href="https://github.com/Guilherme-HJA/veisla">Github</a>
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/variables";

div {
  text-align: center;
  font-size: 1.1rem;

  width: 100%;
  height: 30px;
}

a {
  text-decoration: none;

  color: $orange;
}

@media screen and (max-width: 480px) {
  div {
    font-size: 0.9rem;
  }
}
</style>
