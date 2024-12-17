import { defineStore } from 'pinia'
import { getPost, updatePost } from '@/api/post'

export const useCounterStore = defineStore('counter', {
    state: () => {
        return { 
            count: 0,
            post: {},
            posts: []
        }
    },
    actions: {
        increment() {
            this.count++
        },
        async fetchListPost() {
            try {
                const response = await getPost()
                const data = response.data
                this.setListPost(data)
            } catch (error) {
                console.log(error);
            }
        },
        setListPost(data) {
            this.posts = data
        },
        async updatePost(id, dataPost) {
            try {
                const response = await updatePost(id, dataPost)
                const data = response.data
                console.log('updatePost', data);
            } catch (error) {
                console.log(error);
            }
        },
    },
    getters: {
        getCount: (state) => state.count,
        getListPost: (state) => state.posts
    },
})