// ~/stores/auth.js yoki auth.ts

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    refreshToken: null,
    loginPayload: {},
    userProfile: null,
  }),

  actions: {
    async fetchUserProfile() {
      const { $api } = useNuxtApp();

      const acToken = localStorage.getItem("access_token");
      $api.defaults.headers.common["Authorization"] = `Bearer ${acToken}`;
      try {
        const response = await $api.get("user/profile/");
        this.userProfile = response.data;
        return this.userProfile;
      } catch (error) {
        console.error("User profile fetch failed:", error);
        this.userProfile = null;
        return null;
      }
    },

    async login(payload) {
      const { $api } = useNuxtApp();
      try {
        await $api.post("user/auth/send-code/", payload);

        this.loginPayload = { ...payload };
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    async resetVerify() {
      const { $api } = useNuxtApp();
      try {
        const payload = { ...this.loginPayload };
        await $api.post("user/auth/send-code/", payload);
      } catch (error) {
        console.error("Reset verify failed:", error);
        throw error;
      }
    },

    async verify(verify) {
      const { $api } = useNuxtApp();
      try {
        const payload = { ...this.loginPayload, ...verify };
        const response = await $api.post("user/auth/verify-code/", payload);
        if (response.data.data.action !== "signup") {
          this.token = response.data.data.tokens.access;
          this.refreshToken = response.data.data.tokens.refresh;

          $api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.token}`;

          localStorage.setItem("access_token", this.token);
          localStorage.setItem("refresh_token", this.refreshToken);
        }
      } catch (error) {
        console.error("Verify failed:", error);
        throw error;
      }
    },

    async register(payload) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.post("user/auth/register/", payload);

        this.token = response.data.data.tokens.access;
        this.refreshToken = response.data.data.tokens.refresh;

        $api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

        localStorage.setItem("access_token", this.token);
        localStorage.setItem("refresh_token", this.refreshToken);
      } catch (error) {
        console.error("Register failed:", error);
        throw error;
      }
    },

    logout() {
      const router = useRouter();
      this.token = null;
      this.refreshToken = null;

      const { $api } = useNuxtApp();
      delete $api.defaults.headers.common["Authorization"];

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      // router.push("/");

      location.href = "/";
    },
  },

  persist: true,
});
