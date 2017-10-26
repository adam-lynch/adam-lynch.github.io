
<template>
    <li class="navigation-item" :class="specificClasses">
        <a :href="url" class="navigation-link" :class="classes">
            <span class="navigation-item-text">{{ text }}</span>
        </a>
    </li>
</template>

<script src="./NavigationItem.js"></script>
