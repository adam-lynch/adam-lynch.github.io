<template>
  <div>
    <article class="post">
      <h2 class="post-title-wrapper">
        <!-- <nuxt-link :to="to" class="post-title">{{ article.title }}</nuxt-link> -->
      </h2>

      <div class="post-meta">
          <time class="post-blog-date">{{ prettyDate }}</time>
          <!-- <span class="post-blog-title" v-if="article.original">
              Originally posted on <anchor :href="article.original.url" class="post-blog-link" :shouldTrackClicks="true">{{ article.original.blogName }}</anchor>
          </span> -->
      </div>

      <!-- <div class="post-content" v-html="contents"></div> -->
    </article>

    <aside class="post-comments">
      <!-- <DisqusComments v-bind="disqus" @ready="onDisqusReady" v-if="isMounted"/> -->
      <div class="post-skeleton" aria-hidden="true" :class="classes">
        <span class="post-skeleton-word" v-for="(_, index) in numberOfWordsInCommentsSkeleton" :key="index"></span>
      </div>
    </aside>
  </div>
</template>

<script src="./Article.js"></script>
