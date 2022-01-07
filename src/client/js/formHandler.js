import { fetchMeaningCloudApi } from "./meaningCloud";
async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("url2").value;
  let expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regexp = new RegExp(expression);
  console.log(regexp.test(formText));
  if (regexp.test(formText)) {
    var tag = document.createElement("p");
    var text = document.createTextNode("This is not a Valid url");
    tag.appendChild(text);
    var element = document.getElementById("url");
    element.appendChild(tag);

    formdata.append("url", formText);

    formdata.append("lang", "en"); // 2-letter code, like en es fr ...
    console.log("::: Form Submitted :::");
    fetch("http://localhost:8081/apiKey")
      .then((res) => {
        console.log(res);
      })
      .then((res) => res.json());
    const formdata = new FormData();

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    console.log(requestOptions);
    return fetchMeaningCloudApi(requestOptions);
  } else {
    var tag = document.createElement("p");
    var text = document.createTextNode("This is not a Valid url");
    tag.appendChild(text);
    var element = document.getElementById("url");
    element.appendChild(tag);
  }
}

export { handleSubmit };
