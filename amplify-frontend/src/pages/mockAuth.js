// mockAuth.js
const mockUserKey = "clinica_user";
const mockTokenKey = "clinica_token";

const Auth = {
  signIn: async (email, password) => {
    console.log("Mock signIn called:", { email, password });
    const user = { email };
    sessionStorage.setItem(mockUserKey, JSON.stringify(user));
    sessionStorage.setItem(mockTokenKey, "authenticated");
    return user;
  },

  signOut: async () => {
    console.log("Mock signOut called");
    sessionStorage.removeItem(mockUserKey);
    sessionStorage.removeItem(mockTokenKey);
  },

  currentAuthenticatedUser: async () => {
    const user = sessionStorage.getItem(mockUserKey);
    if (user) return JSON.parse(user);
    throw new Error("No user logged in");
  },

  federatedSignIn: async () => {
    console.log("Mock federatedSignIn called");
  },

  signUp: async ({ email, password }) => {
    console.log("Mock signUp called:", { email, password });
    const user = { email };
    sessionStorage.setItem(mockUserKey, JSON.stringify(user));
    return user;
  },
};

export default Auth;
