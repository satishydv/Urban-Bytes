const clients = new Map();

export const addClient = (email, res, role) => {
  clients.set(email, { res, role });
};

export const removeClient = (email) => {
  clients.delete(email);
};

export const sendToUser = (email, event, data) => {
  const client = clients.get(email);
  if (client) {
    client.res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  } else {
    console.log(`User ${email} not connected — skipping SSE`);
  }
};

export const sendToRider = (email, event, data) => {
  const client = clients.get(email);
  if (client && client.role === "rider") {
    client.res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  }
}
export const sendToAdmins = (event, data) => {
  let count = 0;
  for (const [email, client] of clients.entries()) {
    if (client.role === "admin") {
      client.res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
      count++;
    }
  }
  console.log(`Sent "${event}" to ${count} admin(s)`);
};