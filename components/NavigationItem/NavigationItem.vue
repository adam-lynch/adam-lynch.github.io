
<template>
    <li class="navigation-item" :class="specificClasses">
        <a :href="url" class="navigation-link" :class="classes" v-if="isExternal">
            <span class="navigation-item-text">{{ text }}</span>
        </a>
        <nuxt-link :to="url" class="navigation-link" :class="classes" v-else>
            <span class="navigation-item-text">{{ text }}</span>
        </nuxt-link>
    </li>
</template>

<script src="./NavigationItem.js"></script>
