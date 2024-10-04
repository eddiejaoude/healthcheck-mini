export async function apiRequest<T>(url: string) {
  let res;
  let data: T;
  try {
    res = await fetch(url, {
      next: { revalidate: 3600 },
    });
    data = await res.json();
  } catch {
    throw new Error("Invalid URL");
  }

  return data;
}
