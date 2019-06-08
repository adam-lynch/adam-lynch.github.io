<template>
  <ol class="posts" id="writing">
      <li class="post-wrapper" v-for="article in articles" :key="article.title">
          <post-preview v-bind="article"/>
      </li>
  </ol>
</template>

<script src="./Blog.js"></script>
