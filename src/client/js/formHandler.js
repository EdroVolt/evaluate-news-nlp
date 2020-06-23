async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  Client.checkForName(formText);

  console.log("::: Form Submitted :::");

  const response = await fetchData(formText);
  updateUI(response);
}

async function fetchData(formText) {
  const data = fetch("http://localhost:8082/text-api", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      formText: formText,
    }),
  })
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);
      console.log(res[0].label);
      return res[0];
    });

  return await data;
}

function updateUI(data) {
  document.getElementById(
    "results"
  ).innerHTML = `${data.label} <br> confidence: ${data.confidence}`;
}

export { handleSubmit, updateUI };
