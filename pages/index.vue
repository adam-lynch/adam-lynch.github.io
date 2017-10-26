
<template>
  <ol class="posts" id="writing">
      <li class="post-wrapper" v-for="post in posts" :key="post.url">
          <post-preview v-bind="post"/>
      </li>
  </ol>
</template>

<script src="./index.js"></script>
