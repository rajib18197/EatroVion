import supabase from "../../services/supabase";

export async function signupWithPassword({
  data: { email, password, fullName },
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  console.log(data);

  return data;
}

export async function signInWithPassword({ data: { email, password } }) {
  console.log(email, password);
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  console.log(data);

  return data;
}

export async function signup(provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: "https://eatro-vion.vercel.app/app",
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error);
  }
  console.log(data);

  return data;
}

export async function signout() {
  const { error } = await supabase.auth.signOut();

  return true;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  console.log(session);
  if (!session.session) return "not-authorized-user";

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  return user;
}
