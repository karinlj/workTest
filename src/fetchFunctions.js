export const getData = async (url) => {
  try {
    const result = await fetch(url); //returns promise

    if (!result.ok) {
      console.log("result:", result);
      throw Error("Fetch data error: " + result.statusText);
    }
    const data = await result.json(); //returns promise
    return data;
  } catch (err) {
    console.log("error:", err);
  }
};

export const addData = async (url, addedItem) => {
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addedItem),
    });
    if (!result.ok) {
      throw Error("Fetch data error: " + result.statusText);
    }
    const data = await result.json();
    return data;
  } catch (err) {
    console.log("error:", err);
  }
};

export const deleteData = async (url, id) => {
  url = url.endsWith("/") ? url : url + "/";
  try {
    const result = await fetch(url + id, {
      method: "DELETE",
    });
    if (!result.ok) {
      throw Error("Fetch data error: " + result.statusText);
    }
    const data = await result.json();
    return data;
  } catch (err) {
    console.log("error:", err);
  }
};
