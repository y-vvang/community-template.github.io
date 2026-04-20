async function write_news() {
    const news_data = await fetchData("data/news.json");
    const list_news = document.getElementById("list_news");
    for (const title in news_data) {
        const li_news_item = document.createElement("li");
        const b_news_title = document.createElement("b");
        b_news_title.textContent = title;
        li_news_item.appendChild(b_news_title);
        for (const line of news_data[title]) {
            const br_news = document.createElement("br");
            li_news_item.appendChild(br_news);
            const textNode_news_line = document.createTextNode(line);
            li_news_item.appendChild(textNode_news_line);
        }
        list_news.appendChild(li_news_item);
    }
}

async function write_links() {
    const links_data = await fetchData("data/links.json");
    const list_links = document.getElementById("list_links");
    for (const name in links_data) {
        const li_link_item = document.createElement("li");
        const a_link_item = document.createElement("a");
        a_link_item.href = links_data[name];
        a_link_item.textContent = name;
        a_link_item.target = "_blank";
        li_link_item.appendChild(a_link_item);
        list_links.appendChild(li_link_item);
    }
}

async function write_home_parties(user_data) {
    const parties_data = await fetchData("data/parties.json");
    const div_home_parties = document.getElementById("div_home_parties");
    for (const party_counter in parties_data) {
        const party_object = parties_data[party_counter];
        const table_party_item = document.createElement("table");
        table_party_item.className = "table_party_item";
        const thead_party_name = document.createElement("thead");
        const tr_party_name = document.createElement("tr");
        const th_party_name = document.createElement("th");
        th_party_name.colSpan = 3;
        const a_party_name = document.createElement("a");
        a_party_name.href = "view_partypage.html?id=" + encodeURIComponent(party_counter);
        a_party_name.textContent = party_object["name"];
        th_party_name.appendChild(a_party_name);
        tr_party_name.appendChild(th_party_name);
        thead_party_name.appendChild(tr_party_name);
        table_party_item.appendChild(thead_party_name);
        const tbody_party_info = document.createElement("tbody");
        const tr_party_info = document.createElement("tr");
        const td_party_tags = document.createElement("td");
        if (user_data[party_object["responsible"]]["system"] === true) {
            const span_party_official = document.createElement("span");
            span_party_official.className = "party_official";
            td_party_tags.appendChild(span_party_official);
        }
        else {
            const span_party_individual = document.createElement("span");
            span_party_individual.className = "party_individual";
            td_party_tags.appendChild(span_party_individual);
        }
        tr_party_info.appendChild(td_party_tags);
        const td_party_info = document.createElement("td");
        const span_party_status = document.createElement("span");
        td_party_info.appendChild(span_party_status);
        const br_party_info = document.createElement("br");
        td_party_info.appendChild(br_party_info);
        const span_party_responsible = document.createElement("span");
        appendUserDisplayToElement(user_data, party_object["responsible"], span_party_responsible);
        td_party_info.appendChild(span_party_responsible);
        tr_party_info.appendChild(td_party_info);
        const td_party_date = document.createElement("td");
        const textNode_party_date_begin = document.createTextNode(party_object["date"]["begin"]);
        td_party_date.appendChild(textNode_party_date_begin);
        const br_party_date = document.createElement("br");
        td_party_date.appendChild(br_party_date);
        const textNode_party_date_end = document.createTextNode(party_object["date"]["end"]);
        td_party_date.appendChild(textNode_party_date_end);
        tr_party_info.appendChild(td_party_date);
        tbody_party_info.appendChild(tr_party_info);
        table_party_item.appendChild(tbody_party_info);
        const date_now = new Date(), date_party_begin = new Date(party_object["date"]["begin"]), date_party_end = new Date(party_object["date"]["end"]);
        date_now.setHours(0, 0, 0, 0);
        date_party_end.setHours(24, 0, 0, 0);
        if (date_now >= date_party_begin && date_now <= date_party_end) {
            table_party_item.className = "party_processing";
            span_party_status.className = "party_ing";
        }
        else if (Math.abs(date_party_begin - date_now) <= 5 * 24 * 60 * 60 * 1000) {
            table_party_item.className = "party_starting";
            span_party_status.className = "party_will";
        }
        else if (Math.abs(date_now - date_party_end) <= 5 * 24 * 60 * 60 * 1000) {
            table_party_item.className = "party_ended";
            span_party_status.className = "party_ed";
        }
        else {
            continue;
        }
        div_home_parties.appendChild(table_party_item);
    }
}

async function write_home_resources(user_data) {
    const resources_data = await fetchData("data/resources.json");
    const div_home_resources = document.getElementById("div_home_resources");
    const span_global_resources = document.getElementById("span_global_resources");
    for (const resource_counter in resources_data) {
        const resource = resources_data[resource_counter];
        if (resource["global"] === true || resources_data.length - resource_counter < 3) {
            const table_resource_item = document.createElement("table");
            const thead_resource_title = document.createElement("thead");
            const th_resource_title = document.createElement("th");
            th_resource_title.colSpan = 2;
            const a_resource_title = document.createElement("a");
            a_resource_title.href = "view_contentpage.html?title=" + encodeURIComponent(resource["title"]);
            a_resource_title.textContent = resource["title"];
            th_resource_title.appendChild(a_resource_title);
            thead_resource_title.appendChild(th_resource_title);
            table_resource_item.appendChild(thead_resource_title);
            const tbody_resource_info = document.createElement("tbody");
            const tr_resource_info = document.createElement("tr");
            const td_resource_author = document.createElement("td");
            appendUserDisplayToElement(user_data, resource["author"], td_resource_author);
            tr_resource_info.appendChild(td_resource_author);
            const td_resource_info = document.createElement("td");
            let resource_info_text = "";
            for (const type of resource["type"]) {
                resource_info_text += type + " ";
            }
            if (resource["zhua"] !== 0) {
                if (resource["type"].length !== 0) {
                    resource_info_text += "| ";
                }
                resource_info_text += resource["zhua"] + " Zhua ";
            }
            td_resource_info.textContent = resource_info_text;
            tr_resource_info.appendChild(td_resource_info);
            tbody_resource_info.appendChild(tr_resource_info);
            table_resource_item.appendChild(tbody_resource_info);
            if (resource["global"] === true) {
                const span_resource_global = document.createElement("span");
                span_resource_global.className = "resource_global";
                td_resource_info.appendChild(span_resource_global);
                span_global_resources.appendChild(table_resource_item);
            }
            else {
                div_home_resources.appendChild(table_resource_item);
            }
        }
    }
}

async function main() {
    const user_data = await getFixedUserData();
    write_news();
    write_links();
    write_home_parties(user_data);
    write_home_resources(user_data);
}

main();