
<template>
      <nav role="navigation" class="navigation-wrapper">
        <ul class="navigation">
          <navigation-item :shouldTrackClicks="true"
                           specificClasses="code-navigation-item"
                           text="Code"
                           :url="githubAccountUrl"/>

          <navigation-item :shouldTrackClicks="false"
                           specificClasses="writing-navigation-item"
                           text="Writing"
                           url="#writing"/>

          <navigation-item :shouldTrackClicks="true"
                           specificClasses="edit-navigation-item"
                           text="Edit page"
                           :url="repositoryUrl"/>

          <navigation-item :shouldTrackClicks="true"
                           specificClasses="twitter-navigation-item"
                           text="Twitter"
                           url="https://twitter.com/lynchy010/"/>

          <navigation-item :shouldTrackClicks="true"
                           specificClasses="email-navigation-item"
                           text="Email"
                           url="mailto:contact@adamlynch.com"/>

          <navigation-item :shouldTrackClicks="true"
                           specificClasses="rss-navigation-item"
                           text="RSS"
                           url="writing/rss.xml"/>
        </ul>
    </nav>
</template>

<script src="./Navigation.js"></script>
