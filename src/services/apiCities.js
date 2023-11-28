import supabase from "./supabase";

export async function fetchAllCities() {
  let { data: cities, error } = await supabase.from("cities").select("*");

  if (error) throw new Error(error);

  return cities;
}

export async function getCity({ id }) {
  let { data: city, error } = await supabase
    .from("cities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error);

  return city;
}

export async function createCity({ newCity }) {
  const { data, error } = await supabase
    .from("cities")
    .insert([newCity])
    .select();

  if (error) throw new Error(error);

  return data;
}

export async function updateCity({ id, updatedCityData }) {
  const { data, error } = await supabase
    .from("cities")
    .update(updatedCityData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error);

  return data;
}

export async function deleteCity({ id }) {
  const { error } = await supabase.from("cities").delete().eq("id", id);

  if (error) throw new Error(error);

  return true;
}
