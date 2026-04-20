async function main() {
    const div_parties = document.getElementById("div_parties");

    const user_data = await getFixedUserData();
    const parties_data = await fetchData("data/parties.json");

    for (const party_id in parties_data) {
        const table_party_item = document.createElement("table");

        const thead_party_name = document.createElement("thead");
        const tr_party_name = document.createElement("tr");
        const th_party_name = document.createElement("th");
        const a_party_name = document.createElement("a");
        a_party_name.textContent = parties_data[party_id]["name"];
        a_party_name.href = "view_partypage.html?id=" + party_id;
        th_party_name.appendChild(a_party_name);
        tr_party_name.appendChild(th_party_name);
        thead_party_name.appendChild(tr_party_name);
        table_party_item.appendChild(thead_party_name);

        const tbody_party_info = document.createElement("tbody");
        const tr_party_info = document.createElement("tr");
        const td_party_date = document.createElement("td");
        const span_party_status = document.createElement("span");
        const date_party_begin = new Date(parties_data[party_id]["date"]["begin"]), date_party_end = new Date(parties_data[party_id]["date"]["end"]), date_now = new Date();
        if (date_party_begin > date_now) {
            span_party_status.className = "party_will";
        }
        else if (date_party_end < date_now) {
            span_party_status.className = "party_ed";
        }
        else {
            span_party_status.className = "party_ing";
        }
        td_party_date.appendChild(span_party_status);
        const textNode_party_date = document.createTextNode("\u00A0" + parties_data[party_id]["date"]["begin"] + " ~ " + parties_data[party_id]["date"]["end"]);
        td_party_date.appendChild(textNode_party_date);
        tr_party_info.appendChild(td_party_date);

        const td_party_info = document.createElement("td");
        appendUserDisplayToElement(user_data, parties_data[party_id]["responsible"], td_party_info);
        const textNode_party_info = document.createTextNode(" | ");
        td_party_info.appendChild(textNode_party_info);
        const span_party_type = document.createElement("span");
        if (user_data[parties_data[party_id]["responsible"]]["system"] === true) {
            span_party_type.className = "party_official";
        }
        else {
            span_party_type.className = "party_individual";
        }
        td_party_info.appendChild(span_party_type);
        tr_party_info.appendChild(td_party_info);
        tbody_party_info.appendChild(tr_party_info);
        table_party_item.appendChild(tbody_party_info);
        div_parties.appendChild(table_party_item);
    }
}

main();