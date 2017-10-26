
<template>
  <article class="post">
    <h3 class="post-title-wrapper">
      <a :href="url" class="post-title js_track-link-clicks">{{ title }}<span class="post-title-label" v-if="isBook"><span class="post-title-label-parenthesis">(</span>Book<span class="post-title-label-parenthesis">)</span></span></a>
    </h3>

    <div class="post-meta">
        <strong class="post-blog-title">
            <a :href="blogLink" class="post-blog-link js_track-link-clicks">{{ blogName }}</a>
        </strong>
        <time class="post-blog-date">{{ prettyDate }}</time>
    </div>

    <div class="post-summary">{{ summary }}&nbsp;&nbsp;
        <a :href="url" class="post-read-more-link js_track-link-clicks">
          <span v-if="isBook">Get the book</span>
          <span v-else>Read more</span>
        </a>
    </div>
  </article>
</template>

<script src="./PostPreview.js"></script>
