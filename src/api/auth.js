import request from "@/utils/request"

export const signIn = (data) => {
    return request("post", `/account`, data)
}