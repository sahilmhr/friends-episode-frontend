let url = "https://friends-episodes-finder.herokuapp.com/"

let btn = document.getElementById("get-result");
let input = document.getElementById("hero-field");
let div = document.getElementById("result");
let tbody = document.getElementById("tbody");

div.style.display = "none";


let getEpisodes = () => {

    tbody.innerHTML = "";

    let data = {
        "dialogue": input.value
    }
    let params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        div.style.display = "block";
        for (const entry of Object.entries(result)) {
            let tr = document.createElement('tr');
            for (let i = 0; i < 2; i++) {
                let td = document.createElement("td");
                td.classList.add("px-6", "py-4", "whitespace-nowrap");
                let div1 = document.createElement("div");
                div1.classList.add("flex", "items-center");
                let div2 = document.createElement("div");
                div2.classList.add("ml-4");
                let div3 = document.createElement("div");
                div3.classList.add("text-sm", "font-medium", "text-gray-100");
                if (!isNaN(parseInt(entry[i]))) {
                    div3.innerHTML = parseInt(entry[i]) + 1;
                } else {
                    div3.innerHTML = entry[i];
                }
                div2.append(div3);
                div1.append(div2);
                td.append(div1);
                tr.append(td);
                console.log(entry)
            }
            tbody.append(tr);
        }
    })
}

btn.addEventListener('click', getEpisodes);

// window.onload = _ =>{
//     input.value = "Joey doesn't share food";
//     btn.click();
// }