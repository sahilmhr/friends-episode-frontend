let url = "https://friends-episodes-finder.herokuapp.com/"

let btn = document.getElementById("get-result");
let input = document.getElementById("hero-field");
let div = document.getElementById("result");
let tbody = document.getElementById("tbody");
let loader = document.getElementById("loader");

div.style.display = "none";


let getEpisodes = () => {

    loader.style.display = "flex";

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
            let check = false;
            for (let i = 0; i < 3; i++) {
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
                    let info = String(entry[1]);
                    if (check) {
                        div3.innerHTML = info;
                    } else {
                        let season = parseInt(info.substring(7, 9));
                        let episode = parseInt(info.substring(18));
                        let patt = /\W\d{2}\W.*\d{2}/
                        if (info.match(patt)) {
                            fetch(`https://api.tvmaze.com/shows/431/episodebynumber?season=${season}&number=${episode}`).then(response => {
                                if (response.ok) {
                                    return response.json();
                                }
                                return "Some error!"
                            }).then(data => {
                                div3.innerHTML = data['name'];
                            })
                        } else {
                            console.log("Regex")
                        }
                        check = true;
                    }
                }
                div2.append(div3);
                div1.append(div2);
                td.append(div1);
                tr.append(td);
            }
            tbody.append(tr);
        };
        loader.style.display = "none";
    })
}

btn.addEventListener('click', getEpisodes);

window.onload = () => {
    loader.style.display = "none";
}