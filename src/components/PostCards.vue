<template>
    <div>
        <div class="container mb-5" v-for="post in posts" :key="post.id">
            <div class="row">
                <div class="col">
                    <img :src= post.post width="450rem" class="col-8"/>
                    <div class="row">
                        <p class="col-5">{{ post.caption }}</p>
                        <button>like </button>
                    </div>

                </div>
                <div class="border col-3">
                    comment section
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default{
        name:'PostCards',
        props:{
            posts: Array
        }
    }
</script>