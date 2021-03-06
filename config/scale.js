{
  // Cloud and health configuration

  // check: 'http://127.0.0.1/', // if we can get this page it means that another copy is running

  cloud: 'PrivateCloud', // cloud name
  server: 'S1', // Server name to identify it in loadbalancing infrastructure
  instance: 'controller', // cloud instance type: standalone, controller, server
  //instance: 'server',
  //instance: 'standalone',

  key: 'edec4a498a604f2da754d173cd58b361', // Cloud access key
  cookie: 'node', // Cookie name for loadbalancing (cookie value will be 'S1'+'N1')

  firewall: { // Web Application Firewall config
    enabled: false,
    limits: { // limit concurent connection count
      ip:   20,  // per client ip
      sid:  10,  // per user session
      host: 100, // per host name
      url:  50,  // per url
      app:  200, // per application
      srv:  500  // per server port
    }
  },

  health: '5m', // health monitoring interval '5s'
  nagle: false, // Nagle algorithm
  gc: 0, // garbage collector interval '1h' - 1 hour, '10m' - 10 minutes
  watch: '2s' // combine wached file system events if interval less then specified

}
