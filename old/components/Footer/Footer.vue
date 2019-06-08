<template>
  <footer class="footer">
      <p class="footer-text">
          <anchor :href="repositoryUrl" class="footer-link" :shouldTrackClicks="true">This site is open source</anchor>
          <span class="copyright">&copy; {{year}} Adam Lynch</span>
      </p>
  </footer>
</template>

<script src="./Footer.js"></script>
