interface ContactEvent {
  contactId: Contact["id"];
};

interface ContactStatusChangedEvent extends ContactEvent {
  oldStatus: Contact["status"];
  newStatus: Contact["status"];
};

interface ContactDeletedEvent extends ContactEvent {};

interface ContactEvents {
  deleted: ContactDeletedEvent;
  statusChanged: ContactStatusChangedEvent;
};

function handleEvent<T extends keyof ContactEvents>(
  eventName: T,
  handler: (evt: ContactEvents[T]) => void
) {
  if (eventName === "statusChanged") {
    handler({ contactId: 1, oldStatus: "active", newStatus: "inactive" });
  }
};

handleEvent("statusChanged", evt => evt);