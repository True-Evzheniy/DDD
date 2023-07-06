'use strict';
// const url = 'ws://127.0.0.1:8001/';

// const scaffold = (url, structure) => {
//   const socket = new WebSocket(url);
//   const api = {};
//   const services = Object.keys(structure);
//   for (const serviceName of services) {
//     api[serviceName] = {};
//     const service = structure[serviceName];
//     const methods = Object.keys(service);
//     for (const methodName of methods) {
//       api[serviceName][methodName] = (...args) => new Promise((resolve) => {
//         const packet = { name: serviceName, method: methodName, args };
//         socket.send(JSON.stringify(packet));
//         socket.onmessage = (event) => {
//           const data = JSON.parse(event.data);
//           resolve(data);
//         };
//       });
//     }
//   }
//   return api;
// };


const url = 'http://localhost:8001';

const scaffold = (url, structure) => {
  const api = {};
  const services = Object.keys(structure);
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      api[serviceName][methodName] = async (...args) => {
        const idSlug = (service[methodName][0] === 'id' && args.length) ? `/${args.shift()}` : ''; 
        const methodUrl = `${url}/${serviceName}/${methodName}${idSlug}`;
        const bodyArgument = args.shift();
        const body = bodyArgument && JSON.stringify(bodyArgument);
        const method = body ? 'POST' : 'GET';

        return (await fetch(methodUrl, {body, method})).json();
      }
    }
  }
  return api;
};

const api = scaffold(url, {
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
  country: {
    read: ['id'],
    delete: ['id'],
    find: ['mask'],
  },
});