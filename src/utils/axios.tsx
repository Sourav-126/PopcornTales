import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjJjZjM3ZmJiZTRmNzBlMWI2MzViZjg0ZDFlN2U5MyIsIm5iZiI6MTczMTc0MjgwMi4zODU5ODUxLCJzdWIiOiI2NzM4NGFiM2QyODA0M2U5NzZlMzc0OGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.V3Qkk9tum2P4iodtJ_OJ855pyUi5BoWC6VFS-3nyz_U",
  },
});

export default instance;
