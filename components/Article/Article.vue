<template>
  <div>
    <div>
      <article class="post">
        <h2 class="post-title-wrapper">
          <nuxt-link :to="to" class="post-title">{{ article.title }}</nuxt-link>
        </h2>

        <div class="post-meta">
            <time class="post-blog-date">{{ prettyDate }}</time>
            <!-- Production is broken without this, I'm not sure why -->
            <no-ssr>
              <span class="post-blog-title" v-if="article && article.original">
                  Originally posted on <anchor :href="article.original.url" class="post-blog-link" :shouldTrackClicks="true">{{ article.original.blogName }}</anchor>
              </span>
            </no-ssr>
        </div>

        <div class="post-content" v-html="contents"></div>
      </article>

      <aside>
        <div class="post-comments">
          <p>Feedback is more than welcome via <a href="https://twitter.com/lynchy010">@lynchy010</a> or <a href="mailto:contact@adamlynch.com">contact@adamlynch.com</a></p>
        </div>

        <!-- Production is broken without this, I'm not sure why -->
        <no-ssr>
          <ul class="more-articles posts" v-if="article.moreArticles.length">
            <li class="more-articles__item post-wrapper" v-for="otherArticle in article.moreArticles" :key="otherArticle.id">
              <post-preview v-bind="otherArticle"/>
            </li>
          </ul>
        </no-ssr>
      </aside>
    </div>
  </div>
</template>

<script src="./Article.js"></script>
