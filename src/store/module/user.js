import { login } from '@/api/user'

const state = {
    user: ''
}

const mutations = {
    SET_USERNAME (state, params) {
        state.user = params
    }
}

const actions = {
    login({ commit },{ user, password }){
        return new Promise((resolve, reject) => {
            login({ user, password }).then(res => {
                // console.log(res)
                if (res.code === 200) {
                    resolve(res) // 继续执行后续操纵
                } else {
                    reject(new Error('错误'))
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions,
}