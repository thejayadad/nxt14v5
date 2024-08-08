export const authConfig = {
    pages: {
      signIn: "/", // Redirect to the home page for signing in
    },
    providers: [],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.role = user.role; // Include UserRole in the token
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
          session.user.role = token.role; // Include UserRole in the session
        }
        return session; 
      },
      authorized({ auth, request }) {
        const user = auth?.user;
        const isOnAdminRoute = request.nextUrl?.pathname.startsWith("/admin");
  
        // Admin-only access
        if (isOnAdminRoute) {
          if (!user || user.role !== "ADMIN") {
            console.log("Access denied: Admins only");
            return false; // Deny access if not an admin
          }
          return true; // Allow access if the user is an admin
        }
  
        // Authenticated-only access
        const isAuthenticatedRoute = request.nextUrl?.pathname.startsWith("/dashboard");
  
        if (isAuthenticatedRoute) {
          if (!user) {
            console.log("Access denied: Authentication required");
            return false; // Deny access if not authenticated
          }
          return true; // Allow access if authenticated
        }
  
        // Public route (e.g., home, about, contact)
        console.log("Access granted: Public route");
        return true; // Allow access to public routes
      },
    },
  };
  