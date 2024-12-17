import request from "@/utils/request"

export const getPost = () => {
    return request("get", `/posts`)
}

export const createPost = (data) => {
    return request("post", `/posts`, { data })
}

export const updatePost = (idPost, data) => {
    return request("put", `/posts/${idPost}`, { data })
}

export const deletePost = (idPost) => {
    return request("delete", `/posts/${idPost}`)
}