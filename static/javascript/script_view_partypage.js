async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const party_id = urlParams.get("id");
    const h2_party_name = document.getElementById("h2_party_name");
    const span_party_status = document.getElementById("span_party_status");
    const td_party_id = document.getElementById("td_party_id");
    const td_party_responsible = document.getElementById("td_party_responsible");
    const span_party_type = document.getElementById("span_party_type");
    const td_party_date_begin = document.getElementById("td_party_date_begin");
    const td_party_date_end = document.getElementById("td_party_date_end");
    const td_party_date_lasting = document.getElementById("td_party_date_lasting");
    const tbody_party_reward = document.getElementById("tbody_party_reward");
    const tbody_party_result = document.getElementById("tbody_party_result");
    const a_party_summary = document.getElementById("a_party_summary");
    const iframe_party_content = document.getElementById("iframe_party");

    const user_data = await getFixedUserData();
    const parties_data = await fetchData("data/parties.json");

    iframe_party_content.src = parties_data[party_id]["content"];

    h2_party_name.textContent = "\u2009" + parties_data[party_id]["name"];
    const a_party_entry = document.createElement("a");
    a_party_entry.textContent = "↗\uFE0E";
    a_party_entry.target = "_blank";
    a_party_entry.href = parties_data[party_id]["link"];
    h2_party_name.appendChild(a_party_entry);
    td_party_id.textContent = party_id;
    a_party_summary.textContent = parties_data[party_id]["summary"];
    a_party_summary.href = "view_contentpage.html?title=" + encodeURIComponent(parties_data[party_id]["summary"]);

    appendUserDisplayToElement(user_data, parties_data[party_id]["responsible"], td_party_responsible);
    if (user_data[parties_data[party_id]["responsible"]]["system"] === true) {
        span_party_type.className = "party_official";
    }
    else {
        span_party_type.className = "party_individual";
    }

    td_party_date_begin.textContent = parties_data[party_id]["date"]["begin"];
    td_party_date_end.textContent = parties_data[party_id]["date"]["end"];
    const date_party_begin = new Date(parties_data[party_id]["date"]["begin"]), date_party_end = new Date(parties_data[party_id]["date"]["end"]), date_now = new Date();
    td_party_date_lasting.textContent = Math.round((date_party_end - date_party_begin) / (1000 * 60 * 60 * 24)) + "d";
    if (date_party_begin > date_now) {
        span_party_status.className = "party_will";
    }
    else if (date_party_end < date_now) {
        span_party_status.className = "party_ed";
    }
    else {
        span_party_status.className = "party_ing";
    }

    for (const reward in parties_data[party_id]["reward"]) {
        const tr_party_reward = document.createElement("tr");
        const th_party_reward = document.createElement("th");
        th_party_reward.textContent = reward;
        tr_party_reward.appendChild(th_party_reward);
        const td_party_reward = document.createElement("td");
        let reward_text = "";
        reward_text += parties_data[party_id]["reward"][reward]["zhua"] + " Zhua";
        if ("extra" in parties_data[party_id]["reward"][reward]) {
            reward_text += " |";
            for (const extra_reward of parties_data[party_id]["reward"][reward]["extra"]) {
                reward_text += " " + extra_reward;
            }
        }
        td_party_reward.textContent = reward_text;
        tr_party_reward.appendChild(td_party_reward);
        tbody_party_reward.appendChild(tr_party_reward);
    }

    for (const participated_user in parties_data[party_id]["result"]) {
        const tr_user_result = document.createElement("tr");
        const th_username = document.createElement("th");
        appendUserDisplayToElement(user_data, participated_user, th_username);
        tr_user_result.appendChild(th_username);
        const td_user_result = document.createElement("td");
        let result_text = "";
        for (const result of parties_data[party_id]["result"][participated_user]) {
            result_text += " " + result; 
        }
        td_user_result.textContent = result_text;
        tr_user_result.appendChild(td_user_result);
        tbody_party_result.appendChild(tr_user_result); 
    }
}

main();