async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('HTTP Error ', response.status);
    }
    return await response.json();
}

async function getFixedUserData() {
    const data_from_accounts = await fetchData("data/accounts.json");
    const data_from_resources = await fetchData("data/resources.json");
    const data_from_parties = await fetchData("data/parties.json");
    const data_from_contributions = await fetchData("data/contributions.json");
    let fixed_user_data = {};
    for (const user_id in data_from_accounts) {
        fixed_user_data[user_id] = {};
        fixed_user_data[user_id]["name"] = data_from_accounts[user_id]["username"];
        fixed_user_data[user_id]["tag"] = data_from_accounts[user_id]["usertag"];
        fixed_user_data[user_id]["banned"] = data_from_accounts[user_id]["banned"];
        fixed_user_data[user_id]["admin"] = data_from_accounts[user_id]["admin"];
        fixed_user_data[user_id]["system"] = data_from_accounts[user_id]["system"];
        fixed_user_data[user_id]["zhua"] = 0;
        for (const user_contribution of data_from_accounts[user_id]["contribution"]) {
            fixed_user_data[user_id]["zhua"] += data_from_contributions[user_contribution];
        }
    }
    for (const resource of data_from_resources) {
        fixed_user_data[resource["author"]]["zhua"] += resource["zhua"];
    }
    for (const party_id in data_from_parties) {
        for (const joined_user_id in data_from_parties[party_id]["result"]) {
            for (const result of data_from_parties[party_id]["result"][joined_user_id]) {
                if (result in data_from_parties[party_id]["reward"]) {
                    fixed_user_data[joined_user_id]["zhua"] += data_from_parties[party_id]["reward"][result]["zhua"];
                }
            }
        }
    }
    return fixed_user_data;
}

function appendUserDisplayToElement(user_data, user_id, element) {
    let user_name = user_data[user_id]["name"], user_tag = user_data[user_id]["tag"], user_zhua = user_data[user_id]["zhua"], user_rank;
    if (user_data[user_id]["system"]) {
        user_rank = 5;
        user_tag = null;
    }
    else if (user_data[user_id]["banned"]) {
        user_rank = 0;
        user_tag = "Banned";
    }
    else if (user_data[user_id]["admin"]) {
        user_rank = 5;
        if (user_tag === null) {
            user_tag = "Admin";
        }
    }
    else if (0 <= user_zhua && user_zhua < 20) {
        user_rank = 1;
    }
    else if (20 <= user_zhua && user_zhua < 50) {
        user_rank = 2;
    }
    else if (50 <= user_zhua && user_zhua < 90) {
        user_rank = 3;
    }
    else if (user_zhua >= 90) {
        user_rank = 4;
    }
    const a_userdisplay = document.createElement("a");
    const span_username = document.createElement("span");
    span_username.className = "username_" + user_rank;
    span_username.textContent = user_name;
    a_userdisplay.appendChild(span_username);
    if (user_tag !== null) {
        const span_usertag = document.createElement("span");
        span_usertag.className = "usertag_" + user_rank;
        span_usertag.textContent = user_tag;
        a_userdisplay.appendChild(span_usertag);
    }
    a_userdisplay.href = "view_userpage.html?id=" + user_id;
    a_userdisplay.target = "_self";
    element.appendChild(a_userdisplay);
}
