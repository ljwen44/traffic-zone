import axios from './index'

export const login = ({ user, password }) => {
    return axios.request({
        url: '/topic/login',
        method: 'post',
        data: {
            user,
            password
        }
    })
}