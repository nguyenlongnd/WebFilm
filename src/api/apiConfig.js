const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3",
    apikey: "ca0bd7ce3c847a07896f890762dd1c01",
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
    videoYoutube: (urlVideo) => `https://www.youtube.com/embed/${urlVideo}?control=0}`
}

export default apiConfig;