async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  Client.checkForName(formText);

  console.log("::: Form Submitted :::");

  // form validation
  if (formValidation(formText)) {
    const response = await fetchData(formText);
    updateUI(response);
  } else {
    alert("please enter valid URL")
  }
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
  ).innerHTML += `${data.label} <br> confidence: ${data.confidence}<br>-----------------------<br>`;
}

function formValidation(text) {
  var urlRegx = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  return !!urlRegx.test(text);
}

export {
  handleSubmit,
  fetchData,
  updateUI,
  formValidation
};