
<template>
  <article class="post">
    <h3 class="post-title-wrapper">
        <!-- I was using <anchor-or-nuxt-link/> here but it disappears when the (client-side) JS kicked in and this works-->
        <a class="post-title" @click="onClickPostTitle" :href="href">
          {{ title }}
          <span class="post-title-label" v-if="isBook">
            <span class="post-title-label-parenthesis">(</span>Book<span class="post-title-label-parenthesis">)</span>
          </span>
        </a>
    </h3>

    <div class="post-meta">
        <time class="post-blog-date">{{ prettyDate }}</time>
          <span class="post-blog-title" v-if="original.onlyExternal">
              <anchor :href="original.blogLink" class="post-blog-link" :shouldTrackClicks="true">{{ original.blogName }}</anchor>
          </span>
    </div>

    <div class="post-summary">
        <div class="post-content" v-html="renderedSummary"></div>&nbsp;&nbsp;
        <anchor-or-nuxt-link :anchorUrl="original.url" :isAnchor="original.onlyExternal" :nuxtLinkTo="to" class="post-read-more-link" :shouldTrackAnchorClicks="true">
          <span v-if="isBook">Get the book</span>
          <span v-else>Read more</span>
        </anchor-or-nuxt-link>
    </div>

    <div class="post-skeleton" aria-hidden="true" v-for="(skeleton, index) in skeletons" :key="index">
      <span class="post-skeleton-word" v-for="(_, index) in skeleton.words" :key="index"></span>
    </div>
  </article>
</template>

<script src="./PostPreview.js"></script>
