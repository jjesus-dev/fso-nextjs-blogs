"use client";

import { useNotification } from "./NotificationProvider";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  const style: React.CSSProperties = {
    backgroundColor: type === "success" ? "#16a34a" : "#dc2626",
  };

  return (
    <div
      className="mx-auto mb-2.5 px-4 py-2.5 rounded-sm text-white"
      style={style}
      data-testid="notification"
    >
      {message}
    </div>
  );
}
