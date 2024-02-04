export function headers() {
  return { "br-platform": "web" };
}

export function getAppEnvHost() {
  let url = "http://localhost:3001";

  return url;
}

export default function requestHeaders() {
  let headers;
  let token = "Bearer " + localStorage.getItem("token");
  return (headers = {
    authorization: token,
  });
}
