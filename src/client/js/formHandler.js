import { fetchMeaningCloudApi } from "./meaningCloud";
async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("url2").value;
  let expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regexp = new RegExp(expression);
  // console.log(regexp.test(formText));
  if (regexp.test(formText)) {
    const formdata = new FormData();
    console.log(formText);

    console.log("::: Form Submitted :::");
    fetch("http://localhost:8081/apiKey")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const formdata = new FormData();
        formdata.append("key", res.key);
        formdata.append("url", formText);

        formdata.append("lang", "en"); // 2-letter code, like en es fr ...
        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        console.log(requestOptions);
        return fetchMeaningCloudApi(requestOptions);
      });
  } else {
    var tag = document.createElement("p");
    var text = document.createTextNode("This is not a Valid url");
    tag.appendChild(text);
    var element = document.getElementById("url");
    element.appendChild(tag);
  }
}

export { handleSubmit };
