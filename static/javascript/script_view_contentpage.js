async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title");
    const h1_title = document.getElementById("h1_title");
    const td_author = document.getElementById("td_author");
    const td_zhua = document.getElementById("td_zhua");
    const td_type = document.getElementById("td_type");
    const iframe_content = document.getElementById("iframe_content");
    const iframe_chat = document.getElementById("iframe_chat");

    const user_data = await getFixedUserData();
    const data_resources = await fetchData("data/resources.json");

    for (const resource_object of data_resources) {
        if (resource_object["title"] === title) {
            h1_title.textContent = resource_object["title"];
            appendUserDisplayToElement(user_data, resource_object["author"], td_author);
            td_zhua.textContent = "\u00A0";
            if (resource_object["zhua"] != 0) {
                td_zhua.textContent = String(resource_object["zhua"]) + " Zhua";
            }
            let string_type_tags = "\u00A0";
            for (const type_tag of resource_object["type"]) {
                string_type_tags += type_tag + " ";
            }
            td_type.textContent = string_type_tags;
            iframe_content.src = resource_object["link"];
            iframe_chat.src = "https://note.ect.fyi/Community_Template-Resource-" + resource_object["title"] + "-Chat?light";
        }
    }
}

main();