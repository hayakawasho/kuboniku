import axios from "redaxios";

export const createAuthRepository = () => ({
  validate: async (token = "") => {
    try {
      const { data } = await axios<any>({
        data: {
          query: `mutation {
            refreshJwtAuthToken(
              input: {jwtRefreshToken: "${token}"}
            ) {
              authToken
            }
          }`,
        },
        method: "POST",
        url: `https://wp.kuboniku.com/graphql`,
      });
      return {
        authToken: data.data.refreshJwtAuthToken.authToken as string,
      };
    } catch (error) {
      return false;
    }
  },
});
