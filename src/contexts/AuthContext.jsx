import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState("");

  function signup(avatar, name, email, password) {
    setUsers((users) => [...users, { name, email, password, avatar }]);
  }

  function login(email, password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }

  function logout() {
    // setCurrentUser(null);
    setIsAuthenticated(false);
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("context was used outside of the provider");

  return context;
}

export { AuthProvider, useAuth };
