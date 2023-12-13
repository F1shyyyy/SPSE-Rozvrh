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

  classSelector.addEventListener("change", async (event) => {
    url = "https://bakalari.spse.cz/bakaweb/Timetable/Public/Actual/Class/" + event.target.value;
    if (event.target.value !== "") {
      await fetchURL(url);
    }
    teacherSelector.options.selectedIndex = 0;
    roomSelector.options.selectedIndex = 0;
  });
  teacherSelector.addEventListener("change", async (event) => {
    url = "https://bakalari.spse.cz/bakaweb/Timetable/Public/Actual/Teacher/" + event.target.value;
    if (event.target.value !== "") {
      await fetchURL(url);
    }
    classSelector.options.selectedIndex = 0;
    roomSelector.options.selectedIndex = 0;
  });
  roomSelector.addEventListener("change", async (event) => {
    url = "https://bakalari.spse.cz/bakaweb/Timetable/Public/Actual/Room/" + event.target.value;
    if (event.target.value !== "") {
      await fetchURL(url);
    }
    classSelector.options.selectedIndex = 0;
    teacherSelector.options.selectedIndex = 0;
  })

}

// Fetch HTML page from src
async function parseData(html) {
  // Parses the HTML code into text
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Fetches a list of Classes from src
  let fetchClass = doc.querySelector("#selectedClass").cloneNode(true);
  fetchClass.removeAttribute("onchange");
  fetchClass.removeAttribute("class");
  let classSelector = document.querySelector("#classSelector");
  classSelector.replaceWith(fetchClass);

  // Fetches a list of Teachers from src
  let fetchTeacher = doc.querySelector("#selectedTeacher").cloneNode(true);
  fetchTeacher.removeAttribute("onchange");
  fetchTeacher.removeAttribute("class")
  let teacherSelector = document.querySelector("#teacherSelector");
  teacherSelector.replaceWith(fetchTeacher);

  // Fetches a list of Rooms from src
  let fetchRoom = doc.querySelector("#selectedRoom").cloneNode(true);
  fetchRoom.removeAttribute("onchange");
  fetchRoom.removeAttribute("class");
  let roomSelector = document.querySelector("#roomSelector");
  roomSelector.replaceWith(fetchRoom);
}
async function fetchURL(url) {
  try {
    let data = await fetch(url);
    data = await data.text();
    await parseTimetable(data);
  } catch (error) {
    console.error("Chyba pri nacitani stranky: " + error);
  }
}
async function parseTimetable(html) {
  // Parses the HTML code into text
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const cells = doc.querySelectorAll(".day-item-hover");
  let teachers = [];
  for (let i = 0; i < cells.length; i++) {
    teachers[i] = JSON.parse(cells[i].dataset.detail)["teacher"] ;
    console.log(teachers[i]);
  }
}
getData().then();
