import axios from "../../utils/axios";
import { loadMovie } from "../reducers/movieSlice";
export { removeMovie } from "../reducers/movieSlice";

export const asyncLoadMovie =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      const detail = await axios.get(`/movie/${id}`);
      const externalid = await axios.get(`/movie/${id}/external_ids`);
      const recommendations = await axios.get(`/movie/${id}/recommendations`);
      const similar = await axios.get(`/movie/${id}/similar`);
      const videos = await axios.get(`/movie/${id}/videos`);
      const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
      const translations = await axios.get(`/movie/${id}/translations`);

      let ultimateDetails = {
        detail: detail.data,
        externalid: externalid.data,
        recommendations: recommendations.data,
        similar: similar.data.results,
        videos: videos.data.results.find((m: any) => m.type === "Trailer"),
        translations: translations.data.translations.map(
          (t: any) => t.english_name
        ),
        watchProviders: watchProviders.data.results.IN,
      };
      dispatch(loadMovie(ultimateDetails));
      //   console.log(ultimateDetails);
    } catch (error) {
      console.log(error);
    }
  };
export default asyncLoadMovie;
