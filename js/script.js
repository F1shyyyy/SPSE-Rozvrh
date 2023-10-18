async function getData() {
  try {
    let data = await fetch("https://bakalari.spse.cz/bakaweb/Timetable/Public/");
    data = await data.text();
    await parseData(data);
  } catch (error) {
    console.error("Chyba pri nacitani stranky: " + error);
  }
  let classSelector = document.querySelector("#selectedClass");
  classSelector.addEventListener("change", (event) => {
    console.log(event.target.value);
    alert(event.target.value);
  });
}
async function parseData(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let fetchList = doc.querySelector("#selectedClass").cloneNode(true);
  fetchList.removeAttribute("onchange");
  let classSelector = document.querySelector("#classSelector");
  classSelector.replaceWith(fetchList);
}
getData();
