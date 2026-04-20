async function write_resources(select_value) {
    const div_resources = document.getElementById("div_resources");
    div_resources.textContent = "";
    const user_data = await getFixedUserData();
    const resources_data = await fetchData("data/resources.json");
    if (select_value == "author") {
        let sorted_data = {};
        for (const id in resources_data) {
            if (!sorted_data[resources_data[id]["author"]]) {
                sorted_data[resources_data[id]["author"]] = [];
            }
            sorted_data[resources_data[id]["author"]].push(resources_data[id]["title"]);
        }
        for (const author in sorted_data) {
            const h2_author = document.createElement("h2");
            appendUserDisplayToElement(user_data, author, h2_author);
            div_resources.appendChild(h2_author);
            const ul_author_resources = document.createElement("ul");
            ul_author_resources.className = "list_resources";
            for (const resource of sorted_data[author]) {
                const li_author_resource = document.createElement("li");
                const a_author_resource = document.createElement("a");
                a_author_resource.textContent = resource;
                a_author_resource.href = "view_contentpage.html?title=" + encodeURIComponent(resource);
                li_author_resource.appendChild(a_author_resource);
                ul_author_resources.appendChild(li_author_resource);
            }
            div_resources.appendChild(ul_author_resources);
        }
    }
    else if (select_value == "zhua") {
        let sorted_data = {};
        for (const id in resources_data) {
            if (!(resources_data[id]["zhua"] + " Zhua" in sorted_data)) {
                sorted_data[resources_data[id]["zhua"] + " Zhua"] = {};
            }
            if (!(resources_data[id]["author"] in sorted_data[resources_data[id]["zhua"] + " Zhua"])) {
                sorted_data[resources_data[id]["zhua"] + " Zhua"][resources_data[id]["author"]] = [];
            }
            sorted_data[resources_data[id]["zhua"] + " Zhua"][resources_data[id]["author"]].push(resources_data[id]["title"]);
        }
        for (let zhua = 7; zhua >= 1; zhua--) {
            const h2_zhua = document.createElement("h2");
            h2_zhua.className = "mono";
            h2_zhua.textContent = zhua + " Zhua";
            div_resources.appendChild(h2_zhua);
            const ul_zhua_resources = document.createElement("ul");
            ul_zhua_resources.className = "list_resources";
            for (const author in sorted_data[zhua + " Zhua"]) {
                for (const resource of sorted_data[zhua + " Zhua"][author]) {
                    const li_zhua_resource = document.createElement("li");
                    const a_zhua_resource = document.createElement("a");
                    a_zhua_resource.textContent = resource;
                    a_zhua_resource.href = "view_contentpage.html?title=" + encodeURIComponent(resource);
                    li_zhua_resource.appendChild(a_zhua_resource);
                    ul_zhua_resources.appendChild(li_zhua_resource);
                }
            }
            div_resources.appendChild(ul_zhua_resources);
        }
    }
    else if (select_value == "type") {
        let sorted_data = {};
        for (const id in resources_data) {
            for (const type of resources_data[id]["type"]) {
                if (!(type in sorted_data)) {
                    sorted_data[type] = {};
                }
                if (!(resources_data[id]["author"] in sorted_data[type])) {
                    sorted_data[type][resources_data[id]["author"]] = [];
                }
                sorted_data[type][resources_data[id]["author"]].push(resources_data[id]["title"]);
            }
        }
        for (const type in sorted_data) {
            const h2_type = document.createElement("h2");
            h2_type.className = "mono";
            h2_type.textContent = type;
            div_resources.appendChild(h2_type);
            const ul_type_resources = document.createElement("ul");
            ul_type_resources.className = "list_resources";
            for (const author in sorted_data[type]) {
                for (const resource of sorted_data[type][author]) {
                    const li_type_resource = document.createElement("li");
                    const a_type_resource = document.createElement("a");
                    a_type_resource.textContent = resource;
                    a_type_resource.href = "view_contentpage.html?title=" + encodeURIComponent(resource);
                    li_type_resource.appendChild(a_type_resource);
                    ul_type_resources.appendChild(li_type_resource);
                }
            }
            div_resources.appendChild(ul_type_resources);
        }
    }
}

async function main() {
    const select_sortorder = document.getElementById("select_sortorder");
    write_resources(select_sortorder.value);
}

main();