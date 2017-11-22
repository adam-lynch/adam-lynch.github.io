
<template>
      <nav role="navigation" class="navigation-wrapper">
        <ul class="navigation">
          <navigation-item :shouldTrackAnchorClicks="true"
                           specificClasses="code-navigation-item"
                           text="Code"
                           :url="githubAccountUrl"/>

          <navigation-item :shouldTrackAnchorClicks="false"
                           specificClasses="writing-navigation-item"
                           text="Writing"
                           url="/"/>

          <navigation-item :shouldTrackAnchorClicks="true"
                           specificClasses="edit-navigation-item"
                           text="Edit page"
                           :url="repositoryUrl"/>

          <navigation-item :shouldTrackAnchorClicks="true"
                           specificClasses="twitter-navigation-item"
                           text="Twitter"
                           url="https://twitter.com/lynchy010/"/>

          <navigation-item :shouldTrackAnchorClicks="true"
                           specificClasses="email-navigation-item"
                           text="Email"
                           url="mailto:contact@adamlynch.com"/>

          <navigation-item :shouldTrackAnchorClicks="true"
                           specificClasses="rss-navigation-item"
                           text="RSS"
                           url="writing/rss.xml"/>
        </ul>
    </nav>
</template>

<script src="./Navigation.js"></script>
