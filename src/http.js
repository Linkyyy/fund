import axios from 'axios'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
let loading;
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中..."
    });
}
function endLoading() {
    loading.close();
}

//请求拦截
axios.interceptors.request.use(config => {
    startLoading();
    if (localStorage.fundToken) {
        config.headers.Authorization = localStorage.fundToken
    }
    return config;
}, error => {
    return Promise.reject(error)
})


//响应拦截
axios.interceptors.response.use(response => {
    endLoading();
    return response;
}, error => {
    endLoading();
    Message({
        message:error,
        type:'error'
    })


})



export default axios