import { featchMeaningCloudApi } from "./meaningCloud";
async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  const r = /^(ftp|http|https):\/\/[^ "]+$/;

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8081/apiKey")
    .then((res) => {
      console.log(res);
    .then((res) => res.json())
      const formdata = new FormData();
      formdata.append("key", res.key);
      if (r.test(formText)) {
        formdata.append("url", formText);
      } else {
        formdata.append("txt", formText);
      }

      formdata.append("lang", "en"); // 2-letter code, like en es fr ...

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      console.log(requestOptions);
      return featchMeaningCloudApi(requestOptions)
        .then((response) => response.json())
        .then((res) => {
          document.getElementById("model").innerHTML = `model: ${res.model}`;
          document.getElementById(
            "agree"
          ).innerHTML = `agreement: ${res.agreement}`;
          document.getElementById(
            "sub"
          ).innerHTML = `subjectivity: ${res.subjectivity}`;
          document.getElementById(
            "confidence"
          ).innerHTML = `confidence: ${res.confidence}`;
          document.getElementById("irony").innerHTML = `irony: ${res.irony}`;

          var list = document.createElement("ul");
          for (let i = 0; i < res.sentence_list.length; i++) {
            const el = res.sentence_list[i];
            var node = document.createElement("li");
            node.appendChild(document.createTextNode(`Text: ${el.text}`));
            node.appendChild(document.createElement("br"));
            node.appendChild(document.createTextNode(`inip: ${el.inip}`));
            node.appendChild(document.createElement("br"));
            node.appendChild(document.createTextNode(`endp: ${el.endp}`));
            node.appendChild(document.createElement("br"));
            node.appendChild(
              document.createTextNode(`confidence: ${el.confidence}`)
            );
            node.appendChild(document.createElement("br"));
            node.appendChild(
              document.createTextNode(`agreement: ${el.agreement}`)
            );
            node.appendChild(document.createElement("br"));
            node.appendChild(document.createElement("br"));
            node.appendChild(
              document.createTextNode("------segment_list------")
            );
            var list2 = document.createElement("ul");
            for (let j = 0; j < el.segment_list.length; j++) {
              let el2 = el.segment_list[j];
              var node2 = document.createElement("li");
              node2.appendChild(document.createTextNode(`Text: ${el2.text}`));
              node2.appendChild(document.createElement("br"));
              node2.appendChild(
                document.createTextNode(`segment_type: ${el2.segment_type}`)
              );
              node2.appendChild(document.createElement("br"));
              node2.appendChild(document.createTextNode(`inip: ${el2.inip}`));
              node2.appendChild(document.createElement("br"));
              node2.appendChild(document.createTextNode(`endp: ${el2.endp}`));
              node2.appendChild(document.createElement("br"));
              node2.appendChild(
                document.createTextNode(`confidence: ${el2.confidence}`)
              );
              node2.appendChild(document.createElement("br"));
              node2.appendChild(
                document.createTextNode(`agreement: ${el2.agreement}`)
              );
              node2.appendChild(document.createElement("br"));
              list2.appendChild(node2);
            }
            node.appendChild(node2);
            list.appendChild(node);
          }
          document.getElementById("sentence").appendChild(list);
          return res;
        })
        .catch((error) => console.log("error", error));
    });
}

export { handleSubmit };
