<template>
  <div class="post-page-post-wrapper">
    <article class="post">
      <h2 class="post-title-wrapper">
        <router-link :to="to" class="post-title">{{ title }}</router-link>
      </h2>

      <div class="post-meta">
          <time class="post-blog-date">{{ prettyDate }}</time>
          <span class="post-blog-title" v-if="original">
              Originally posted on <anchor :href="original.url" class="post-blog-link" :shouldTrackClicks="true">{{ original.blogName }}</anchor>
          </span>
      </div>

      <div class="post-content">
        <slot/>
      </div>
    </article>

    <aside>
      <div class="post-comments">
        <!-- TODO: use vars? -->
        <p>Feedback is more than welcome via <a href="https://twitter.com/lynchy010">@lynchy010</a> or <a href="mailto:contact@adamlynch.com">contact@adamlynch.com</a></p>
      </div>

      <ul class="more-articles posts" v-if="moreArticles.length">
        <li class="more-articles__item post-wrapper" v-for="otherArticle in moreArticles" :key="otherArticle.id">
          <post-preview v-bind="otherArticle"/>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script src="./Article.js"></script>
