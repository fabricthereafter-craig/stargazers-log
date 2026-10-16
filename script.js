async function loadStarredRepositories() {
  const list = document.querySelector("#starred");
  const status = document.querySelector("#status");

  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const events = await response.json();

    if (!Array.isArray(events)) {
      throw new TypeError("Expected events.json to contain an array.");
    }

    for (const [index, event] of events.entries()) {
      if (
        !event
        || typeof event.name !== "string"
        || event.name.trim() === ""
        || typeof event.starred !== "string"
        || event.starred.trim() === ""
      ) {
        throw new TypeError(`Invalid repository event at index ${index}.`);
      }
    }

    if (events.length === 0) {
      status.textContent = "No starred repositories found.";
      return;
    }

    for (const event of events) {
      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    }

    status.textContent = "";
  } catch (error) {
    console.error("Could not load starred repositories:", error);
    status.textContent = "Could not load starred repositories. Please try again later.";
  }
}

loadStarredRepositories();
