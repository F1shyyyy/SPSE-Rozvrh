async function getData() {
  try {
    let data = await fetch("https://bakalari.spse.cz/bakaweb/Timetable/Public/");
    data = await data.text();
    await parseData(data);
  } catch (error) {
    console.error("Chyba pri nacitani stranky: " + error);
  }
  let classSelector = document.querySelector("#selectedClass");
  let teacherSelector = document.querySelector("#selectedTeacher");
  let roomSelector = document.querySelector("#selectedRoom");
  let url;

  classSelector.addEventListener("change", (event) => {
    url = "https://bakalari.spse.cz/bakaweb/Timetable/Public/Actual/Class/" + event.target.value;
    if (event.target.value !== "") {
      parseTimetable(url);
    }
    teacherSelector.options.selectedIndex = 0;
    roomSelector.options.selectedIndex = 0;
  });
  teacherSelector.addEventListener("change", (event) => {
    url = "https://bakalari.spse.cz/bakaweb/Timetable/Public/Actual/Teacher/" + event.target.value;
    if (event.target.value !== "") {
      parseTimetable(url);
    }
    classSelector.options.selectedIndex = 0;
    roomSelector.options.selectedIndex = 0;
  });
  roomSelector.addEventListener("change", (event) => {
    url = "https://bakalari.spse.cz/bakaweb/Timetable/Public/Actual/Room/" + event.target.value;
    if (event.target.value !== "") {
      parseTimetable(url);
    }
    classSelector.options.selectedIndex = 0;
    teacherSelector.options.selectedIndex = 0;
  })

}
async function parseData(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  let fetchClass = doc.querySelector("#selectedClass").cloneNode(true);
  fetchClass.removeAttribute("onchange");
  fetchClass.removeAttribute("class");
  let classSelector = document.querySelector("#classSelector");
  classSelector.replaceWith(fetchClass);

  let fetchTeacher = doc.querySelector("#selectedTeacher").cloneNode(true);
  fetchTeacher.removeAttribute("onchange");
  fetchTeacher.removeAttribute("class")
  let teacherSelector = document.querySelector("#teacherSelector");
  teacherSelector.replaceWith(fetchTeacher);

  let fetchRoom = doc.querySelector("#selectedRoom").cloneNode(true);
  fetchRoom.removeAttribute("onchange");
  fetchRoom.removeAttribute("class");
  let roomSelector = document.querySelector("#roomSelector");
  roomSelector.replaceWith(fetchRoom);
}
async function parseTimetable(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
}
getData();
