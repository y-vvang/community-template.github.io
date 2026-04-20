async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get("id");
    const h1_username = document.getElementById("h1_username");
    const span_userid = document.getElementById("span_userid");
    const div_slogan = document.getElementById("div_slogan");
    const ul_contributions = document.getElementById("ul_contributions");
    const ul_resources = document.getElementById("ul_resources");
    const ul_responsible_parties = document.getElementById("ul_responsible_parties");
    const ul_participated_parties = document.getElementById("ul_participated_parties");

    const user_data = await getFixedUserData();
    const data_accounts = await fetchData("data/accounts.json");
    const data_resources = await fetchData("data/resources.json");
    const data_parties = await fetchData("data/parties.json");

    appendUserDisplayToElement(user_data, user_id, h1_username);
    span_userid.textContent = user_id;
    div_slogan.textContent = data_accounts[user_id]["slogan"];

    for (contribution of data_accounts[user_id]["contribution"]) {
        const li_contribution = document.createElement("li");
        li_contribution.textContent = contribution;
        ul_contributions.appendChild(li_contribution);
    }

    for (resource_object of data_resources) {
        if (resource_object["author"] == user_id) {
            const li_resource = document.createElement("li");
            const a_resource = document.createElement("a");
            a_resource.textContent = resource_object["title"];
            a_resource.href = "view_contentpage.html?title=" + encodeURIComponent(resource_object["title"]);
            li_resource.appendChild(a_resource);
            ul_resources.appendChild(li_resource);
        }
    }

    for (party_id in data_parties) {
        const party_object = data_parties[party_id];
        if (party_object["responsible"] == user_id) {
            const li_responsible_party = document.createElement("li");
            const a_responsible_party = document.createElement("a");
            a_responsible_party.textContent = party_object["name"];
            a_responsible_party.href = "view_partypage.html?id=" + party_id;
            li_responsible_party.appendChild(a_responsible_party);
            ul_responsible_parties.appendChild(li_responsible_party);
        }
        if (user_id in party_object["result"]) {
            const li_participated_party = document.createElement("li");
            const a_participated_party = document.createElement("a");
            a_participated_party.textContent = party_object["name"];
            a_participated_party.href = "view_partypage.html?id=" + party_id;
            let result_text = "";
            for (const result of party_object["result"][user_id]) {
                result_text += result + " ";
            }
            textNode_participated_party_result = document.createTextNode("：" + result_text);
            li_participated_party.appendChild(a_participated_party);
            li_participated_party.appendChild(textNode_participated_party_result);
            ul_participated_parties.appendChild(li_participated_party);
        }
    }
}

main();