var CLIENT_ID =
  "619975114758-bubcolgsebdvfm0cvjfjqdiu7u5rq6u7.apps.googleusercontent.com";

const button = document.getElementById("signin");

button.addEventListener("click", signInWithGoogle);

function signInWithGoogle() {
  const authUri = "https://accounts.google.com/o/oauth2/v2/auth";

  let form = document.createElement("form");
  form.setAttribute("method", "get");
  form.setAttribute("action", authUri);

  let params = {
    client_id: CLIENT_ID,
    redirect_uri: "http://localhost:3000/user.html",
    response_type: "token",
    scope: "https://www.googleapis.com/auth/userinfo.profile",
    include_granted_scopes: "true",
    state: "pass-through value",
  };

  for (let key in params) {
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", key);
    input.setAttribute("value", params[key]);
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

window.addEventListener("load", function fetchUserInformation() {
  const access_token = localStorage.getItem("access_token");

  fetch("/verify-user", {
    method: "POST",
    headers: {
      authorization: "Bearer " + access_token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message === "Request failed with status code 401") {
        localStorage.removeItem("access_token");
        window.location.href = "/";
      }
    });
});
