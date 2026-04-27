export const createMockSocket = () => {
  const listeners = {};

  return {
    on: (event, cb) => {
      listeners[event] = cb;
    },

    emit: (event, data) => {
      console.log("📤 Emit:", event, data);

      // simulate server response
      if (event === "send_message") {
        setTimeout(() => {
          listeners["receive_message"]?.({
            ...data,
            id: Date.now(),
          });
        }, 500);
      }
    },

    off: (event) => {
      delete listeners[event];
    },
  };
};
