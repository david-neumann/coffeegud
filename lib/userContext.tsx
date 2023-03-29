import { User } from "firebase/auth";
import { createContext } from "react";

interface FirebaseAuthState {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
}

export const UserContext = createContext<FirebaseAuthState>({
  user: null,
  loading: false,
  error: undefined,
});
