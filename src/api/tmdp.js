import axiosClient from "./axiosClient";

export const CATEGORY_DATA = {
    movie: "movie",
    tv: "tv"
}

export const MOVIE_TYPE = {
    popular: "popular",
    topRate: "top_rated",
    nowPlaying: "now_playing",
    upComing: "upcoming"
}

export const TV_TYPE = {
    popular: "popular",
    topRate: "top_rated",
    onTheAir: "on_the_air"
}

const tmdpApi = {
    getList: (type, category, paramsInfo = {}) => {
        const url = `${category}/${type}`
        return axiosClient.get(url, {params: paramsInfo})
    },
    getVideos: (category, id, paramsInfo = {}) => {
        const url = `${category}/${id}/videos`
        return axiosClient.get(url, {params: paramsInfo})
    },
    getReviews: (category, id) => {
        const url = `${category}/${id}/reviews`;
        return axiosClient.get(url, {params: {}})
    },
    
    getImages: (category, id, params) => {
        const url = `${category}/${id}/images`;
        return axiosClient.get(url, {params: {}})
    },
    getSimilars: (category, id, params) => {
        const url = `${category}/${id}/similar`;
        return axiosClient.get(url, {params: {}})
    },
    getPersonDetail : (category, id) => {
        const url = `${category}/${id}`;
        return axiosClient.get(url, {params: {}})
    },
    search: (category, query, params) => {
        const url = `search/${category}?query=${query}`;
        return axiosClient.get(url, {params: {}})
    },
    getCredits: (category,id,params) => {
        const url = `${category}/${id}/credits`;
        return axiosClient.get(url, {params: {}})
    },
    getPersonCredit: (category, id) => {
        const url = `person/${id}/movie_credits`;
        return axiosClient.get(url, {params: {}})
    },
    getSimilar: (category,id, paramsInfo = {}) => {
        const url = `${category}/${id}/similar`;
        return axiosClient.get(url, {params: paramsInfo})
    },
    getGenre: (category) => {
        const url = `genre/${category}/list`;
        return axiosClient.get(url, {params: {}})
    },
    getDetail: (category, id) => {
        const url = `/${category}/${id}`;
        return axiosClient.get(url, {params: {}})
    }
}

export default tmdpApi;
