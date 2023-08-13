/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */
// import pdf from "./pdf"
document.addEventListener("click", function () {
    var table = document.querySelector("#myTable")
    var rows = table.querySelectorAll("tr")
    var btn = document.querySelector("#export")
    if (rows.length <= 1) {
        btn.style.display = "none"
    } else {
        btn.style.display = "block"
    }

})

window.addEventListener("load", function () {
    var table = document.querySelector("#myTable")
    var rows = table.querySelectorAll("tr")
    var btn = document.querySelector("#export")
    if (rows.length <= 1) {
        btn.style.display = "none"
    } else {
        btn.style.display = "block"
    }

})

function requestJson() {
    if (checkTable() === false) {
        return null
    }
    var table = document.querySelector("#myTable")
    var rows = table.querySelectorAll("tr")
    var object = []
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].querySelectorAll("td")
        var data = {
            medicineId: cells[0].getAttribute('id'),
            dosage: cells[1].innerText,
            frequency: cells[2].innerText,
            duration: cells[3].innerText,
            totalUnit: cells[4].querySelector("input").value
        }
        object.push(data)
    }
    return JSON.stringify(object, null, 2)


}

function checkTable() {
    var table = document.querySelector("#myTable")
    var rows = table.querySelectorAll("tr")
    var check = 5
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].querySelectorAll("td")
        for (var j = 1; j < 4; j++) {
            if (cells[j].innerText === "")
                return false
        }
    }
    return true
}

function getRowCount() {
    const tableBody = document.querySelector("#myTable tbody");
    const rowCount = tableBody.rows.length;
    return rowCount
}

function addRow(element) {
    var rowbtn = element.closest("tr")
    var row = rowbtn.querySelector("button")
    row.classList.add("hidden")
    var name = rowbtn.querySelector("td.medicine--name").innerText
    var unit = rowbtn.querySelector("td.medicine--unit").innerText
    var stock = parseInt(rowbtn.querySelector("td.stock").innerText)
    var medicineId = rowbtn.querySelector(".id").innerText
    var rowCount = getRowCount()

    const tableBody = document.querySelector("#myTable tbody");
    const newRow = document.createElement("tr");
    newRow.classList.add('table-col', 'prescription')
    newRow.innerHTML = `
                <td id="${medicineId}" class="prescription--name-medicine">${name}</td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td><input type="number" min="1" value="1" max="${stock}" class="count" /></td>
                <td>${unit}</td>
                <td><button class="btn btn-danger" onclick="toggle(this)">Xoá</button></td>`
    tableBody.appendChild(newRow);
}

function toggle(element) {
    var e = element.closest("tr")
    var listMedicine = document.querySelectorAll(".list")
    listMedicine.forEach(function (item) {
        if (item.querySelector("td.medicine--name").innerText === e.querySelector(".prescription--name-medicine").innerText) {
            var btn = item.querySelector("button")
            btn.classList.remove("hidden")
            e.remove()
            return
        }
    })
}

function filterTable() {
    var input = document.getElementById("searchInput").value.toUpperCase();
    var table = document.getElementById("dataTable");
    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var shouldDisplay = false;

        for (var j = 0; j < cells.length; j++) {
            var cellText = cells[j].textContent || cells[j].innerText;
            if (cellText.toUpperCase().indexOf(input) > -1) {
                shouldDisplay = true;
                break;
            }
        }
        rows[i].style.display = shouldDisplay ? "" : "none"
    }
}

function requestParam(path) {
    var data = requestJson()
    if (data === null) {
        alert("Vui Lòng Nhập đầy đủ thông tin trong toa thuốc")
        return
    }
    var xhr = new XMLHttpRequest()
    xhr.open("POST", path, true)
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (xhr.responseText === "success")
                    window.location.href = "/ClinicWeb/doctor/medical"
            }
            else {
                alert("CÓ LỖI XẢY RA! VUI LÒNG THỬ LAI")
            }
        }
    }
    xhr.send(data)
}

function createPdfMakeDocument() {
  var docDefinition = {
    content: [
      { text: 'Hello, this is a PDF generated using pdfmake!', fontSize: 14 }
    ]
  };;
}