import axios from "../../utils/axios";
import { loadTV } from "../reducers/tvSlice";
export { removeTV } from "../reducers/tvSlice";

export const asyncLoadTV =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      const detail = await axios.get(`/tv/${id}`);
      const externalid = await axios.get(`/tv/${id}/external_ids`);
      const recommendations = await axios.get(`/tv/${id}/recommendations`);
      const similar = await axios.get(`/tv/${id}/similar`);
      const videos = await axios.get(`/tv/${id}/videos`);
      const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
      const translations = await axios.get(`/tv/${id}/translations`);

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
      dispatch(loadTV(ultimateDetails));
      //   console.log(ultimateDetails);
    } catch (error) {
      console.log(error);
    }
  };
export default asyncLoadTV;
