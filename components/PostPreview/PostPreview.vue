
<template>
  <article class="post">
    <h3 class="post-title-wrapper">
      <nuxt-link :to="to" class="post-title js_track-link-clicks">{{ title }}<span class="post-title-label" v-if="isBook"><span class="post-title-label-parenthesis">(</span>Book<span class="post-title-label-parenthesis">)</span></span></nuxt-link>
    </h3>

    <div class="post-meta">
        <strong class="post-blog-title" v-if="original">
            <a :href="original.blogLink" class="post-blog-link js_track-link-clicks">{{ original.blogName }}</a>
        </strong>
        <time class="post-blog-date">{{ prettyDate }}</time>
    </div>

    <div class="post-summary">{{ description }}&nbsp;&nbsp;
         <nuxt-link :to="to" class="post-read-more-link js_track-link-clicks">
          <span v-if="isBook">Get the book</span>
          <span v-else>Read more</span>
        </nuxt-link>
    </div>
  </article>
</template>

<script src="./PostPreview.js"></script>
