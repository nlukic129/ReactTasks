const FIREBASE_DOMAIN =
  "https://reacttasks-806ca-default-rtdb.europe-west1.firebasedatabase.app";

export async function getAllTasks() {
  const response = await fetch(`${FIREBASE_DOMAIN}/tasks.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch tasks.");
  }

  const transformedTasks = [];

  for (const key in data) {
    const taskObj = {
      id: key,
      ...data[key],
    };

    transformedTasks.push(taskObj);
  }

  return transformedTasks;
}

export async function addTask(taskData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/tasks.json`, {
    method: "POST",
    body: JSON.stringify(taskData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create task.");
  }

  return null;
}

export async function deleteTask(taskId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/tasks/${taskId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not delete task.");
  }

  return null;
}

export async function updateTask(taskData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/tasks/${taskData.id}.json`, {
    method: "PUT",
    body: JSON.stringify(taskData.taskForUpdate),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not update task.");
  }

  return null;
}

export async function getSingleTask(taskId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/tasks/${taskId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch task.");
  }

  const loadedTask = {
    id: taskId,
    ...data,
  };

  return loadedTask;
}
